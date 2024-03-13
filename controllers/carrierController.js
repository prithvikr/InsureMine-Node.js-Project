const Carrier = require('../models/carrierModel');

exports.createCarrier = async (req, res) => {
  try {
    const carrier = await Carrier.create(req.body);
    res.status(201).json(carrier);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
