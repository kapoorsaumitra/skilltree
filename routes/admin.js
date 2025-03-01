const {Router} = require("express")
const adminRouter = Router()

adminRouter.post("/signup",function(req,res){

})

adminRouter.post("/login",function(req,res){

})

adminRouter.post("/course",function(req,res){
    // create a course
})

adminRouter.get("/course/bulk",function(req,res){
    // get all the created courses
})

adminRouter.put("/course",function(req,res){
    // update course details
})




module.exports = {
    adminRouter:adminRouter
}