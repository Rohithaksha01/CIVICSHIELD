const express = require("express");
const router = express.Router();
const Citizen = require("../models/Citizen");

router.post("/register", async (req, res) => {

    try {

        const citizen = new Citizen(req.body);

        await citizen.save();

        res.json({ message: "Citizen Registered Successfully" });

    }

    catch (error) {

        res.status(500).json({ error: error.message });

    }

});

module.exports = router;