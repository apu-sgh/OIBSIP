const express = require("express");
const session = require("express-session");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");

const app = express();

connectDB();

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: false
}));

app.use(express.static("views"));
app.use(authRoutes);

app.get("/", (req, res) => {
    res.redirect("/login");
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
