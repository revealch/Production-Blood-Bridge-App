const {bloodGroupDetailsContoller, getCurInventory} = require("../controllers/analyticsControllers");
const { authMiddleware } = require("../middleware/auth");

const express=require("express");

const router=express.Router();

router.get("/bloodGroups-data",authMiddleware,bloodGroupDetailsContoller);
router.get("/cur-inventory",authMiddleware,getCurInventory);

module.exports=router;