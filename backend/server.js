require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const app = express();

const carsRoutes = require("./routes/cars");
const contactRoutes = require("./routes/contact");
const authRoutes = require("./routes/auth");
const admin = require("./routes/Admin");

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || true
    : "http://localhost:5173",
  methods: "GET, POST, DELETE, PUT",
  credentials: true,
};
app.use(cors(corsOptions));

app.post("/details", carsRoutes);
app.get("/details", carsRoutes);
app.post("/contact", contactRoutes);
app.post("/login", authRoutes);
app.post("/signup", authRoutes);
app.get("/signup", authRoutes);
app.get("/admin", admin);

const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, "/frontend/dist")));

// Handle all other routes by serving the React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});