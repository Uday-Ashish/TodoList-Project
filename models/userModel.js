const mongoose = require("mongoose");

// creating schema
// mongoose schema object takes json as input
const userSchema = new mongoose.Schema(
    {
        username : {
            type : String,
            required : true
        },
        email : {
            type: String,
            required : true,
            unique : true
        },
        password :{
            type : String,
            required : true
        }
    },
    {
        timestamps : true
    }
);

// create user model
const userModel = mongoose.model("users", userSchema);

module.exports = userModel;