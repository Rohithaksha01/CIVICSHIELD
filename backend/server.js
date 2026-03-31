console.log("🚀 SERVER FILE LOADED");

require("dotenv").config();

const mongoose = require("mongoose"); // ✅ FIXED
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");

require("./config/db");
const authRoutes = require("./routes/auth");

const User = require("./models/User");
const Vote = require("./models/Vote");
const Welfare = require("./models/Welfare");
const Citizen = require("./models/Citizen");
const Admin = require("./models/Admin");

const app = express();
app.use(cors());
app.use(express.json());

// ===============================
// ROUTES
// ===============================
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// ===============================
// 🔐 JWT TOKEN MIDDLEWARE
// ===============================
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // ✅ FIXED

  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    const verified = jwt.verify(token, "civicshield_secret_key");
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}

// ===============================
// 👤 USER
// ===============================
app.post("/add-user", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ message: "User added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===============================
// 🧑 CITIZEN REGISTER
// ===============================
app.post("/register-citizen", async (req, res) => {
  const { name, email, phone, aadhaar, password } = req.body;

  if (!name || !email || !phone || !aadhaar || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const exists = await Citizen.findOne({
      $or: [{ email }, { aadhaar }]
    });

    if (exists) {
      return res.json({
        message: "Citizen already registered with this Email or Aadhaar"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const citizen = new Citizen({
      name,
      email,
      phone,
      aadhaar,
      password: hashedPassword
    });

    await citizen.save();

    res.json({ message: "Citizen registered successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ===============================
// 🔑 CITIZEN LOGIN
// ===============================
app.post("/login-citizen", async (req, res) => {
  const { email, password } = req.body;

  try {
    const citizen = await Citizen.findOne({ email });

    if (!citizen) {
      return res.json({ message: "Citizen not found" });
    }

    const match = await bcrypt.compare(password, citizen.password);

    if (!match) {
      return res.json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: citizen._id, email: citizen.email },
      "civicshield_secret_key",
      { expiresIn: "2h" }
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


/* MongoDB Connection */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));


/* 👉 Create Admin (Run once) */
app.post("/create-admin", async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = new Admin({
    username,
    password: hashedPassword
  });

  await admin.save();

  res.json({ message: "Admin created securely" });
});

//ADMIN LOGIN//
app.post("/login-admin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.json({ success: false, message: "Admin not found" });
    }

    const match = await bcrypt.compare(password, admin.password);

    if (!match) {
      return res.json({ success: false, message: "Wrong password" });
    }

    res.json({ success: true, message: "Login successful" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ===============================
// 🗳️ CAST VOTE
// ===============================
app.post("/cast-vote", async (req, res) => {
  const { voterId, candidate } = req.body;

  if (!voterId || !candidate) {
    return res.status(400).json({ message: "Missing data" });
  }

  try {
    const vote = new Vote({ voterId, candidate });
    await vote.save();

    res.json({ message: "Vote cast successfully" });

  } catch (err) {
    if (err.code === 11000) {
      return res.json({ message: "Voter has already voted" });
    }

    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ===============================
// 🛒 ISSUE WELFARE
// ===============================
app.post("/issue-welfare", async (req, res) => {
  try {
    const { ration } = req.body;

    if (!ration) {
      return res.status(400).json({
        message: "Ration number is required"
      });
    }

    const exists = await Welfare.findOne({ ration });

    if (exists) {
      return res.status(409).json({
        message: "Welfare already issued"
      });
    }

    await Welfare.create({
      ration,
      status: "Pending"
    });

    res.json({
      message: "Welfare issued successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ===============================
// 📊 DASHBOARD STATS
// ===============================
app.get("/dashboard-stats", async (req, res) => {
  try {
    const votes = await Vote.countDocuments();
    const welfare = await Welfare.countDocuments();
    const citizens = await Citizen.countDocuments();

    res.json({
      votes,
      welfare,
      citizens,
      frauds: 12
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ===============================
// 📊 STATE STATS (CHART)
// ===============================
app.get("/state-stats", async (req, res) => {
  try {
    const votes = await Vote.aggregate([
      {
        $group: {
          _id: "$candidate",
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({ votes });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===============================
// 🚨 FRAUD SYSTEM
// ===============================
const FraudSchema = new mongoose.Schema({
  id: String,
  region: String,
  status: String
});

const Fraud = mongoose.model("Fraud", FraudSchema);

// GET FRAUDS
app.get("/frauds", async (req, res) => {
  try {
    let data = await Fraud.find();

    if (data.length === 0) {
      data = await Fraud.insertMany([
        { id: "FR102", region: "Karnataka", status: "Pending" },
        { id: "FR221", region: "Delhi", status: "Investigating" }
      ]);
    }

    res.json(data);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE FRAUD
app.put("/frauds/:id", async (req, res) => {
  try {
    await Fraud.findOneAndUpdate(
      { id: req.params.id },
      { status: "Resolved" }
    );

    res.json({ message: "Fraud resolved" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===============================
// 🔐 PROTECTED ROUTE
// ===============================
app.get("/citizen-dashboard", verifyToken, (req, res) => {
  res.json({
    message: "Welcome to Civic Shield Dashboard",
    user: req.user
  });
});


app.get("/api/citizens", async (req, res) => {
  const data = await Citizen.find();
  res.json(data);
});

app.get("/api/welfare", async (req, res) => {
  const data = await Welfare.find();
  res.json(data);
});

app.post("/api/approve/:id", async (req, res) => {
  await Welfare.findByIdAndUpdate(req.params.id, { status: "Approved" });
  res.json({ message: "Approved" });
});

app.post("/api/reject/:id", async (req, res) => {
  await Welfare.findByIdAndUpdate(req.params.id, { status: "Rejected" });
  res.json({ message: "Rejected" });
});


// ===============================
// 👤 APPROVE / REJECT CITIZEN
// ===============================

app.post("/api/approve/:id", async (req, res) => {
  await Welfare.findByIdAndUpdate(req.params.id, { status: "Approved" });
  res.json({ message: "Approved" });
});

app.post("/api/reject/:id", async (req, res) => {
  await Welfare.findByIdAndUpdate(req.params.id, { status: "Rejected" });
  res.json({ message: "Rejected" });
});

// ===============================
// 🚀 START SERVER
// ===============================
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});