import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Application_API_End_Point, Job_API_End_Point } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { toast } from 'sonner';

const JobDescription = () => {
    const param = useParams();
    const jobId = param.id;
    const dispatch = useDispatch();
    const {singleJob} = useSelector(store=>store.job);
    const {user} = useSelector(store=>store.auth);
    let isApplied = singleJob?.application?.some(application=>application.applicant === user?._id) || false;
    const [applied,setApplied] = useState(isApplied);
    // console.log(applied);
    const applyHandler = async ()=>{
        try {
            const res = await axios(`${Application_API_End_Point}/apply/${jobId}`,{withCredentials:true});
            console.log(res.data); 
            if(res.data.success){
                setApplied(true);
                const updateSingleJob = {...singleJob, application:[...singleJob.application,{applicant:user?._id}]};
                dispatch(setSingleJob(updateSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
        }
    }
    useEffect(()=>{
        const fetchsingleJobs = async ()=>{
            try {
                const res = await axios.get(`${Job_API_End_Point}/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setApplied(res.data.job.application.some(application=>application.applicant === user?._id))
                }

            } catch (error) {
                console.log(error)
            }
        }
        fetchsingleJobs();
    },[jobId, dispatch, user._id])

  return (
    <div className='max-w-7xl mx-auto my-10'>
        <div className='flex items-center justify-between'>
            <div>
                <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                <div className='flex items-center gap-2 mt-4'>
                    <Badge className="text-blue-700 font-bold" variant="ghost">{singleJob?.position} Positions</Badge>
                    <Badge className="text-[#F83002] font-bold" variant="ghost">{singleJob?.jobType}</Badge>
                    <Badge className="text-[#7209b7] font-bold" variant="ghost">{singleJob?.salary}LPA</Badge>
                </div>
            </div>
            <Button
            onClick={applied ? null : applyHandler}
            disabled={applied}
            className={`rounded-lg ${applied ? 'bg-gray-600 cursor-not-allowed':'bg-[#7209b7] hover:bg-[#611693]'}`}
            >{applied?'Applied':'Apply Now'}</Button>
        </div>
        <h1 className='border-b-2 border-b-gray-300 py-4 font-medium'>Job Description</h1>
        <div className='my-4 '>
            <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
            <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
            <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
            <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel} yrs</span></h1>
            <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} LPA</span></h1>
            <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.application?.length}</span></h1>
            <h1 className='font-bold my-1'>Post Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
        </div>
    </div>
  )
}

export default JobDescription
