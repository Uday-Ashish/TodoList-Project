const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.CONNECTION_STR);
        console.log(`connected to MongoDB ${mongoose.connection.host}`.bgGreen);
    }catch (error) {

        console.log(`error in MongoDB origin file db.js : \n ${error}`.bgRed);
    }


};

module.exports = connectDB;