const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "1.1.1.1",
]);

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/Admin");

async function updateAdminPassword() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB Atlas");

    const admin = await Admin.findOne({
      email: process.env.ADMIN_EMAIL.toLowerCase(),
    });

    if (!admin) {
      console.log("Admin not found");
      return;
    }

    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10
    );

    admin.password = hashedPassword;
    await admin.save();

    console.log("Admin password updated successfully");
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await mongoose.connection.close();
  }
}

updateAdminPassword();