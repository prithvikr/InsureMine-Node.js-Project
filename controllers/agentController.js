const Agent = require('../models/agentModel');

exports.createAgent = async (req, res) => {
  try {
    const agent = await Agent.create(req.body);
    res.status(201).json(agent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
 