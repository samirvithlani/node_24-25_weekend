const jwt = require("jsonwebtoken")
require("dotenv").config()
const SECRET =  process.env.JWT_SECRET || "test"
const  JWT_REFRESH_SECRET  = process.env.JWT_REFRESH_SECRET || "samir"

const generateToken =(object)=>{

       return jwt.sign(object,SECRET,{expiresIn:60})
}
const generateRefereshToken = (object)=>{
    
    return jwt.sign(object,JWT_REFRESH_SECRET,{expiresIn:60*60*60*60})
}
module.exports = {
    generateToken,
    generateRefereshToken
}