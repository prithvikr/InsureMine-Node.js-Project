const express = require('express');
const router = express.Router();
const carrierController = require('../controllers/carrierController');

router.post('/', carrierController.createCarrier);

module.exports = router;
