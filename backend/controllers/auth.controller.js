// controllers/auth.controller.js
import jwt from 'jsonwebtoken'
//const jwt = require("jsonwebtoken");

export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "supersecure") {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};
    