const express = require("express");
const router = express.Router();
const Cars = require("../models/Cars");
const sendConfirmationEmail = require("../email");

// Car Details
router.post("/details", async (req, res) => {
  const { car, renterEmail, renterName, totalRent, totalHours } = req.body;
  if (!car || !renterEmail || !renterName || !totalRent || !totalHours) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newCar = new Cars({ ...car, renterEmail, renterName, totalRent, totalHours, rentedAt: new Date() });
    const savedCar = await newCar.save();
    await sendConfirmationEmail(renterEmail, renterName, car, totalRent, totalHours);

    res.status(201).json({ message: "Car details saved and email sent", data: savedCar });
  } catch (error) {
    console.error("Error saving car details:", error);
    res.status(500).json({ error: "Failed to save car details" });
  }
});

// Get Car Details
router.get("/details", async (req, res) => {
  try {
    const rentalDetails = await Cars.find();
    if (rentalDetails.length === 0) {
      return res.status(404).json({ message: "No rental details found" });
    }
    res.status(200).json(rentalDetails);
  } catch (error) {
    console.error("Error fetching rental details:", error);
    res.status(500).json({ message: "Failed to fetch rental details" });
  }
});

module.exports = router;
