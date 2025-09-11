const express = require('express');
const router = express.Router();
const zod = require('zod');
const User = require("../models/usersSchema");
const auth = require("../middleWare/auth");
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const argon2 = require("argon2");

const signupSchema = zod.object({
    username: zod.string().email().refine(email => email.endsWith("@chitkarauniversity.edu.in"), {
        message: "Email must be a Chitkara University email"
    }), 
    firstName: zod.string(),
    lastName: zod.string().optional(),
    password: zod.string(),
    photoUrl: zod.string().url().optional(),
    role: zod.string(),
    description: zod.string()
})

router.get("/user/details", async (req, res) => {
  const user = await User.find();
  res.json(user);
});

router.post("/user/logout", async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Logout Failed!" });
  }
});


router.post("/user/signup", async(req,res)=>{
    try{
    const { success } = signupSchema.safeParse(req.body);
    if(!success){
        return res.status(400).json({
            message: "Incorrect Inputs"
        })
    }
    const existingUser = await User.findOne({
        username: req.body.username
    })
    if(existingUser){
        return res.status(411).json({
            message: "User already exist"
        })
    }

    const hashedPassword = await argon2.hash(req.body.password);

const user= await User.create({
    username: req.body.username,
    password: hashedPassword,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    photoUrl: req.body.photoUrl || undefined,
    role: req.body.role,
    description: req.body.description,
});

res.status(201).json({message: "Signup Successful", user })

} catch(err){
        console.log("error", err.message);
    }
});

const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/user/signin",async(req,res)=>{
    try{
        const { success } = signinSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
    });

    if(!user){
        return res.status(411).json({
            message: "User not found"
        });
    }

    const passwordMatch = await argon2.verify(user.password, req.body.password);
    if(!passwordMatch){
        return res.status(401).json({
            message: "Invalid Credentials"
        });
    }

    
        const token = jwt.sign({
            userId: user._id,
            role: user.role,
        },JWT_SECRET, { expiresIn: "1h" });

   res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", 
  sameSite: "none",
});
  res.status(200).json({ message: "Signin Successfully", user: {
    username: user.username,
    firstName: user.firstName,
    role: user.role
}});

    } catch(err){
        console.log("error",err);
        res.status(400).json({message: "Error in Sigin"});
    }
    });


module.exports = router;