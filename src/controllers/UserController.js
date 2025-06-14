//functions
const userModel = require("../models/UserModel");
const encryptUtil = require("../utils/EncryptUtil");
const tokenUtil = require("../utils/tokenUtil")
//userModel == userSchema
//userModel.find()

const mailUtil = require("../utils/MailUtil");
const UserModel = require("../models/UserModel");

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
    req.body.password = encryptUtil.encryptPassword(req.body.password);
    const savedUser = await userModel.create(req.body); //id

    //const refToken = tokenUtil.generateRefereshToken(savedUser._id)
    //UserModel.findByIdAndUpdate(savedUser._id,{user_ref_token:refToken})

    //refresh token... database store...
    //updateUser.. token filed accesstoken

    //mail
    //201 status code...
    await mailUtil.mailSend(savedUser.email, "welcome", "welcome to portal");
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

const addHobby = async (req, res) => {
  const userId = req.params.id; //amitabh, x,y,x...
  const hoobyName = req.body.hobbyName; //dancing...

  const updatedUser = await userModel.findByIdAndUpdate(
    userId,
    { $push: { hobbies: hoobyName } },
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
};

// const loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   console.log(email,password)

//   //email ---> db object [encruped password] --> plian password
//   const userFromEmail = await userModel.findOne({email: email});
//   console.log(userFromEmail)
//   if (userFromEmail) {
//     //plain password --> db encryped match
//     if (encryptUtil.comparePassword(password, userFromEmail.password)) {
//       //token..
//       const token = tokenUtil.generateToken(userFromEmail.toObject())
//       //if db token -->expiry
//       const refreshToken = tokenUtil.generateRefereshToken(userFromEmail.toObject())
//       //datbase store...
//       //findByaidandupdate(id,token{refresh})
//       res.status(200).json({
//         message: "user login successfully",
//         //data: userFromEmail,
//         token:token,
//         refreshToken
//       });
//     } else {
//       res.status(401).json({
//         message: "invalid password..",
//       });
//     }
//   } else {
//     res.status(404).json({
//       message: "user not found",
//     });
//   }
// };

const loginUser = async(req,res)=>{


  const {email,password}= req.body //encrypted..

  const userFromEmail = await userModel.findOne({email:email})
  if(userFromEmail){

    if(encryptUtil.comparePassword(userFromEmail.password,password)){

      //token gen...
      const token = tokenUtil.generateToken(userFromEmail._id)
      //db token....if token expire... refresh...
      //const refreshToken = tokenUtil.generateRefereshToken(userFromEmail._id)
      //database...
      res.status(200).json({
        message:"login success",
        token:token
      })


    }else{
      res.status(401).json({
        message:"invalid cred..."
      })
    }

  }
  else{
    res.status(404).json({
      message:"user not found..",

    })
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
  loginUser
};
