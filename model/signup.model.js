const mongoose=require("mongoose");

const SignupSchema=mongoose.Schema({
    profile:String,
    name:String,
    bio:String,
    phone:Number,
    email:String,
    password:String
})

const SignupModel=mongoose.model("signup",SignupSchema);

module.exports={SignupModel}