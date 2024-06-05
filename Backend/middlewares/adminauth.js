
const jwt = require("jsonwebtoken")
const adminModel = require("../models/admin.model")
const adminauth = async (req, res, next) => {
   const token = req.headers.authorization
   if (token) {
      const decoded = jwt.verify(token,"tough-admin")
      if (decoded) {
         console.log("decoded",decoded)
         const adminid = decoded.userId
         let admindata = await adminModel.findById(adminid)
         if(admindata){
            next()
         }
         else{
            res.status(404).send({msg:"You are not authorized to do this"})
         }
         next()
      }
      else {
         res.send("Login First")
      }
   }
   else {
      res.send("Login First")
   }
}

module.exports = { adminauth }