//functions
const userModel = require("../models/UserModel");
//userModel == userSchema
//userModel.find()

const getAllUsers = async (req, res) => {
  // userModel.find().then((uises)=>{

  // })

  const users = await userModel.find(); //find []
  if (users.length > 0) {
    res.json({
      message: "user fetched...",
      data: users,
    });
  } else {
    res.json({
      message: "user data is empty",
    });
  }
};

module.exports = {
  getAllUsers,
};
