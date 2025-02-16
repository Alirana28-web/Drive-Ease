require("dotenv").config();
const mongoose = require("mongoose");
const Signup = require("./Login/Signup");
const bcrypt = require("bcrypt");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const existingAdmin = await Signup.findOne({ email: "alimahmoodrana82@gmail.com" });
    
    if (existingAdmin) {
      if (existingAdmin.role !== "admin") {
        await Signup.updateOne(
          { email: "alimahmoodrana82@gmail.com" },
          { $set: { role: "admin" } }
        );
        console.log("Admin role updated!");
      } else {
        console.log("Admin already exists with correct role!");
      }
    } else {
      const hashedPassword = await bcrypt.hash("AliRana28!", 10);
      
      const admin = new Signup({
        name: "Ali Mahmood",
        email: "alimahmoodrana82@gmail.com",
        password: hashedPassword,
        role: "admin"
      });
      
      await admin.save();
      console.log("Admin user created successfully!");
    }
    
    const verifyAdmin = await Signup.findOne({ email: "alimahmoodrana82@gmail.com" });
    console.log("Admin verification:", {
      email: verifyAdmin.email,
      role: verifyAdmin.role
    });
    
  } catch (error) {
    console.error("Error in admin creation/verification:", error);
  } finally {
    await mongoose.connection.close();
  }
};

createAdmin();
