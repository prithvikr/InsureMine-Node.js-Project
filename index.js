const express = require("express");
const mongoose = require("mongoose");
const { MongoClient } = require('mongodb');
const uploadRoutes = require('./routes/upload');
const searchRoutes = require('./routes/search');
const aggregatedPolicyRoutes = require('./routes/aggregatedPolicy');
const agentRoutes = require("./routes/agentRoute");
const userRoutes = require("./routes/userRoute");
const accountRoutes = require("./routes/accountRoute");
const lobRoutes = require("./routes/lobRoute");
const carrierRoutes = require("./routes/carrierRoute");
const policyRoutes = require("./routes/policyRoute");
const routes = require('./routes/routes');
const services = require('./services/cpuService');
const scheduledPostRoutes = require('./routes/scheduledPostRoutes');


const { Worker } = require("worker_threads");
const path = require("path");

const app = express();
const PORT = 3000;

async function connectToMongoDB() {
const uri = 'mongodb://localhost:27017/Policy.test';
const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    // Use client to interact with MongoDB
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    await client.close();
  }
}

connectToMongoDB();

const filePath = "uploaded/test.csv";
startWorker(filePath)
  .then(() => {
    console.log("File uploaded and processed successfully");
  })
  .catch((err) => {
    console.error("Error processing file:", err.message);
  });

function startWorker(filePath) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      path.join(__dirname, "workers", "uploadWorker.js"),
      {
        workerData: { filePath },
      }
    );

    worker.on("message", (message) => {
      if (message.status === "success") {
        resolve();
      }
    });

    worker.on("error", (err) => {
      reject(err);
    });

    worker.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}



app.use(express.json());

app.use('/api/routes', routes);

app.use('/api/upload', uploadRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/aggregate', aggregatedPolicyRoutes);

app.use("/agents", agentRoutes);
app.use("/user", userRoutes);
app.use("/account", accountRoutes);
app.use("/lob", lobRoutes);
app.use("/carrier", carrierRoutes);
app.use("/policy", policyRoutes);

app.use('/api/scheduled-posts', scheduledPostRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = app;
