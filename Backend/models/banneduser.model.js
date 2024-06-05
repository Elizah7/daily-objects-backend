const mongoose = require("mongoose")

const bannedSchema = mongoose.Schema({
     userId:String,
     month:String,
     day:String,
     year:String
})

const bannedModel=mongoose.model("banned", bannedSchema)
module.exports=bannedModel