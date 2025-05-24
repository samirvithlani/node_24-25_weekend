const jwt = require("jsonwebtoken")
const SECRET = "test"

const generateToken =(object)=>{

       return jwt.sign(object,SECRET)
}

module.exports = {
    generateToken
}