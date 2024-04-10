const {handleTest}=require("../controllers/testControllers");
const express=require("express")

const routes=express.Router();

routes.get("/",handleTest);

module.exports=routes;