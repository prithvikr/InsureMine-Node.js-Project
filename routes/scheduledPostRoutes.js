const express = require('express');
const router = express.Router();
const scheduledPostController = require('../controllers/scheduledPostController');

// Route for creating a scheduled post
router.post('/scheduled-posts', scheduledPostController.createScheduledPost);

// Export the router
module.exports = router;
