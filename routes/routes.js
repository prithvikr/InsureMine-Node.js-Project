const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadController");
const searchController = require("../controllers/searchController");
const aggregationController = require("../controllers/aggregationController");

router.post("/upload", uploadController.uploadData);
router.post("/search", async(req ,res)=>{
    try{
        let { firstname} = req.body;
        firstname = firstname.trim();
        const usrData = await searchController.searchByUsername(firstname);
    }catch{error}
}); 
  
router.get("/aggregate", aggregationController.aggregateByUser);

module.exports = router;
