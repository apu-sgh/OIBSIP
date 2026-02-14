const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const isAuthenticated = require("../middleware/authMiddleware");

const router = express.Router();

// Show Register Page
router.get("/register", (req, res) => {
    res.sendFile("register.html", { root: "./views" });
});

// Show Login Page
router.get("/login", (req, res) => {
    res.sendFile("login.html", { root: "./views" });
});

// Register
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        username,
        email,
        password: hashedPassword
    });

    res.redirect("/login");
});

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(!user) return res.send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) return res.send("Invalid credentials");

    req.session.userId = user._id;
    res.redirect("/dashboard");
});

// Dashboard
router.get("/dashboard", isAuthenticated, (req, res) => {
    res.sendFile("dashboard.html", { root: "./views" });
});

// Logout
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
});

module.exports = router;
