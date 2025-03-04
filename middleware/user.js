const jwt = require("jsonwebtoken")

function userMiddleware(req,res,next){
    const token = req.header.token
    const decoded = jwt.verify(token,process.env.JWT_USER_PWD)

    if(decoded){
        req.userId = decoded.userId
        next()
    }else{
        res.status(403).json({
            message : "you are not signed in"
        })
    }

}

module.exports = {
    userMiddleware
}