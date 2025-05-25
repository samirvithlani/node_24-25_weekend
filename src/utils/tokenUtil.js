const jwt = require("jsonwebtoken")
const SECRET = "test"

const generateToken =(object)=>{

       return jwt.sign(object,SECRET,{expiresIn:60})
}

module.exports = {
    generateToken
}