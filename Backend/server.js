import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authMiddleware from "./middleware/auth.js";
import Razorpay from "razorpay";
import crypto from "crypto";



dotenv.config();

console.log("JWT_SECRET:", process.env.JWT_SECRET);

const app = express();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// app.use(cors({
//   origin: [
//     // "http://localhost:8081",
//     // "http://localhost:5173",   // agar Vite default use karti ho
//     // "https://mrmutton.com"
//     "https://mr-mutton.vercel.app"
//   ],
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//   credentials: true
// }));
app.use(cors());
app.options("/*", cors());
app.use(express.json());

// Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed ❌", err);
  } else {
    console.log("Database connected ✅");
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Server running on port 8080");
});

// Signup Route
app.post("/api/register", async (req, res) => {
  try {
    const { full_name, email, password } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email already exists
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
      if (result.length > 0) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user
      db.query(
        "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)",
        [full_name, email, hashedPassword],
        (err, result) => {
          if (err) {
            return res.status(500).json({ message: "Database error" });
          }

          res.status(201).json({ message: "User registered successfully ✅" });
        }
      );
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login Route
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {

    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = result[0];

    // 🔥 SAFE CHECK
    if (!user.password) {
      return res.status(500).json({ message: "User password missing in DB" });
    }

    try {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
        },
      });

    } catch (error) {
      console.error("Bcrypt Error:", error);
      return res.status(500).json({ message: "Login failed" });
    }
  });
});

// JWT Middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).json({ message: "Token required" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = decoded;
    next();
  });
};

app.post("/api/cart", authMiddleware, (req, res) => {
  const { item_id, name, price, quantity } = req.body;
  const user_id = req.user.id;

  db.query(
    "SELECT * FROM cart WHERE user_id = ? AND item_id = ?",
    [user_id, item_id],
    (err, result) => {

      if (result.length > 0) {
        // Already exists → Update quantity
        db.query(
          "UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND item_id = ?",
          [quantity, user_id, item_id],
          (err2) => {
            if (err2) return res.status(500).json({ message: "DB error" });
            return res.json({ message: "Quantity updated" });
          }
        );
      } else {
        // Insert new
        db.query(
          "INSERT INTO cart (user_id, item_id, name, price, quantity) VALUES (?, ?, ?, ?, ?)",
          [user_id, item_id, name, price, quantity],
          (err3) => {
            if (err3) return res.status(500).json({ message: "DB error" });
            return res.json({ message: "Item added to cart" });
          }
        );
      }
    }
  );
});


app.get("/api/cart", authMiddleware, (req, res) => {
  const user_id = req.user.id;

  db.query(
     "SELECT id, item_id, name, price, quantity FROM cart WHERE user_id = ?",
    [req.user.id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      res.json(results);
    }
  );
});

app.delete("/api/cart/:id", authMiddleware, (req, res) => {
  const user_id = req.user.id;
  const item_id = req.params.id;

  db.query(
    "DELETE FROM cart WHERE user_id = ? AND item_id = ?",
    [user_id, item_id],
    (err) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      res.json({ success: true });
    }
  );
});


// Update Cart Quantity
app.patch("/api/cart/:id", authMiddleware, (req, res) => {
  const { quantity } = req.body;
  const cartId = req.params.id;
  const userId = req.user.id;

  db.query(
    "UPDATE cart SET quantity = ? WHERE id = ? AND user_id = ?",
    [quantity, cartId, userId],
    (err, result) => {
      if (err) return res.status(500).json({ message: "DB error" });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Item not found" });
      }

      res.json({ message: "Quantity updated" });
    }
  );
});


