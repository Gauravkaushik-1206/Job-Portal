import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Company_API_End_Point } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const [companyName,setCompany]=useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const registerCompany = async ()=>{
        try {
            const res = await axios.post(`${Company_API_End_Point}/register`,{companyName},{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            })
            if(res?.data?.success){
                dispatch(setSingleCompany(res?.data?.company));
                toast.success(res?.data?.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`)
            }
            else{
                toast.error(res?.data?.message);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
        }
    }
  return (
    <div>
        <Navbar></Navbar>
        <div className='max-w-4xl mx-auto'>
            <div className='my-10'>
                <h1 className='font-bold text-2xl'>Your Company Name</h1>
                <p className='text-gray-500'>What would you like to give your company name? You can change it later</p>
            </div>
            <Label>Company Name</Label>
            <Input
            type="text"
            className='my-2'
            placeholder='jobHunt, Microsoft, etc.'
            onChange={(e)=>setCompany(e.target.value)}
            ></Input>
            <div className='flex items-center gap-2 my-10'>
                <Button variant="outline" onClick={()=> navigate("/admin/companies")}>Cancel</Button>
                <Button onClick={registerCompany}>Continue</Button>
            </div>
        </div>
    </div>
  )
}

export default CompanyCreate
