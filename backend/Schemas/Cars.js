const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  renterName:{
   type : String,
   required : true
  },
  hourlyPrice: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  rentedAt: {
    type: Date,
  },
  renterEmail: {
    type: String,
    required : true
  },
  totalHours:{
    type : Number,
    required : true
  },  
  totalRent:{
    type : Number,
    required : true
  },

  rented: {
    type: Boolean,
    default: false,
  },
})
const Car = mongoose.model('Car', carSchema);

module.exports = Car;