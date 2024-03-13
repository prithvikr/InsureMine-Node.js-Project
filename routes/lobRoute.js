const express = require('express');
const router = express.Router();
const lobController = require('../controllers/lobController');

router.post('/', lobController.createLob);

module.exports = router;
