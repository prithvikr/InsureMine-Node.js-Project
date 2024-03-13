const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const mongoose = require("mongoose");
const Policy = require("../models/policyModel");

const processFile = (filePath) => {
  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", async (data) => {
      const requiredFields = [
        "accountType",
        "accountName",
        "policyEndDate",
        "policyStartDate",
        "categoryName",
        "companyName",
        "policyType",
        "premiumAmount",
        "policyMode",
      ];

      const missingFields = requiredFields.filter((field) => !(field in data));

      if (missingFields.length === 0) {
        // All required fields are present, process the data
        console.log("Processing row:", data);
        // Add your processing logic here
        try {
          await Policy.create(data);
        } catch (err) {
          console.error("Error saving policy2:", err.message);
        }
      } 
      // else {
      //   // Log an error for the row with missing fields
      //   console.error("Error: Missing required fields in row:", data);
      // }
    })
    .on("end", () => {
      console.log("File processed successfully");
      if (parentPort) {
        // Notify the main thread that processing is complete
        parentPort.postMessage({ status: "success" });
      }
    })

    .on("error", (err) => {
      console.error("Error reading CSV file:", err.message);
      if (parentPort) {
        // Notify the main thread about the error
        parentPort.postMessage({ status: "error", error: err.message });
      }
    });
};

if (!isMainThread) {
  // This code runs in the worker thread
  const filePath = workerData.filePath;
  if (!filePath) {
    console.error("No file path provided to the worker thread.");
    process.exit(1);
  }
  processFile(filePath);
}

module.exports = { processFile };
