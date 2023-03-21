const express = require("express");
const bcrypt = require("bcrypt")

const { SignupModel } = require('../model/signup.model');
const { verifyJWT } = require("../middelwear/authorization.middelwere")
const SignupRouter = express.Router();
SignupRouter.post("/", async (req, res) => {

    try {
        const { profile, name, bio, phone, email, password } = req.body;
        console.log(password)
        console.log(req.body)
        const userexist = await SignupModel.findOne({ email });
        if (userexist) {
            res.status(400).json({ 'mag': 'user exists' });

        } else {
            bcrypt.hash(password, 10, async (err, hash) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ error: "internal server error 1" })
                } else {
                    const user = new SignupModel({ profile, name, bio, phone, email, password: hash })
                    await user.save();
                    res.json(user);

                }
            })


        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error 2" })
    }
})

SignupRouter.get("/user", verifyJWT, async (req, res) => {
    const email = req.user.email
    const user = await SignupModel.findOne({ email })

    res.send(user)
})

SignupRouter.patch("/:id",verifyJWT, async (req, res) => {

    try {
        _id = req.params.id
        const { profile, name, bio, phone, email, password } = req.body;

        const payloade = { profile, name, bio, phone, email, password }
let hashedoasss=""
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error 1" })
    } else {
        const user = await SignupModel.findByIdAndUpdate(_id, { profile, name, bio, phone, email, password:hash }, { new: true })
        .then(updateduser=>{
            console.log(updateduser)
            res.send(updateduser)
        })

    }
})


       
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" })
    }


})

module.exports = { SignupRouter }