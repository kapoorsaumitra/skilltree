const {Router} = require("express")
const adminRouter = Router()
const {adminModel } = require("../db.js")
const jwt = require("jsonwebtoken")
const JWT_ADMIN_PWD = process.env.JWT_ADMIN_PWD


adminRouter.post("/signup",async function(req,res){
  //TODO: add zod validation
  const { email, password, firstName, lastName } = req.body;
  // TODO: add bcrypt to store hashed passwords
  try {
    await adminModel.create({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });
    res.json({
      message: "account created!"
    });
  } catch (e) {
    console.error("There has been an error:", e);
    res.status(500).json({
      error: "Internal Server Error"
    });
  }
})

adminRouter.post("/login",async function(req,res){
    const { email, password } = req.body;
    // pwd should be hashed, implement bcrypt above and update logic 
    const admin = await adminModel.findOne({
      email: email,
      password: password
    });
  
    if(admin){
  
      // TODO : implement cookies/session based auth
      const token = jwt.sign({
        id:admin._id
      },JWT_ADMIN_PWD)
  
      res.json({
        token : token
      })
    }else{
      res.status(403).json({
        message: "login failed -> incorrect creds"
      })
    }
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