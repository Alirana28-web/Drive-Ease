const express = require("express");
const router = express.Router();
const Cars = require("../models/Cars");

router.get("/details", async (req, res) => {
  const { car, renterEmail, renterName, totalRent, totalHours } = req.body;
  if (!car || !renterEmail || !renterName || !totalRent || !totalHours) {
    return res.status(400).json({ error: "No car found" });
  }

  try {
    const findcars = await Cars.find();
    res.status(201).json({ message: "Car details saved and email sent", data: findcars });
  } catch (error) {
    res.status(400).json({ message: "unable to fetch cars" });
  }
});

module.exports = router;
