import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("AUTH HEADER:", authHeader);   // 👈 add karo

  if (!authHeader) {
    console.log("NO AUTH HEADER ❌");
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  console.log("TOKEN RECEIVED:", token);   // 👈 add karo

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED TOKEN:", decoded);  // 👈 add karo

    req.user = decoded;
    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message);  // 👈 MOST IMPORTANT

    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
