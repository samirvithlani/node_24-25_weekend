const jwt = require("jsonwebtoken")
const SECRET = "test"

const validateToken = (req,res,next)=>{

    var token = req.headers.authorization; //Bearer token
    if(token){
        if(token.startsWith("Bearer ")){

            token  = token.split(" ")[1]
            //validate...
            try{

                const user = jwt.verify(token,SECRET)
                console.log(user)
                next()

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