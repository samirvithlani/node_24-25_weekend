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

const getUserById=async(req,res)=>{

  //req.params.id
  //var id = req.params.id
  const foundUser = await userModel.findById(req.params.id) //{} || null
  if(foundUser){
    res.json({
      message:"user found..",
      data:foundUser
    })
  }
  else{
    res.json({
      message:"user not dound",
      data:null
    })
  }
  


}

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

const getUsersByName=async(req,res)=>{

  const query = req.query;
  console.log("query..",query)
  //const foundUsers = await userModel.find({name:req.query.name})
  var age = parseInt(req.query.age)
  const foundUsers = await userModel.find({name:req.query.name,age:age})
  if(foundUsers.length>0){
    res.json({
      message:"users found",
      data:foundUsers
    })
  }
  else{
    res.json({
      message:"user with this creiteria not found",
      data:[]
    })
  }
  
  
  }

const addUser = async(req,res)=>{

  //req.params
  //req.query
  //req.body
  //req.header

  //req.body -->{json}
  const savedUser  = await userModel.create(req.body)
  res.json({
    message:"user saved",
    data:savedUser
  })
  


}


module.exports = {
  getAllUsers,
  getUserById,
  getUsersByName,
  addUser
};
