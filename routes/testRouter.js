const express = require("express");
const { testingController } = require("../controllers/testController");

//router obj
const router = express.Router();

//routes 
router.get('/', testingController);


module.exports = router;