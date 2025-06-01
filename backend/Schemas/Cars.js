const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  renterName: { type: String, required: true },
  hourlyPrice: { type: Number, required: true },
  category: { type: String, required: true },
  rentedAt: { type: Date },
  renterPhone: { type: String, required: true },
  totalHours: { type: Number, required: true },
  totalRent: { type: Number, required: true },
  rented: { type: Boolean, default: false },
  address : {type : String , required : true},
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  rejectionReason: { type: String } 
});

const Car = mongoose.model('Car', carSchema);
module.exports = Car;
