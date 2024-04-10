const express=require("express");
const { createInventory, getInventory, getDonar, getHospital, getOrganization, getOrganizationForHospital, getConsumerInventory } = require("../controllers/inventoryControllers");
const { authMiddleware } = require("../middleware/auth");
const Router=express.Router();

Router.post("/create-inventory",authMiddleware,createInventory)
Router.get("/get-inventory",authMiddleware,getInventory);
Router.get("/get-donar",authMiddleware,getDonar);
Router.get("/get-hospital",authMiddleware,getHospital);
Router.get("/get-organization",authMiddleware,getOrganization);
Router.get("/get-organization-for-hospital",authMiddleware,getOrganizationForHospital);
Router.post("/get-inventory-hospital",authMiddleware,getConsumerInventory);

module.exports=Router;