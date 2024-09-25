import { Application } from "../db/application.model.js";
import { Job } from "../db/job.model.js";

export const applyJob = async (req,res)=>{
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if(!jobId){
            return res.status(400).json({
                message:"Id is requrired",
                success:false
            })
        }

        const exists = await Application.findOne({job:jobId,applicant:userId});
        if(exists){
            return res.status(400).json({
                message:"Already applied",
                success:false
            })
        }

        let job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false
            })
        }
        
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId
        })
        
        job.application.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message:"Successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getAppliedJobs = async (req,res)=>{
    try {
        const userId = req.id;

        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:"job",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"company",
            }
        })

        if(!application){
            return res.status(404).json({
                message:"No application",
                success:false
            })
        }

        return res.status(200).json({
            application,
            success:true
        })

    } catch (error) {
        console.log(error);
        
    }
}

export const getApplicants = async (req,res)=>{
    try {
        const jobId = req.params.id;
        const job = await Job.find(jobId).populate({
            path:"application",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"applicant",
            }
        })

        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false
            })
        }

        return res.status(200).json({
            job,
            success:true
        })
        
    } catch (error) {
        console.log(error);
        
    }
}

export const updateStatus = async (req,res)=>{
    try {
        const status = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:"status not found",
                success:false
            })
        }

        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message:"Application not found",
                success:false
            })
        }

        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"Status updated successfully",
            success:true
        })
        
    } catch (error) {
        console.log(error);
    }
}