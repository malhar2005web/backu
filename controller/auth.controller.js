import { User } from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { generateTokenAndSetCookie } from "../utils/generate.Token.js";

export async function signup(req,res) {
    try{
        const {email,password,username}=req.body;

        if(!email || !password || !username){
            return res.status(400).json({success:false,message:"All fields are required"})
        }
        const emailRegex=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({success:false,message:"Invalid email"})
        }
        if(password.length<6){
            return res.status(400).json({success:false,message:"Password length should be atleast 6 characters"})
        }
        const existingUserByEmail=await User.findOne({email:email});
        if(existingUserByEmail){
            return res.status(400).json({success:false,message:"User with this email already exists"})
        }

        const existingUserByUsername=await User.findOne({username:username});
        if(existingUserByUsername){
            return res.status(400).json({success:false,message:"User with this username already exists"})
        }
        const salt=await bcryptjs.genSalt(10);
        const hashedPassword=await bcryptjs.hash(password,salt);
        const PROFILE_PICS=["/PROBOY.jpg","/PROGRL.jpg"];
        const image=PROFILE_PICS[Math.floor(Math.random()*PROFILE_PICS.length)];
        const newUser=new User({
            email,
            password:hashedPassword,
            username,
            image
        });
        
            generateTokenAndSetCookie(newUser._id,res);
            await newUser.save();
            res.status(201).json({success:true,message:"User created successfully",user:{
                ...newUser._doc,
                password:""
            }});
    
        }
        
        
    
    catch(error){
        console.log("Error in signup",error.message);
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}
export async function logout(req,res) {
    try{
        res.clearCookie("jwt-moma");
        res.status(200).json({success:true,message:"Logged out successfully"})
  
    }catch(error){
        console.log("Error in logout",error.message);
        res.status(500).json({success:false,message:"Internal server error"})
    }
}

export async function login(req,res) {
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({success:false,message:"All fields are required"})
        }
        const user=await User.findOne({email:email});
        if(!user){
            return res.status(404).json({success:false,message:"Invalid credentials"})
        }
        const isPasswordCorrect=await bcryptjs.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({success:false,message:"Invalid credentials"})
        }
        generateTokenAndSetCookie(user._id,res);
        res.status(200).json({success:true,user:{
            ...user._doc,
            password:""
        }})
    }catch(error){
        console.log("Error in login",error.message);
        res.status(500).json({success:false,message:"Internal server error"})
    }
}
export async function authCheck(req, res) {
	try {
		console.log("req.user:", req.user);
		res.status(200).json({ success: true, user: req.user });
	} catch (error) {
		console.log("Error in authCheck controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}








