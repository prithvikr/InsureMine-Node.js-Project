//  Schedule Post Creation
const schedule = require('node-schedule');

// Schedule job to create posts at the specified time
const schedulePostCreation = (scheduledDateTime, message) => {
  schedule.scheduleJob(scheduledDateTime, async () => {
    try {
      const newScheduledPost = new ScheduledPost({ message, scheduledDateTime });
      await newScheduledPost.save();
      console.log('Scheduled post created:', newScheduledPost);
    } catch (error) {
      console.error('Error creating scheduled post:', error);
    }
  });
};

module.exports = schedulePostCreation;
