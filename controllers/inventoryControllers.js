const userModel = require("../models/user");
const inventoryModel = require("../models/inventory");
const { default: mongoose } = require("mongoose");

const createInventory = async (req, res) => {
  try {
    const { email, inventoryType } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    //if (inventoryType === "in" && user.role !== "donar") {
    //    throw new Error("User is not donar");
    //}
    //if (inventoryType === "out" && user.role !== "hospital") {
    //  throw new Error("User is not hospital");
    //}
    if (inventoryType === "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfbBlood = req.body.quantity;
      const organization = new mongoose.Types.ObjectId(req.body.userId);
      //calculate blood quantity
      const totalInRequestedBloodAvailable = await inventoryModel.aggregate([
        {
          $match: {
            organization,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalIn = totalInRequestedBloodAvailable[0]?.total || 0;

      const totalOutRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organization,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutRequestedBlood[0]?.total || 0;
      const availableQuantityOfBloodGroup = totalIn - totalOut;
      if (availableQuantityOfBloodGroup < requestedQuantityOfbBlood) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuantityOfBloodGroup}ML of ${requestedBloodGroup} is available`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donar = user?._id;
    }
    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(200).send({
      success: true,
      message: "Inventory Created",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getInventory = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organization: req.body.userId,
      })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "User displayed",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in getting inventory",
      error: error.message, // Return only the error message
    });
  }
};

const getDonar = async (req, res) => {
  try {
    const organization = req.body.userId;
    //find donors
    const donarId = await inventoryModel.distinct("donar", {
      organization,
    });
    const donar = await userModel.find({ _id: { $in: donarId } });
    res.status(200).send({
      success: true,
      message: "Donor fetched successfully",
      donar,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in donor records",
      error: error.message, // Send only the error message for security reasons
    });
  }
};

const getHospital = async (req, res) => {
  try {
    const organization = req.body.userId;
    const hospitalId=await inventoryModel.distinct("hospital",{organization});
    const hospital=await userModel.find({_id:{$in : hospitalId}})
    return res.status(200).send({
      success:true,
      message:"Hospital record fetched successfully",
      hospital
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in fetching hospital api",
      error,
    });
  }
};

const getOrganization=async(req,res)=>{
  try {
    const donar=req.body.userId;
    const orgId=await inventoryModel.distinct("organization",{donar});
    const organizations=await userModel.find({_id:{$in:orgId}})
    return res.status(200).send({
      success:true,
      message:"Organization fetched successfully",
      organizations,
    })

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in fetching organization api",
      error,
    });
  }
}

const getOrganizationForHospital=async(req,res)=>{
  try {
    const hospital=req.body.userId;
    const orgId=await inventoryModel.distinct("organization",{hospital});
    const organizations=await userModel.find({_id:{$in:orgId}})
    return res.status(200).send({
      success:true,
      message:"Organization fetched successfully",
      organizations,
    })

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in fetching organization api",
      error,
    });
  }
}

const getConsumerInventory = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find(req.body.filters)
      .populate("donar")
      .populate("hospital")
      .populate("organization")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      messaage: "get hospital comsumer records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in getting inventory",
      error: error.message, // Return only the error message
    });
  }
};

module.exports = {
  createInventory,
  getInventory,
  getDonar,
  getHospital,
  getOrganization,
  getOrganizationForHospital,
  getConsumerInventory,
};

