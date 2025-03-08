const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Register New User
router.post("/register", async (req, res) => {
  try {
    console.log("Register API Hit");
    console.log("Request Body:", req.body);

    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      console.log("❌ User already exists!");
      return res.status(400).json({ message: "User already exists" });
    }

    console.log("📌 Plain Password:", password);

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔐 Hashed Password:", hashedPassword);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    console.log("✅ User Registered Successfully!");
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: err.message });
  }
});



// Login User
router.post("/login", async (req, res) => {
  try {
    console.log("Login API Hit");
    console.log("Request Body:", req.body);

    const { email, password } = req.body;

    // Step 1: Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found in database!");
      return res.status(400).json({ message: "Invalid credentials" });
    }
    console.log("✅ User Found:", user);

    // Step 2: Print stored and entered passwords
    console.log("🔑 Entered Password:", password);
    console.log("🔒 Stored Hashed Password:", user.password);

    // Step 3: Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match Result:", isMatch);

    if (!isMatch) {
      console.log("❌ Password does not match!");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Step 4: Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    console.log("✅ User Logged In Successfully!");

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
