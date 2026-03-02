// import { useState } from "react";
// import { useCart } from "@/contexts/CartContext";

// const CheckoutPage = () => {
//   const { items, getTotalPrice, placeOrder } = useCart();

//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     address: "",
//     city: "",
//     pincode: "",
//     instructions: "",
//     paymentMethod: "",
//   });

//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     // validation
//     if (
//       !formData.name.trim() ||
//       !formData.phone.trim() ||
//       !formData.address.trim() ||
//       !formData.city.trim() ||
//       !formData.pincode.trim() ||
//        !formData.paymentMethod
//     ) {
//       alert("Please fill all required fields");
//       return;
//     }
//     console.log(formData);

//     placeOrder(formData); // full data send
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold">Checkout</h2>

//       <input
//         placeholder="Full Name"
//         value={formData.name}
//         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//       />

//       <input
//         placeholder="Phone"
//         value={formData.phone}
//         onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//       />

//       <input
//         placeholder="Address"
//         value={formData.address}
//         onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//       />

//       <input
//         placeholder="City"
//         value={formData.city}
//         onChange={(e) => setFormData({ ...formData, city: e.target.value })}
//       />

//       <input
//         placeholder="Pincode"
//         value={formData.pincode}
//         onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
//       />

//       <input
//   placeholder="Instructions (Optional)"
//   value={formData.instructions}
//   onChange={(e) =>
//     setFormData({ ...formData, instructions: e.target.value })
//   }
// />

// <select
//   value={formData.paymentMethod}
//   onChange={(e) =>
//     setFormData({ ...formData, paymentMethod: e.target.value })
//   }
// >
//   <option value="">Select Payment Method</option>
//   <option value="cod">Cash on Delivery</option>
//   <option value="online">Online Payment</option>
// </select>

//       <button onClick={handleSubmit}>Place Order ₹{getTotalPrice()}</button>
//     </div>
//   );
// };

// export default CheckoutPage;

