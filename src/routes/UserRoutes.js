//api express -->Router
//Router --> server req --> as it is --> controller 
//res --> controller ---> client
const router = require("express").Router()
const userController  = require("../controllers/UserController")
//const testMiddleware = require("../middleware/TestMiddleware")
const zodMiddleware = require("../middleware/ZodMiddeware")
const userValidationSchema = require("../validationSchema/UserValidationSchema")

//router.get("/users",(req,res)=>{})
router.get("/users",userController.getAllUsers)    
router.get("/user/:id",userController.getUserById) 
//router.get("/userbyname/:name",userController.getUsersByName)
router.get("/userbyname",userController.getUsersByName)

router.post("/user",zodMiddleware(userValidationSchema),userController.addUser)

router.delete("/user/:id",userController.deleteUser)
router.put("/user/:id",userController.updateUser)
router.put("/addhobby/:id",userController.addHobby)


module.exports = router
