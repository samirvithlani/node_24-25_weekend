const express  = require("express")
const mongoose= require("mongoose")

//object
const app = express()
app.use(express.json()) //apply json middleware..

//app.use(roleROutes)
const userRoutes = require("./src/routes/UserRoutes")

//server...
// localhost:3000/users
//app.use(userRoutes)
//localhost:3000/user/users
//POST localhost:3000/user/user
app.use("/user",userRoutes)


const roleRoutes = require("./src/routes/RoleRotes")
app.use("/role",roleRoutes)




mongoose.connect("mongodb://127.0.0.1:27017/weekendmern").then(()=>{
    console.log("database connected..")
}).catch(()=>{
    console.log("error while connecting db..")
})


//port.. TOMCAT , port occupied 8080 33006, 27017,8080,51...
const PORT = 3001
app.listen(PORT,()=>{
    console.log("server started on port",PORT)
})








