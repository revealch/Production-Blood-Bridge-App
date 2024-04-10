const mongoose=require("mongoose");

const inventorySchema=mongoose.Schema({
    inventoryType:{
        type:String,
        required:[true,"inventoryType is required"],
        enum:["in","out"],
    },
    bloodGroup:{
        type:String,
        required:[true,"bloodGroup is required"],
        enum:["O+","O-","AB+","AB-","A+","A-","B+","B-"],
    },
    quantity:{
        type:Number,
        required:[true,"quantity is required"],
    },
    email:{
        type:String,
        required:[true,"email is required"]
    },
    organization:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"organization is required"],
    },
    hospital:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:function(){
            return this.inventoryType==="out";
        }
    },
    donar:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:function(){
            return this.inventoryType==="in";
        }
    },
},{timestamps:true})

inventoryModel=mongoose.model("inventory",inventorySchema);
module.exports=inventoryModel;