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
const adminRoutes = require("./routes/Admin");

const Session = require("./Schemas/Session");

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Auth Middleware
module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    
    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const session = await Session.findOne({
      userId: decoded.id,
      sessionId: decoded.sessionId
    });
    
    if (!session) {
      return res.status(401).json({ error: "Session expired or invalid" });
    }
    
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ error: "Authentication failed" });
  }
};

// CORS Configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || true
    : "http://localhost:5173",
  methods: "GET, POST, DELETE, PUT",
  credentials: true,
};

app.use(cors(corsOptions));

//server routes
app.get("/details", carsRoutes);
app.post("/details", carsRoutes);
app.put("/details/accept/:id", carsRoutes);
app.put("/details/reject/:id", carsRoutes);
app.delete("/details/:id", carsRoutes);  

app.get("/admin", adminRoutes);
app.post("/contact", contactRoutes);

app.post("/login", authRoutes);
app.post("/signup", authRoutes);
app.get("/signup", authRoutes);

const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
