const { Router } = require("express");
const userRouter = Router();
const { userModel } = require("../db.js");
const jwt = require("jsonwebtoken")
const JWT_USER_PWD = process.env.JWT_USER_PWD

userRouter.post("/signup", async function (req, res) {
  //TODO: add zod validation
  const { email, password, firstName, lastName } = req.body;
  // TODO: add bcrypt to store hashed passwords
  try {
    await userModel.create({
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
});

userRouter.post("/login", async function (req, res) {
  const { email, password } = req.body;
  // pwd should be hashed, implement bcrypt above and update logic 
  const user = await userModel.findOne({
    email: email,
    password: password
  });

  if(user){

    // TODO : implement cookies/session based auth
    const token = jwt.sign({
      id:user._id
    },JWT_USER_PWD)

    res.json({
      token : token
    })
  }else{
    res.status(403).json({
      message: "login failed -> incorrect creds"
    })
  }
});

userRouter.get("/purchases", function (req, res) {});

module.exports = {
  userRouter: userRouter,
};
