
// var user = require("./user")
// console.log("HELLO")
// console.log("user",user, user.userName , user.userAge)
// var power = user.test(12)
// console.log("power",power)

const express  = require("express")

//object
const app = express()


//get...

app.get("/test",(req,res)=>{
    console.log('test api called...')
    //res.send("test api called...")
    res.json({
        message:"test api called..."
    })
})

var users = [
    {
        id:1,
        name:"ram",
        age:20,
        gender:"male",
        city:"delhi",
    },
    {
        id:2,
        name:"shyam",
        age:23,
        gender:"male",
        city:"ahmedabad"
    }
]


///localhost:3001/users
app.get("/users",(req,res)=>{
    res.json({
        message:"users data",
        data:users
    })
})
//params...
//:id wildcard char :id --> data
app.get("/user/:id",(req,res)=>{

    //console.log(req.params)
    console.log("user id",req.params.id)
    const foundUser = users.find((user)=>user.id == req.params.id)
    console.log("foundUser",foundUser)
    if(foundUser){
        res.json({
            message:"user found",
            data:foundUser
        })
    }
    else{
        res.json({
            message:"user not found",
            data:{}
        })
    }

   
})


//port.. TOMCAT , port occupied 8080 33006, 27017,8080,51...
const PORT = 3001
app.listen(PORT,()=>{
    console.log("server started on port",PORT)
})








