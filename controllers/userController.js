const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const registerController = async (req,res) => {
    try {
        const {username, email, password} = req.body


        // validation
        if(!username || !email || !password) {
            return res.status(500).send({
                success : false,
                message: "please provide All Fields"
            })
        }

        console.log(`Login Data : ${email} , ${password} , ${username}`);


        const existUser = await userModel.findOne({email});
        if(existUser){
            console.log("user already exists");
            return res.status(500).send({
                success: false,
                message : "user already exists"
            })
        }
        
        // hashing
        const salt = await bcrypt.genSalt(10);  // 10 rounds
        const hashPwd = await bcrypt.hash(password,salt);

        const newUser = new userModel({username, email, password : hashPwd});
        await newUser.save();

        res.status(201).send({
            success : true,
            message : "new User Registered Succesfully",
            newUser

        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message : "Register API",
            error
        })
    }


}


const loginController = async (req,res) => {

    try{

        const {email, password} = req.body
        const user = await userModel.findOne({email})
        if(!user) {
            return res.status(404).send({
                success : false,
                message : 'Invalid email or Password'
            })
        }

        const matched = await bcrypt.compare(password, user.password);
        if(!matched){
            return res.status(500).send({
                success : false,
                message: 'wrong username or password'
            })
        }

        //token
        const token = await jwt.sign({id : user._id}, process.env.JWT_SEC , {
            expiresIn : "1d",
        });

        res.status(200).send({
            success : true,
            message: 'Login Succesfull',
            token,
            user
        })

    }catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message : "Register API",
            error
        })
    }
}


module.exports = { registerController , loginController };