import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Phone,
  MapPin,
  Building2,
  Hash,
  MessageSquare,
  CreditCard,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useLocation } from "react-router-dom";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const {
    items,
    getTotalPrice,
    getTotalItems,
    getTotalSavings,
    placeOrder,
    clearCart,
  } = useCart();
  const location = useLocation();
  const state = location.state as any;

  console.log("Received State:", state);
  const token = localStorage.getItem("auth_token");
  console.log("TOKEN FROM LOCALSTORAGE:", token);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: state?.address || "",
    city: "",
    pincode: "",
    instructions: "",
    paymentMethod: "",
  });

  const subtotal = state?.subtotal ?? 0;
  const deliveryCharge = state?.deliveryCharge ?? 0;
  const totalAmount = state?.totalAmount ?? 0;
  const deliveryDate = state?.deliveryDate ?? "";
  const mealType = state?.mealType ?? "";
  const timeSlot = state?.timeSlot ?? "";
  const addressFromCart = state?.address ?? "";
  const latitude = state?.latitude ?? null;
  const longitude = state?.longitude ?? null;

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const sendOrderToWhatsApp = (orderData: any) => {
    const businessNumber = "919220829266"; // 👈 apna WhatsApp number daalo

    const message = `
🛒 *New Order Received*

👤 Name: ${orderData.name}
📞 Phone: ${orderData.phone}
📍 Address: ${orderData.address}, ${orderData.city} - ${orderData.pincode}

📅 Delivery Date: ${orderData.deliveryDate}
🍱 Meal Type: ${orderData.mealType}
⏰ Time Slot: ${orderData.timeSlot}

💳 Payment: ${orderData.paymentMethod}
💰 Total: ₹${orderData.totalAmount}

📦 Items:
${orderData.items
  .map(
    (item: any) =>
      `• ${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`,
  )
  .join("\n")}
`;

    const url = `https://wa.me/${businessNumber}?text=${encodeURIComponent(message)}`;

    window.location.href = url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.paymentMethod) {
      alert("Select payment method");
      return;
    }

    const orderData = {
      ...formData,
      items,
      subtotal,
      deliveryCharge,
      totalAmount,
      deliveryDate,
      mealType,
      timeSlot,
      latitude,
      longitude,
    };

    const token = localStorage.getItem("auth_token");

    if (formData.paymentMethod === "Cash on Delivery") {
      const res = await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();
      console.log("COD Response:", data);

      if (res.ok) {
        clearCart();
         sendOrderToWhatsApp(orderData);
        navigate("/orders");
      } else {
        alert(data.message || "Order failed");
      }
    }

    // ✅ ONLINE PAYMENT FLOW
    if (formData.paymentMethod === "Online Payment") {
      const token = localStorage.getItem("auth_token");

      // 1️⃣ Create Razorpay Order
      const res = await fetch(
        "http://localhost:8080/api/create-razorpay-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ totalAmount }),
        },
      );

      const razorpayOrder = await res.json();
      console.log("Order from backend:", razorpayOrder);
      console.log("Order ID:", razorpayOrder.id);

      const options = {
        key: "rzp_test_SLZq7K2gLhLi9f", // your key
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "Eatora Foods LLP",
        order_id: razorpayOrder?.id,

        prefill: {
          name: "Muskan",
          email: "test@example.com",
          contact: "6207336545", // valid 10 digit Indian number
        },

        theme: {
          color: "#3399cc",
        },
        handler: async function (response: any) {
          console.log("FULL RESPONSE:", response);

          // 🔥 FIRST CHECK: make sure all 3 fields exist
          if (
            !response.razorpay_order_id ||
            !response.razorpay_payment_id ||
            !response.razorpay_signature
          ) {
            console.error("Razorpay response incomplete");
            return;
          }

          const token = localStorage.getItem("auth_token");

          const verifyRes = await fetch(
            "http://localhost:8080/api/verify-payment",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // ✅ ADD THIS
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderData,
              }),
            },
          );

          const data = await verifyRes.json();
          console.log("Verify API response:", data);

          if (data.success) {
            sendOrderToWhatsApp(orderData);
            clearCart(); // 👈 ADD THIS LINE
            
            navigate("/thank-you");
          }
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    }
  };

  const totalPrice = subtotal + deliveryCharge;
  const totalItems = getTotalItems();
  const totalSavings = getTotalSavings();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Your cart is empty
        </h2>
        <p className="text-muted-foreground mb-6">
          Add some delicious items first!
        </p>
        <Button
          onClick={() => navigate("/")}
          className="bg-primary hover:bg-primary/90"
        >
          Browse Menu
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30 ">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-border shadow-sm">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-foreground">Checkout</h1>
            <p className="text-xs text-muted-foreground">
              {totalItems} item(s) • ₹{totalPrice}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-4 py-5 pb-36 space-y-4">
        {/* Order Summary Card */}
        <div className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden">
          <div className="bg-primary/5 border-b border-border/50 px-4 py-3">
            <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-primary" />
              Order Summary
            </h2>
          </div>
          <div className="p-4 space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center text-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">
                    {item.quantity}×
                  </span>
                  <span className="text-foreground font-medium">
                    {item.name}
                  </span>
                </div>
                <span className="font-semibold text-foreground">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
            <div className="border-t border-border/50 pt-2 mt-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">₹{subtotal}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery Charge</span>
                <span className="font-semibold">₹{deliveryCharge}</span>
              </div>

              <div className="flex justify-between text-base font-bold border-t pt-2 mt-2">
                <span>Total</span>
                <span>₹{subtotal + deliveryCharge}</span>
              </div>
              {totalSavings > 0 && (
                <div className="flex justify-between text-sm text-success">
                  <span>You save</span>
                  <span className="font-semibold">₹{totalSavings}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Delivery Details Card */}
        <div className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden">
          <div className="bg-primary/5 border-b border-border/50 px-4 py-3">
            <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Delivery Details
            </h2>
          </div>
          <div className="p-4 space-y-4">
            {/* Name */}
            <div className="space-y-1.5">
              <Label
                htmlFor="name"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5"
              >
                <User className="h-3.5 w-3.5" /> Full Name *
              </Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="h-11 bg-secondary/40 border-border/60 focus:bg-background"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <Label
                htmlFor="phone"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5"
              >
                <Phone className="h-3.5 w-3.5" /> Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="h-11 bg-secondary/40 border-border/60 focus:bg-background"
              />
            </div>

            {/* Address */}
            <div className="space-y-1.5">
              <Label
                htmlFor="address"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5"
              >
                <MapPin className="h-3.5 w-3.5" /> Delivery Address *
              </Label>
              <Input
                id="address"
                placeholder="House no., Street, Area"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="h-11 bg-secondary/40 border-border/60 focus:bg-background"
              />
            </div>

            <div className="space-y-2 border-t pt-3">
              <p className="text-sm text-muted-foreground">
                <strong>Delivery Date:</strong> {deliveryDate}
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Meal Type:</strong> {mealType}
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Time Slot:</strong> {timeSlot}
              </p>
            </div>
            {/* City & Pincode Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label
                  htmlFor="city"
                  className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5"
                >
                  <Building2 className="h-3.5 w-3.5" /> City *
                </Label>
                <Input
                  id="city"
                  placeholder="Your city"
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  className="h-11 bg-secondary/40 border-border/60 focus:bg-background"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="pincode"
                  className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5"
                >
                  <Hash className="h-3.5 w-3.5" /> Pincode *
                </Label>
                <Input
                  id="pincode"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={(e) => handleChange("pincode", e.target.value)}
                  className="h-11 bg-secondary/40 border-border/60 focus:bg-background"
                />
              </div>
            </div>

            {/* Instructions */}
            <div className="space-y-1.5">
              <Label
                htmlFor="instructions"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5"
              >
                <MessageSquare className="h-3.5 w-3.5" /> Instructions
                (Optional)
              </Label>
              <textarea
                id="instructions"
                placeholder="Any special instructions for delivery..."
                value={formData.instructions}
                onChange={(e) => handleChange("instructions", e.target.value)}
                rows={3}
                className="flex w-full rounded-md border border-border/60 bg-secondary/40 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus:bg-background resize-none"
              />
            </div>
          </div>
        </div>

        {/* Payment Method Card */}
        <div className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden">
          <div className="bg-primary/5 border-b border-border/50 px-4 py-3">
            <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" />
              Payment Method *
            </h2>
          </div>
          <div className="p-4 space-y-2">
            {[
              {
                value: "Cash on Delivery",
                label: "Cash on Delivery",
                icon: "💵",
              },
              { value: "Online Payment", label: "Online Payment", icon: "📱" },
            ].map((option) => (
              <label
                key={option.value}
                className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  formData.paymentMethod === option.value
                    ? "border-primary bg-primary/5"
                    : "border-border/50 hover:border-primary/30"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={option.value}
                  checked={formData.paymentMethod === option.value}
                  onChange={(e) =>
                    handleChange("paymentMethod", e.target.value)
                  }
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    formData.paymentMethod === option.value
                      ? "border-primary"
                      : "border-muted-foreground/40"
                  }`}
                >
                  {formData.paymentMethod === option.value && (
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  )}
                </div>
                <span className="text-lg">{option.icon}</span>
                <span className="font-medium text-sm text-foreground">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </form>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.08)] safe-area-pb z-50">
        <div className="px-4 py-3 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Total Amount</p>
            <p className="text-xl font-bold text-foreground">
              ₹{subtotal + deliveryCharge}
            </p>
          </div>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-success text-success-foreground hover:bg-primary/90  px-8 h-12 text-base font-bold rounded-xl shadow-lg"
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
