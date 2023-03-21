const express=require("express");
const cors=require("cors");


  
const connection=require("./config/db")
const {SignupRouter}=require("./routs/signup.router")
const {LoginRouter}=require("./routs/login.router")

app=express();
app.use(express.json());
app.use(cors())
app.get('/',(req,res)=>{
    res.send("app is started")
})

app.use("/signup",SignupRouter)
app.use("/login",LoginRouter)
app.listen(8000,async()=>{
    await connection
    console.log("8000 is started")
})
