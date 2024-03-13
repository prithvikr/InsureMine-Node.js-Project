const express = require('express');
const router = express.Router();
const uploadWorker = require('../workers/uploadWorker');

const upload = require('../utils/upload');

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        // Use worker threads to process the file and save data to MongoDB
         uploadWorker.processFile(req.file.path);
        res.status(200).send('File uploaded successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
