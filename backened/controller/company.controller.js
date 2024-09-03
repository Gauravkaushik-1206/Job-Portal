import { Company } from "../db/company.model.js"

export const registerCompany = async (req,res)=>{
    try {
        const {companyName} = req.body;
        if(!companyName){
            return res.status(400).json({
                message:"Company is required",
                success:false
            })
        }

        let company = await Company.findOne({name:companyName});
        if(company){
            return res.status(400).json({
                message:"Company is already registered",
                success:false
            })
        }
        company = await Company.create({
            name:companyName,
            userId:req.id
        })

        return res.status(202).json({
            message:"Company is registered successfully",
            company,
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}

export const getCompany = async (req,res)=>{
    try {
        const userId = req.id;
        const companies = await Company.find({userId});
        if(!companies){
            return res.status(400).json({
                message:"Companies not found",
                success:false
            })
        }

        return res.status(200).json({
            message:"Company that has been registered",
            companies,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getCompanyByName = async (req,res)=>{
    try {
        const companyName = req.params.name;
        const company = await Company.findOne({name:companyName});
        if(!company){
            return res.status(400).json({
                message:"Company not found",
                success:false
            })
        }

        return res.status(200).json({
            company,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateCompany = async (req,res)=>{
    try {
        const {name,description,website,location} = req.body;
        const file=req.file;
        const updateData = {name,description,website,location}
        const company = await Company.findByIdAndUpdate(req.params.id,updateData,{new:true});

        if(!company){
            return res.status(404).json({
                message:"Companies not found",
                success:false
            })
        }

        return res.status(200).json({
            company,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}