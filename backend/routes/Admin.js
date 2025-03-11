const express = require("express");
const router = express.Router();
const Cars = require("../Schemas/Cars");
const Signup = require("../Login/Signup");

// Get all cars
router.get("/details", async (req, res) => {
  try {
    const cars = await Cars.find();
    
    if (!cars || cars.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: "No cars found" 
      });
    }

    res.status(200).json({
      success: true,
      count: cars.length,
      data: cars
    });
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ 
      success: false,
      message: "Unable to fetch cars",
      error: error.message 
    });
  }
});


router.get("/signup", async (req, res) => {
  try {
   
    const rentals = await Signup.find();

    if (!rentals || rentals.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No rentals found for this email"
      });
    }

    res.status(200).json({
      success: true,
      count: rentals.length,
      data: rentals
    });
  } catch (error) {
    console.error("Error fetching rentals:", error);
    res.status(500).json({
      success: false,
      message: "Unable to fetch rental details",
      error: error.message
    });
  }
});

module.exports = router;
