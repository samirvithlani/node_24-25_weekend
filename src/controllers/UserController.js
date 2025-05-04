//functions
const userModel = require("../models/UserModel");
//userModel == userSchema
//userModel.find()

const getAllUsers = async (req, res) => {
  // userModel.find().then((uises)=>{

  // })

  const users = await userModel.find().populate("role"); //find [] //("role") // columnName 
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

const getUserById = async (req, res) => {
  //req.params.id
  //var id = req.params.id
  const foundUser = await userModel.findById(req.params.id); //{} || null
  if (foundUser) {
    res.json({
      message: "user found..",
      data: foundUser,
    });
  } else {
    res.json({
      message: "user not dound",
      data: null,
    });
  }
};

// const getUsersByName=async(req,res)=>{

// const foundUsers = await userModel.find({name:req.params.name})
// if(foundUsers.length>0){
//   res.json({
//     message:"users found",
//     data:foundUsers
//   })
// }
// else{
//   res.json({
//     message:"user with this creiteria not found",
//     data:[]
//   })
// }

// }

const getUsersByName = async (req, res) => {
  const query = req.query;
  console.log("query..", query);
  //const foundUsers = await userModel.find({name:req.query.name})
  var age = parseInt(req.query.age);
  const foundUsers = await userModel.find({ name: req.query.name, age: age });
  if (foundUsers.length > 0) {
    res.json({
      message: "users found",
      data: foundUsers,
    });
  } else {
    res.json({
      message: "user with this creiteria not found",
      data: [],
    });
  }
};

const addUser = async (req, res) => {
  //req.params
  //req.query
  //req.body
  //req.header

  //req.body -->{json}
  try {
    const savedUser = await userModel.create(req.body);
    //201 status code...
    res.status(201).json({
      message: "user saved",
      data: savedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "internal server error",
      data: err,
    });
  }
};

const deleteUser = async (req, res) => {
  //req.params.id
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      res.status(200).json({
        message: "user deleted",
        data: deletedUser,
      });
    } else {
      res.status(404).json({
        message: "user not found to delete",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "internal server error",
      data: err,
    });
  }
};

//update tablename set param  where id=?

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const dataToUpdate = req.body;

  try {
    //{new:true} --> updated data
    //{new:false} --> old data
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      dataToUpdate,
      { new: true }
    );
    if (updatedUser) {
      res.status(200).json({
        message: "user updated",
        data: updatedUser,
      });
    } else {
      res.status(404).json({
        message: "user not found to update",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "internal server error",
      data: err,
    });
  }
};
//hobby name --> req.body -->user id >
//update table set hobby = ? where id = ?

const addHobby = async(req,res)=>{

  const userId = req.params.id; //amitabh, x,y,x...
  const hoobyName = req.body.hobbyName; //dancing...

  const updatedUser  = await userModel.findByIdAndUpdate(userId,{$push:{hobbies:hoobyName}},{new:true})
  if (updatedUser) {
    res.status(200).json({
      message: "user updated",
      data: updatedUser,
    });
  } else {
    res.status(404).json({
      message: "user not found to update",
    });
  }

}

module.exports = {
  getAllUsers,
  getUserById,
  getUsersByName,
  addUser,
  deleteUser,
  updateUser,
  addHobby,
};
