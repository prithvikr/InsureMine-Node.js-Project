//   Schema for Scheduled Posts
const mongoose = require('mongoose');

const scheduledPostSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  scheduledDateTime: {
    type: Date,
    required: true
  }
});

const ScheduledPost = mongoose.model('ScheduledPost', scheduledPostSchema);

module.exports = ScheduledPost;

