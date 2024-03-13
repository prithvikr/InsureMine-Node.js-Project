const express = require('express');
const router = express.Router();
// const User = require('../models/userModel');
const searchController  = require('../controllers/searchController');
router.post('/search', async (req, res) => {
    try {
        // console.log("Request in Search",req);
        // const {firstname} = req.body;
        // // username = username.trim();
        // // console.log(username);
        // if (!firstname) {
        //     return res.status(400).send('Username parameter is required');
        // }
        // controller.searchByUsername({firstname});
        // // let condition ={"where": {"firstname": username}};
        // const user = await User.findOne( condition );
        // if (!user) {
        //     return res.status(404).send('User not found');
        // }
        let { firstname} = req.body;
        firstname = firstname.trim();
        const usrData = await searchController.searchByUsername(firstname);
        res.status(200).json(usrData);
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
