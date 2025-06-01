const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Cars = require("../Schemas/Cars");
const sendConfirmationEmail = require("../email");

router.post("/details", async (req, res) => {
  const { car, renterPhone,address, renterName, totalRent, totalHours } = req.body;
  if (!car || !renterPhone || !address|| !renterName || !totalRent || !totalHours) {
    return res.status(400).json({ error: "All fields are required" });
  }
  
  try {
    const newCar = new Cars({ 
      ...car, 
      renterPhone, 
      renterName, 
      address,
      totalRent, 
      totalHours, 
      rentedAt: new Date() 
    });
    const savedCar = await newCar.save();
    await sendConfirmationEmail(renterPhone, renterName, car, totalRent, totalHours);
    
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

router.delete("/details/:id", async (req, res) => {
  try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ error: "Invalid car ID" });
      }

      const deletedCar = await Cars.findByIdAndDelete(id);
      
      if (!deletedCar) {
          return res.status(404).json({ error: "Car not found" });
      }

      res.status(200).json({ message: "Car deleted successfully", deletedCar });
  } catch (error) {
      console.error("Error deleting car:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});
// Accept a car rental request
router.put("/details/accept/:id", async (req, res) => {
  try {
    const carId = req.params.id;
    const updatedCar = await Cars.findByIdAndUpdate(
      carId,
      { 
        status: "approved", 
        rented: true 
      },
      { new: true }
    );
    
    if (!updatedCar) {
      return res.status(404).json({ message: "Car rental request not found" });
    }
  
    res.status(200).json({ 
      message: "Car rental request approved successfully", 
      data: updatedCar 
    });
  } catch (error) {
    console.error("Error accepting car rental:", error);
    res.status(500).json({ message: "Failed to accept car rental request" });
  }
});

// Reject a car rental request
router.put("/details/reject/:id", async (req, res) => {
  try {
    const carId = req.params.id;
    const { rejectionReason } = req.body; 
    
    const updatedCar = await Cars.findByIdAndUpdate(
      carId,
      { 
        status: "rejected", 
        rented: false,
        rejectionReason: rejectionReason || "No reason provided"
      },
      { new: true }
    );
    
    if (!updatedCar) {
      return res.status(404).json({ message: "Car rental request not found" });
    }
    
    res.status(200).json({ 
      message: "Car rental request rejected", 
      data: updatedCar 
    });
  } catch (error) {
    console.error("Error rejecting car rental:", error);
    res.status(500).json({ message: "Failed to reject car rental request" });
  }
});

module.exports = router;