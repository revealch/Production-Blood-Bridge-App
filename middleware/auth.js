const jwt=require("jsonwebtoken");

const authMiddleware=async(req,res,next)=>{
    try {
        const token=req.headers["authorization"].split(" ")[1];
        jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
            if(err){
                return res.status(401).send({
                    success:false,
                    err,
                    meassage:"Auth Failed",
                });
            }
            else{
                req.body.userId=decode.userid;
                next();
            }
        });
    } catch (error) {
        return res.status(500).send({
            success:false,
            error,
            meassage:"Auth Failed",
        })
    }
}

module.exports={
    authMiddleware,
}