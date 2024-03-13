const Lob = require('../models/lobModel');

exports.createLob = async (req, res) => {
  try {
    const lob = await Lob.create(req.body);
    res.status(201).json(lob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
