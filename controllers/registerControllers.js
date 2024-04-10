const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");

const handleRegister = async (req, res) => {
    try {
        const existingUser = await user.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(200).json({
                success: false,
                message: "User already exists",
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashpassword;

        const newUser = new user(req.body);
        await newUser.save();

        return res.status(200).json({
            success: true,
            message: "User registered",
            newUser
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in register API",
            error: error.message, // Return only the error message
        });
    }
};

const handleLogin=async(req,res)=>{
    try {
        const User=await user.findOne({email:req.body.email});
        if(!User){
            return res.status(404).json({
                success:false,
                message:"User not found",
            })
        }
        //check role
        if(User.role!==req.body.role){
            return res.status(500).send({
                success:false,
                message:"role doesn't match",
            })
        }
        //compare password
        const comparePassword=await bcrypt.compare(req.body.password,User.password);
        if(!comparePassword){
            return res.status(500).json({
                success:false,
                message:"Wrong Password",
            })
        }

        const token=jwt.sign({userid:User._id},process.env.JWT_SECRET,{
            expiresIn:"1d",
        });
        return res.status(200).json({
            success:true,
            message:"LoggedIn Suceesfully",
            token,
            User,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in login API",
            error: error.message, // Return only the error message
        });
    }
}

const handleCurrneUser=async(req,res)=>{
    try {
        const User=await user.findOne({_id:req.body.userId});
        
        return res.status(200).send({
            success:true,
            message:"User fetched successfully",
            User,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error",
            error: error.message, // Return only the error message
        });
    }
}

module.exports = {
    handleRegister,
    handleLogin,
    handleCurrneUser,
};
