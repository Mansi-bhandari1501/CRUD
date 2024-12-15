const express = require('express');
const  authentication  =require("../middlewares/auth.middleware.js");
const userController =require('../controller/user.controller.js');

const {
  loginUser,
  registerUser,
  getAllUsers,
  getSpecificUser
} = userController;

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/all", authentication, getAllUsers);
router.get("/", authentication, getSpecificUser);

module.exports= router;
