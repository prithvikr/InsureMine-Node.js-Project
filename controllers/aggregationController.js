const Policy = require("../models/policyModel");

exports.aggregateByUser = async (req, res) => {
  try {
    const aggregatedPolicies = await Policy.aggregate([
      // Add aggregation pipeline stages here
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
    ]).maxTimeMS(30000);
    res.status(200).json(aggregatedPolicies);
  } catch (error) {
    console.error("Error aggregating policies by user:", error);
    res.status(500).send("Internal server error");
  }
};
