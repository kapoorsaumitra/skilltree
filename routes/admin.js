const {Router} = require("express")
const adminRouter = Router()
const {adminModel } = require("../db.js")
adminRouter.post("/signup",function(req,res){

})

adminRouter.post("/login",function(req,res){

})

adminRouter.post("/",function(req,res){
    // create a course
})

adminRouter.get("/bulk",function(req,res){
    // get all the created courses
})

adminRouter.put("/",function(req,res){
    // update course details
})




module.exports = {
    adminRouter:adminRouter
}