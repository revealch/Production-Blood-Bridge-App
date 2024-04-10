const mongoose=require("mongoose");

const userSchema=mongoose.Schema(
    {
        role:{
            type:String,
            required:[true,"role is required"],
            enum:["admin","organization","donar","hospital"]
        },
        email:{
            type:String,
            required:[true,"email is required"],
            unique:true,
        },
        name:{
            type:String,
            required:function(){
                if(this.role==="donar"||this.role==="admin"){
                    return true;
                }
                else{
                    return false;
                }
            },
        },
        organizationName:{
            type:String,
            required:function(){
                if(this.role==="organization"){
                    return true;
                }
                else{
                    return false;
                }
            },
        },
        hospitalName:{
            type:String,
            required:function(){
                if(this.role==="hospital"){
                    return true;
                }
                else{
                    return false;
                }
            },
        },
        password:{
            type:String,
            required:[true,"password is required"],
        },
        address:{
            type:String,
            required:[true,"address is required"]
        },
        phone:{
            type:String,
            required:[true,"phone is required"]
        }
    },{timestamps:true}
);

const userModel=mongoose.model("user",userSchema);
module.exports=userModel;