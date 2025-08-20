const jwt = require('jsonwebtoken');
const User = require("../models/usersSchema");

const userAuth = async(req,res,next) => {
    try{
        const { token } = req.cookies;
        if(!token){
            return res.status(401).send("Please login!");
        }
        
        const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);
        const { userId} = decodedObj;
        const user = await User.findById(userId).select("-password");;
        if(!user){
            throw new Error("User not found");
        }
        req.user = user;
        next();
    } catch(err){
        res.status(400).send("Error: "+ err.message);
    }
};

module.exports = userAuth