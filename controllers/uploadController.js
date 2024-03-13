const { Worker } = require('worker_threads');
const path = require('path');

exports.uploadData = async (req, res) => {
    const { file } = req;
    const worker = new Worker(path.join(__dirname, 'uploadWorker.js'), { workerData: { filePath: file.path } });

    worker.on('message', (message) => {
        console.log('Worker thread message:', message);
        res.status(200).send('File uploaded and processed successfully');
    });

    worker.on('error', (error) => {
        console.error('Error processing file:', error);
        res.status(500).send('Internal server error');
    });
};
