require("dotenv").config();
const mongoose = require("mongoose");
const Signup = require("./Login/Signup");
const bcrypt = require("bcrypt");

const resetAdminPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const adminEmail = "alimahmoodrana82@gmail.com";
    const adminPassword = "AliRana28!";
    const adminName = "Ali Mahmood";

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const existingAdmin = await Signup.findOne({ email: adminEmail });

    if (existingAdmin) {
      await Signup.updateOne(
        { email: adminEmail },
        {
          $set: {
            password: hashedPassword,
            role: "admin",
            name: adminName
          }
        }
      );
      console.log("Admin credentials updated successfully!");

      // Verify update
      const updatedAdmin = await Signup.findOne({ email: adminEmail });
      console.log("Updated Admin Details:", {
        email: updatedAdmin.email,
        role: updatedAdmin.role,
        name: updatedAdmin.name
      });

      const passwordMatch = await bcrypt.compare(adminPassword, updatedAdmin.password);
      console.log("Password verification:", passwordMatch ? "Success" : "Failed");
    }
     else {
      const newAdmin = new Signup({
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
        role: "admin"
      });

      await newAdmin.save();
      console.log("New admin account created successfully!");
    }

  } catch (error) {
    console.error("Error in admin reset:", error);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
};

// Run the reset
resetAdminPassword();