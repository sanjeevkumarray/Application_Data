const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Route 1: Get users with income lower than $5 USD and have a car of brand “BMW” or “Mercedes”.
router.get("/users/low-income-bmw-mercedes", async (req, res) => {
  try {
    const users = await User.find({
      income: { $lt: 5 },
      "car.brand": { $in: ["BMW", "Mercedes"] },
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Route 2: Get male users with phone price greater than 10,000.
router.get("/users/male-high-phone-price", async (req, res) => {
  try {
    const users = await User.find({
      gender: "Male",
      phone: { $gt: 10000 },
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Route 3: Get users whose last name starts with “M” and has a quote character length greater than 15 and email includes his/her last name.
router.get("/users/last-name-m-quote-email", async (req, res) => {
  try {
    const users = await User.find({
      last_name: { $regex: /^M/ },
      quote: { $exists: true, $gt: 15 },
      email: { $regex: /M/ },
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Route 4: Get users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose email does not include any digit.
router.get("/users/bmw-mercedes-audi-email-no-digit", async (req, res) => {
  try {
    const users = await User.find({
      "car.brand": { $in: ["BMW", "Mercedes", "Audi"] },
      email: { $regex: /^[^0-9]*$/ },
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Route 5: Get top 10 cities which have the highest number of users and their average income.
router.get("/users/top-10-cities", async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $group: {
          _id: "$city",
          count: { $sum: 1 },
          totalIncome: { $sum: "$income" },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
      {
        $project: {
          _id: 0,
          city: "$_id",
          count: 1,
          avgIncome: { $divide: ["$totalIncome", "$count"] },
        },
      },
    ]);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
