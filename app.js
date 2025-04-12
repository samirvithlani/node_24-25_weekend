const express  = require("express")

//object
const app = express()


//app.use(roleROutes)
const userRoutes = require("./src/routes/UserRoutes")
//server...
// localhost:3000/users
//app.use(userRoutes)
//localhost:3000/user/users
app.use("/user",userRoutes)



//port.. TOMCAT , port occupied 8080 33006, 27017,8080,51...
const PORT = 3001
app.listen(PORT,()=>{
    console.log("server started on port",PORT)
})








