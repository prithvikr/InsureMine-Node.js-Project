// models/userModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true, index: true },
  dob: { type: Date, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, required: true },
  userType: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// const createUsersCollection = async () => {
//   try {
//     const connection = mongoose.connection;
//     connection.on("open", async () => {
//       const collections = await connection.db.listCollections().toArray();
//       const collectionNames = collections.map((collection) => collection.name);
//       if (!collectionNames.includes("users")) {
//         // Create the users collection if it doesn't exist
//         await connection.db.createCollection("users");
//         console.log("Created users collection");
//       }

//       // Now you can create the index on the users collection
//       await connection.db.collection("users").createIndex({
//         firstName: 1
//       });
//       console.log("Index created on users collection");
//     });
//   } catch (error) {
//     console.error("Error creating users collection:", error);
//   }
// };

// createUsersCollection();




module.exports = User;
