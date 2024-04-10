const express=require("express");
const { handleRegister, handleLogin, handleCurrneUser } = require("../controllers/registerControllers");
const { authMiddleware } = require("../middleware/auth");

const router=express.Router();

router.post("/register",handleRegister);

router.post("/login",handleLogin);

router.get("/current-user",authMiddleware,handleCurrneUser);

module.exports=router;