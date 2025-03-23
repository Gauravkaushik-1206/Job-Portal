import { User } from "../db/user.model.js";
import zod from "zod";
import { userSchema, loginSchema } from "../type.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register  = async (req,res)=>{
    try {
        console.log(req.body);
        const {fullname,email,phoneNumber,password,role} = req.body;
        console.log(fullname,email,phoneNumber,password,role);
        const result = userSchema.safeParse(req.body);
        if(!result.success || !fullname){
            return res.status(400).json({
                message:"Invalid Input",
                sucess:false,
                error:result
            })
        }

        const file = req.file;
        // console.log(file);
        const fileUri = getDataUri(file);
        // console.log(fileUri);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"User already exist with this email Id",
                user,
                sucess:false,
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password:hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }
        })

        return res.status(201).json({
            message:"Account created sucessfully.",
            sucess:true
        })

    } catch (error) {
        console.log(error);
        
    }
}

export const login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const result = loginSchema.safeParse(req.body);
        if(!result.success){
            return res.status(400).json({
                message:"Invalid Input",
                sucess:false
            })
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"Incorrect email and password.",
                sucess:false,
            })
        } 

        const isPassword = await bcrypt.compare(password,user.password);
        if(!isPassword){
            return res.status(400).json({
                message:"Incorrect email and password.",
                sucess:false,
            })
        }

        const tokendata = {
            userId:user._id
        }

        const token = jwt.sign(tokendata, process.env.JWTPASSWORD, {
            expiresIn: '1d'
        });

        // console.log('Token: ',token);
        res.cookie('token',token,{
            httpOnly:true,
            secure : false,
            signed:true,
            sameSite:'None',
            // maxAge:1000,// sets the expiration time in milliseconds, for now we are setting it much less
            expires: new Date(Date.now()+8640000),
        })
        // res.cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'None',secure:true});
        // console.log(res.cookie.token);
        
        return res.status(200).json({
            message:`Welcome back ${user.fullname}`,
            user,
            sucess:true
        })

    }catch(error){
        console.log(error);     
    }
}

export const logOut = async (req,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Log Out sucessfully",
            sucess:true
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const updateProfile = async (req,res)=>{
    try{
        const {fullname,email,phoneNumber,bio,skills}=req.body;
        console.log(fullname,email,phoneNumber,bio,skills);

        //cloudinary idhar aayega
        const file = req.file;
        const fileuri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileuri.content);


        const userId = req.id;//middleware authenatication
        let user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message:"User not found",
                sucess:false
            })
        } 
        //update
        if(fullname) user.fullname=fullname
        if(email) user.email=email
        if(phoneNumber) user.phoneNumber=phoneNumber
        if(bio) user.profile.bio=bio
        if(skills) user.profile.skills=skills.split(",");

        // resume file later
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = file.originalname;
        }

        await user.save();

        return res.status(200).json({
            message:"Sucessfully updated",
            user,
            sucess:true,
        })
    }
    catch(error){
        console.log(error);
    }
}

export const validToken = async (req,res)=>{
    return res.json({
        message:"Valid Token",
        sucess:true
    })
}