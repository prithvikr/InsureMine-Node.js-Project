//  Controller Function to Handle Post Creation
exports.createScheduledPost = async (req, res) => {
    try {
      const { message, day, time } = req.body;
      const scheduledDateTime = new Date(`${day}T${time}`);
      const newScheduledPost = new ScheduledPost({ message, scheduledDateTime });
      await newScheduledPost.save();
      res.status(201).json(newScheduledPost);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  