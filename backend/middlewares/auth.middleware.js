const JWT = require("jsonwebtoken");
const UserModel = require("../models/user.model.js");

 const authentication = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - Token not provided" });
    }
    JWT.verify(token, process.env.JWT_SECRET, async (err, data) => {
      if (err) {
        return res.status(403).json({ error: "Forbidden - Invalid token" });
      }
      const user = await UserModel.findOne({ _id: data._id });
      if (!user) return res.status(401).json({ error: "Unauthorized - User not found" });
      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
module.exports = authentication;
