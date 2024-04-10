const userModel = require("../models/user");

//Donar-List
const donarListController=async(req,res)=>{
    try {
        const donarData=await userModel.find({role:"donar"})
        .sort({createdAt:-1})
        return res.status(200).send({
            success:true,
            TotalCount:donarData.length,
            message:"Donar list fetched successfully",
            donarData
        })
    } catch (error) {
        return res.status(402).send({
            success:false,
            message:"Donar LIst not fetched",
            error
        })
    }
}

module.exports=donarListController;

//Hospital-List
const hospitalListController=async(req,res)=>{
    try {
        const hospitalData=await userModel.find({role:"hospital"})
        .sort({createdAt:-1})
        return res.status(200).send({
            success:true,
            TotalCount:hospitalData.length,
            message:"hospital list fetched successfully",
            hospitalData
        })
    } catch (error) {
        return res.status(402).send({
            success:false,
            message:"Donar LIst not fetched",
            error
        })
    }
}

module.exports=donarListController;

//Organization-List
const organizationListController=async(req,res)=>{
    try {
        const organizationData=await userModel.find({role:"organization"})
        .sort({createdAt:-1})
        return res.status(200).send({
            success:true,
            TotalCount:organizationData.length,
            message:"Donar list fetched successfully",
            organizationData
        })
    } catch (error) {
        return res.status(402).send({
            success:false,
            message:"Donar LIst not fetched",
            error
        })
    }
}

const deleteDonarHospitalOrg=async(req,res)=>{
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success:true,
            message:"Record deleted successfully",
        })
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:"Error occured",
            error
        })
    }
    

}

module.exports={
    donarListController,
    hospitalListController,
    organizationListController,
    deleteDonarHospitalOrg
};