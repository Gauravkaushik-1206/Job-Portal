import { User } from "../db/user.model.js";
import zod from "zod";
import { userSchema, loginSchema } from "../type.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

export const register  = async (req,res)=>{
    try {
        const {fullname,email,phoneNumber,password,role} = req.body;
        const result = userSchema.safeParse(req.body);
        if(!result.sucess || !fullname){
            return res.status(400).json({
                messsage:"Invalid Input",
                sucess:false,
                error:result
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"User already exist with this email Id",
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
        if(!result.sucess){
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
            emailId:user.email
        }

        const token = jwt.sign(tokendata, process.env.JWTPASSWORD, {
            expiresIn: '1d'
        });

        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpsOnly:true,sameSite:'strict'}).json({
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
        const file = req.file;
        if(!fullname || !email || !phoneNumber || !bio || !skills){
            return res.status(400).json({
                message:"Something is Missing",
                sucess:false
            });
        }

        //cloudinary idhar aayega


        const skillsArray = skills.split(",");
        const userId = req.id;//middleware authenatication
        let user = User.findById(userId);
        if(!user){
            return res.status(400).json({
                message:"User not found",
                sucess:false
            })
        } 
        //update
        user.fullname=fullname
        user.email=email
        user.phoneNumber=phoneNumber
        user.profile.bio=bio
        user.profile.skills=skillsArray

        // resume file later

        user.save();

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