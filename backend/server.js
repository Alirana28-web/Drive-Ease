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
const admin = require("./routes/Admin")

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET, POST, DELETE, PUT",
  credentials: true,
}));

const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, "/frontend/dist")));


//routes
app.post("/details", carsRoutes);
app.get("/details", carsRoutes);

app.post("/contact", contactRoutes);

app.post("/login", authRoutes);
app.post("/signup", authRoutes);

app.get("/signup", authRoutes);


app.get("/admin", admin);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
