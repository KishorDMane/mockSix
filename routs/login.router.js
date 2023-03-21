const express = require("express");
const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken")
const { SignupModel } = require('../model/signup.model');
const LoginRouter = express.Router();
LoginRouter.post("/", async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await SignupModel.findOne({ email });
        if (!user) {
            res.status(401).json({error:"invalid cresentials"})

        } else {
          const hash=user.password;
          bcrypt.compare(password,hash,function(err,result){
            if(err){
                console.log(err);
                res.status(500).json({ 
                    error:"server error"
                })
            }else if(result==false){
                res.status(401).json({error:"invalid credential"});

            }else{
                const token=jwt.sign({userID:user._id,email:user.email,name:user.name},process.env.JWT_Secret);
                res.json({token})

            }
          })

        }





    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" })
    }


})


module.exports = { LoginRouter }