const express  = require("express")
const mongoose= require("mongoose")
require("dotenv").config()
const cors = require("cors")
//object
const app = express()
app.use(cors())
app.use(express.json()) //apply json middleware..
const validateToken = require("./src/middleware/AuthMiddleware") //require...
const Redis = require("ioredis")
const {Queue} = require("bullmq")
const http = require("http")
const server = http.createServer(app)
const {Server} = require("socket.io")
const io = new Server(server,{
    cors:{
        origin:"*",
        methods:['GET','POST']
    }
})

// app.use((req,res,next)=>{

//     const publicRoutes =["/user/login"]
//     if(publicRoutes.includes(req.path)){
//         return next() //skip..
//     }

//     return validateToken(req,res,next)

// })

//app.use(roleROutes)
const userRoutes = require("./src/routes/UserRoutes")
const uploadRoutes  = require("./src/routes/UploadRoutes")

//server...
// localhost:3000/users
//app.use(userRoutes)
//localhost:3000/user/users
//POST localhost:3000/user/user
app.use("/user",userRoutes)
app.use("/upload",uploadRoutes)


const roleRoutes = require("./src/routes/RoleRotes")
app.use("/role",roleRoutes)





mongoose.connect("mongodb://127.0.0.1:27017/weekendmern").then(()=>{
    console.log("database connected..")
}).catch(()=>{
    console.log("error while connecting db..")
})


//port.. TOMCAT , port occupied 8080 33006, 27017,8080,51...


io.on("connection",(socket)=>{
    console.log("user connected with id",socket.id)

    //on emit
    socket.on("sendMessage",(data)=>{
        console.log(`data = ${data}`)
        //socket.emit("receiveMessage",data.toUpperCase())
        socket.broadcast.emit("receiveMessage",data.toUpperCase())
    })
    
})






const PORT = process.env.PORT || 3000
server.listen(PORT,()=>{
    console.log("server started on port",PORT)
})
