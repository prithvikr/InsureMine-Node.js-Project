const Policy = require('../models/policyModel');

exports.createPolicy = async (req, res) => {
  try {
    const policy = await Policy.create(req.body);
    res.status(201).json(policy);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
