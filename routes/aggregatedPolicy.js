const express = require("express");
const router = express.Router();
const Policy = require("../models/policyModel");

router.get("/aggregatedPolicy", async (req, res) => {
  try {
    // Aggregate policy data based on user
    const aggregatedData = await Policy.aggregate([
      {
        $group: {
          _id: "$userId",
          totalPremiumAmount: { $sum: "$premiumAmount" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      { $project: { userId: "$_id", totalPremiumAmount: 1, user: 1 } },
    ]);
    res.status(200).json(aggregatedData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
