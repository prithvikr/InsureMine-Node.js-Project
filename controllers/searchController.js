const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

const searchByUsername = async (req) => {
    try {
        // console.log("Request",req);
        const {firstname} = req;
        // console.log(username);
        // if (!username) {
        //     // if (!firstname) {
        //     //     return res.status(400).send('Either username or firstname parameter is required');
        //     // }
        //     // Generate username based on the firstname
        //     // username = firstname.toLowerCase().replace(/\s/g, '_'); // Convert to lowercase and replace spaces with underscore
        // }
        // let condition ={"where": {"firstname": username}};
        // let condition ='filter={"where": {"firstname": "'+username+'"}}';
        // let condition ={"firstname": username};
        const userData = await User.find()
        // .maxTimeMS(60000);
        console.log(userData);
        if (!userData) {
            // If the user with the generated username does not exist, create a new user
            const newUser = new User({ firstname, firstname });
            // user = await newUser.save();
        }

        // res.status(200).json(user);
    } catch (error) {
        console.error(error);
        // res.status(500).send('Internal server error');
    }
};

module.exports = {searchByUsername};


