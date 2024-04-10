const { default: mongoose } = require("mongoose");
const inventoryModel = require("../models/inventory");

const bloodGroupDetailsContoller = async (req, res) => {
  try {
    const bloodGroups = ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"];
    const bloodGroupData = [];
    const organization = new mongoose.Types.ObjectId(req.body.userId);
    await Promise.all(
      bloodGroups.map(async (bloodGroup) => {
        const totalIn = await inventoryModel.aggregate([
          {
            $match: {
              bloodGroup: bloodGroup,
              inventoryType: "in",
              organization,
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$quantity" },
            },
          },
        ]);
        const totalOut = await inventoryModel.aggregate([
          {
            $match: {
              bloodGroup: bloodGroup,
              inventoryType: "out",
              organization,
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$quantity" },
            },
          },
        ]);
        const totalAvailable = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);;
        bloodGroupData.push({
          bloodGroup,
          totalIn: totalIn[0]?.total || 0,
          totalOut: totalOut[0]?.total || 0,
          totalAvailable,
        });
      })
    );
    return res.status(200).send({
      success: true,
      message: "Blood Group Details fetched successfully",
      bloodGroupData,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in fetching blood group details",
      error,
    });
  }
};

const getCurInventory = async (req, res) => {
    try {
        const curInventory=await inventoryModel
        .find({organization:req.body.userId})
        .limit(3)
        .sort({createdAt:-1});
        return res.status(200).send({
            success:true,
            message:"Current Invetory Fetched Successfully",
            curInventory
        })
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:"Current Inventory not fetched",
            error
        })
    }
};

module.exports = {
  bloodGroupDetailsContoller,
  getCurInventory,
};