// ===============================
// 📌 PLACE ORDER
// ===============================
app.post("/api/orders", authMiddleware, (req, res) => {
  const userId = req.user.id;

  const {
  name,
  phone,
  address,
  city,
  pincode,
  instructions,
  paymentMethod,

  // 🔥 NEW FIELDS
  subtotal,
  deliveryCharge,
  totalAmount,
  deliveryDate,
  mealType,
  timeSlot,
  latitude,
  longitude,
} = req.body;

  // 🛑 Validation
  if (!name || !phone || !address || !city || !pincode) {
    return res.status(400).json({
      message: "Please fill all required fields",
    });
  }

  // 🔥 ADD THIS HERE
  if (paymentMethod !== "Cash on Delivery") {
    return res.status(400).json({
      message: "Invalid payment method for this route",
    });
  }

  // 1️⃣ Get cart items
  db.query(
    "SELECT * FROM cart WHERE user_id = ?",
    [userId],
    (err, cartItems) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error" });
      }

      if (cartItems.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }

      // 2️⃣ Calculate total
      const finalSubtotal = subtotal || 0;
const finalDeliveryCharge = deliveryCharge || 0;
const finalTotalAmount = totalAmount || 0;

      // 3️⃣ Create order
      db.query(
        `INSERT INTO orders 
(
  user_id,
  subtotal,
  delivery_charge,
  total_amount,
  name,
  phone,
  address,
  city,
  pincode,
  instructions,
  payment_method,
  delivery_date,
  meal_type,
  time_slot,
  latitude,
  longitude,
  status,
  payment_status
)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
        [
  userId,
  finalSubtotal,
  finalDeliveryCharge,
  finalTotalAmount,
  name,
  phone,
  address,
  city,
  pincode,
  instructions || "",
  paymentMethod || "",
  deliveryDate || "",
  mealType || "",
  timeSlot || "",
  latitude || null,
  longitude || null,
  "pending",
  "pending"
],
        (err2, result) => {
          if (err2) {
            console.error(err2);
            return res
              .status(500)
              .json({ message: "Order creation failed" });
          }

          const orderId = result.insertId;

          // 4️⃣ Insert order items
          const values = cartItems.map((item) => [
            orderId,
            item.name,
            item.price,
            item.quantity,
          ]);

          db.query(
            "INSERT INTO order_items (order_id, product_name, price, quantity) VALUES ?",
            [values],
            (err3) => {
              if (err3) {
                console.error(err3);
                return res
                  .status(500)
                  .json({ message: "Order items insert failed" });
              }

              // 5️⃣ Clear cart
              db.query(
                "DELETE FROM cart WHERE user_id = ?",
                [userId],
                (err4) => {
                  if (err4) console.error("Cart clear error:", err4);

                  // 🎉 Success
                  return res.status(200).json({
                    message: "Order placed successfully",
                    orderId: orderId,
                  });
                }
              );
            }
          );
        }
      );
    }
  );
});




// ===============================
// 📌 GET FULL ORDER DETAILS
// ===============================
app.get("/api/orders/:id", authMiddleware, (req, res) => {
  const orderId = req.params.id;
  const userId = req.user.id;
  console.log("ORDER DETAILS ROUTE HIT");
  // 1️⃣ Get Order Info
  db.query(
    "SELECT * FROM orders WHERE id = ? AND user_id = ?",
    [orderId, userId],
    (err, orderResult) => {
      if (err) return res.status(500).json({ message: "DB error" });

      if (orderResult.length === 0) {
        return res.status(404).json({ message: "Order not found" });
      }

      const order = orderResult[0];

      // 2️⃣ Get Order Items
      db.query(
        "SELECT * FROM order_items WHERE order_id = ?",
        [orderId],
        (err2, items) => {
          if (err2) return res.status(500).json({ message: "DB error" });

          res.json({
            ...order,
            items,
          });
        }
      );
    }
  );
});


// ===============================
// 📌 GET MY ORDERS
// ===============================
app.get("/api/orders", authMiddleware, (req, res) => {
  db.query(
    "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
    [req.user.id],
    (err, orders) => {
      if (err) return res.status(500).json({ message: "DB error" });
      res.json({orders});
    }
  );
});

app.post("/api/create-razorpay-order", authMiddleware, async (req, res) => {
  try {
    const { totalAmount } = req.body;

    const options = {
      amount: totalAmount * 100, // paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Razorpay order failed" });
  }
});

app.post("/api/verify-payment", authMiddleware, (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    orderData,
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ message: "Invalid payment" });
  }

  const userId = req.user.id;

  db.query(
    "SELECT * FROM cart WHERE user_id = ?",
    [userId],
    (err, cartItems) => {
      if (err) return res.status(500).json({ message: "DB error" });

      if (cartItems.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }

      db.query(
        `INSERT INTO orders 
        (user_id, subtotal, delivery_charge, total_amount, name, phone, address, city, pincode, instructions, payment_method, delivery_date, meal_type, time_slot, latitude, longitude, status, payment_status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
        [
          userId,
          orderData.subtotal,
          orderData.deliveryCharge,
          orderData.totalAmount,
          orderData.name,
          orderData.phone,
          orderData.address,
          orderData.city,
          orderData.pincode,
          orderData.instructions || "",
          "Online Payment",
          orderData.deliveryDate || "",
          orderData.mealType || "",
          orderData.timeSlot || "",
          orderData.latitude || null,
          orderData.longitude || null,
          "confirmed",
          "paid",
        ],
        (err2, result) => {
          if (err2) return res.status(500).json({ message: "Order failed" });

          const orderId = result.insertId;

          const values = cartItems.map((item) => [
            orderId,
            item.name,
            item.price,
            item.quantity,
          ]);

          db.query(
            "INSERT INTO order_items (order_id, product_name, price, quantity) VALUES ?",
            [values],
            (err3) => {
              if (err3)
                return res.status(500).json({ message: "Items failed" });

              db.query(
                "DELETE FROM cart WHERE user_id = ?",
                [userId],
                (err4) => {
                  if (err4)
                    return res.status(500).json({ message: "Cart clear failed" });

                  res.json({ success: true, orderId });
                }
              );
            }
          );
        }
      );
    }
  );
});

app.get("/api/addresses", authMiddleware, (req, res) => {
  const userId = req.user.id;

  db.query(
    "SELECT * FROM addresses WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
      }
      res.json({ addresses: results });
    }
  );
});
