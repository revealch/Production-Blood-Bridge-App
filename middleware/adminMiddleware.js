//This middleware is used to verify if logged in user is admin or not

const userModel = require("../models/user");



const adminMiddleware=async(req,res,next)=>{
    try {
        const user=await userModel.findById(req.body.userId);
        if(user?.role!=="admin"){
            return res.status(401).send({
                success:false,
                message:"auth failed",
            })
        }
        else{
            next();
        }
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success:false,
            message:"Auth failed",
            error
        })
    }
}

module.exports=adminMiddleware;