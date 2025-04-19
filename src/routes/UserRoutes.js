//api express -->Router
//Router --> server req --> as it is --> controller 
//res --> controller ---> client
const router = require("express").Router()
const userController  = require("../controllers/UserController")

//router.get("/users",(req,res)=>{})
router.get("/users",userController.getAllUsers)    
router.get("/user/:id",userController.getUserById) 
//router.get("/userbyname/:name",userController.getUsersByName)
router.get("/userbyname",userController.getUsersByName)
router.post("/user",userController.addUser)


module.exports = router
