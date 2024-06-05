
const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { auth } = require("../middlewares/auth")
const bannedModel = require("../models/banneduser.model")
const { adminauth } = require("../middlewares/adminauth")


const bannedRoutes = express.Router()

bannedRoutes.get("/", auth, async (req, res) => {

    try {
        let User = await bannedModel.find()
        if (User.length > 0) {
            res.send({ users: User });

        } else {
            res.send({ msg: `No user found` })
        }
    } catch (e) {
        res.send({ msg: "Error", reason: e.message })
    }
})


bannedRoutes.post("/add/:id",auth, async (req, res) => {
    const id = req.params.id
    console.log(req.body)
    try {
        let ExistingUser = await bannedModel.findById(id)
        if (ExistingUser) {
            res.send({ msg: "User Already banned" })
        } else {
            const date = new Date()
            const curyear = date.getFullYear()
            const curmonth = date.getMonth()
            const curday = date.getDay() 
            let newUser = new bannedModel({ userId:id, year:curyear,day:curday ,month:curmonth})
            await newUser.save();
            res.send({ msg: "New User banned", user: newUser })
        }
    } catch (e) {
        console.log(e)
        res.send({ msg: e.message })
    }
})
bannedRoutes.delete("/remove/:id", async (req, res) => {
    const id = req.params.id

    try {
        const deleteduser = await bannedModel.findByIdAndDelete(id)
        res.send({msg:`Bann has been removed from ${deleteduser.userId}`})
    } catch (e) {
        res.send({ msg: "Error", reason: e.message })
    }
})

module.exports = bannedRoutes