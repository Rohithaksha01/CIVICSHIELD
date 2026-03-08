const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/User");

/* =========================
   ADMIN LOGIN
========================= */

router.post("/admin-login", async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // Find admin
    const admin = await User.findOne({ email, role: "admin" });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found"
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password"
      });
    }

    // Success
    res.json({
      success: true,
      message: "Admin login successful",
      role: "admin"
    });

  } catch (error) {

    console.error("ADMIN LOGIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});


/* =========================
   OFFICER LOGIN
========================= */

const Officer = require("../models/Officer");

router.post("/officer-login", async (req, res) => {

    const { officerId, password } = req.body;

    const officer = await Officer.findOne({ officerId });

    if(!officer){
        return res.json({
            success:false,
            message:"Officer not found"
        });
    }

    if(officer.password !== password){
        return res.json({
            success:false,
            message:"Wrong password"
        });
    }

    res.json({
        success:true,
        message:"Officer Login Successful"
    });

});

module.exports = router;