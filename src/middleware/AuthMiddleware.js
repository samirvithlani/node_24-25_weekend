const jwt = require("jsonwebtoken")
require("dotenv").config()
const SECRET =  process.env.JWT_SECRET || "test"
const userModel = require("../models/UserModel")

const validateToken = async(req,res,next)=>{

    var token = req.headers.authorization; //Bearer token //access token
    
    if(token){
        if(token.startsWith("Bearer ")){

            token  = token.split(" ")[1]
            //validate...
            try{

                const user = jwt.verify(token,SECRET) //{_iat,eat,_id:""} before token exp..
                console.log(user)
                const foundUser = await userModel.findById(user.object).populate("role")
                if(foundUser && foundUser.role.name=="ADMIN"){
                    req.user = foundUser
                    next()
                }
                else{
                    res.status(401).json({
                        message:"you are not valid user for this plan..."
                    })

                }
                
                

            }catch(err){

                res.status(401).json({
                    message:"invalid...",
                    err:err
                })
            }


        }
        else{
            res.status(401).json({
                message:"token is not Bearer token"
            })
        }

    }else{
        res.status(401).json({
            message:"token is not present.."
        })
    }
    

}

module.exports = validateToken