const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Signup = require("../Login/Signup");
const router = express.Router();
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // Add debug logging
    console.log("Login attempt for email:", email);
    
    const user = await Signup.findOne({ email }).select('+password +role');
    
    if (!user) {
      console.log("User not found for email:", email);
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User found:", {
      email: user.email,
      role: user.role,
      hasPassword: !!user.password
    });

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      console.log("Password mismatch for email:", email);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const role = user.role || "user";
    console.log("Assigned role:", role);

    const token = jwt.sign(
      { 
        id: user._id, 
        role,
        email: user.email 
      }, 
      jwtSecret, 
      { expiresIn: "1h" }
    );

    // cookie
    res.cookie("jwtoken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict',
      expires: new Date(Date.now() + 3600000), 
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: role
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed due to a server error" });
  }
});
// User Signup
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
  
    try {
      const existingUser = await Signup.findOne({ email });
      if (existingUser) return res.status(400).json({ error: "Email already in use" });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new Signup({ name, email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({
        message: "Signup successful",
        user: { id: newUser._id, name: newUser.name, email: newUser.email },
      });
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({ error: "Signup failed due to a server error" });
    }
});

module.exports = router;
