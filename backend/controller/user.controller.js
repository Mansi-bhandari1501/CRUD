const errorHandler = require("../lib/utils.js");
const userService = require('../service/user.service.js')

 const registerUser = async (req, res) => {
  try {
    const response = await userService.registerUser(req.body);

    return res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user: response.user,
    });
  } catch (error) {
    console.log(error)
    errorHandler(res, error);
  }
};

 const getAllUsers = async (req, res) => {
  let users = await userService.getUsers(req.user);
    return res.status(200).send({
      success: true,
      user: users,
    });
};

 const getSpecificUser = async (req, res) => {
  try{
    let user = await userService.getSpecificUser(req.user);
    return res.status(200).send(user)

  }catch (error) {
    console.log(error)
    errorHandler(res, error);
  }
};


 const loginUser = async (req, res) => {
  try {
    const response = await userService.loginUser(req.body);
    return res.status(200).send({
      success: true,
      message: "login successfully",
      user: response.user,
      token: response.token,
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

module.exports= {
  loginUser,
  registerUser,
  getAllUsers,
  getSpecificUser
};
