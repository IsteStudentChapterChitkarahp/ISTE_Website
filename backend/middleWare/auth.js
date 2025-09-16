const jwt = require('jsonwebtoken');
const User = require("../models/usersSchema");

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token; // safer access
    if (!token) {
      return res.status(401).json({ message: "Please login!" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    res.status(500).json({ message: "Server error in authentication" });
  }
};

module.exports = userAuth;
