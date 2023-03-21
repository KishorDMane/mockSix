require("dotenv").config();
const jwt=require('jsonwebtoken');

const verifyJWT=(req,res,next)=>{
    const token=req.headers?.authorization?.split(" ")[1]
    if(!token){
        res.status(401).json({"msg":"no token is provided"});

    }

    const jwtsecrit=process.env.JWT_Secret
// console.log(jwtsecrit)
    jwt.verify(token,jwtsecrit,(error,decoded)=>{
        if(error){
            res.status(401).json({"msg":"failed to authorize token"});

        }else{
            req.user=decoded;
      
            next()
            
        }
    })
}
module.exports={verifyJWT}