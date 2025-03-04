const {Router} = require("express")
const adminRouter = Router()
const {adminModel, courseModel } = require("../db.js")
const jwt = require("jsonwebtoken")
const { adminMiddleware } = require("../middleware/admin.js")
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

adminRouter.post("/course",adminMiddleware,async function(req,res){
    // create a course
    const adminId = req.userId;
    const {title,description,price,imageUrl} = req.body;

    const course = await courseModel.create({
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
        creatorId: adminId
    })

    res.json({
        message: "course created",
        courseId : course._id
    })


})

adminRouter.get("/course/bulk",adminMiddleware,async function(req,res){
    // get all the created courses
    const adminId = req.userId;

    const courses = await courseModel.find({
        creatorId:adminId
    })

    res.json({
        message: "courses",
        courses
    })
})

adminRouter.put("/course",adminMiddleware,async function(req,res){
    // update course details
    const adminId = req.userId;
    const {title,description,price,imageUrl, courseId} = req.body;

    const course = await courseModel.updateOne({
        _id: courseId,
        creatorId:adminId
    },{
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl
    })

    res.json({
        message: "course updated",
        courseId : course._id
    })
})




module.exports = {
    adminRouter:adminRouter
}