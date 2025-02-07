import { Job } from "../db/job.model.js";

export const postJob = async (req,res)=>{
    try{
        const {title,description,requirements,salary,location,jobType,experience,position,companyId}=req.body;
        const userId = req.id;
        if(!title||!description||!requirements||!salary||!location||!jobType||!experience||!position||!companyId){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            })
        }

        const job = await Job.create({
            title,
            description,
            requirements:requirements.split(','),
            salary:Number(salary),
            location,
            jobType,
            experienceLevel:Number(experience),
            position,
            company:companyId,
            created_by:userId
        })

        res.status(200).json({
            message:"New job created successfully",
            job,
            success:true
        })
    }
    catch(error){
        console.log(error);
    }
}

export const getAllJobs = async (req,res)=>{
    try {
        const keyword = req.query.keyword || "";
        const query={
            $or:[
                {title:{$regex:keyword ,$options:"i"}},
                {description:{$regex:keyword ,$options:"i"}},
            ]
        }

        const jobs = await Job.find(query).populate({
            path:"company"//give the name which you want to populate
        }).sort({createdAt:-1});
        if(!jobs){
            res.status(400).json({
                message:"Not found",
                success:false
            })
        }

        res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getJobById = async (req,res)=>{
    try {
        const id = req.params.id;
        const job = await Job.findById(id).populate({
            path:"application"
        });
        if(!job){
            res.status(400).json({
                message:"Not found",
                success:false
            })
        }

        res.status(200).json({
            job,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }

}

export const getAdminJobs = async (req,res)=>{
    try{
        const adminId = req.id;
        const jobs = await Job.find({created_by:adminId}).populate({
            path:"company",
            createdAt:-1,
        });
        if(!jobs){
            res.status(400).json({
                message:"Not found",
                success:false
            })
        }

        res.status(200).json({
            jobs,
            success:true
        })
    }
    catch(error){
        console.log(error);  
    }
}