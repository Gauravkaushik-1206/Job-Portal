import React, { useEffect } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Job_API_End_Point } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';

const JobDescription = () => {
    let isApplied = false;
    const param = useParams();
    const jobId = param.id;
    const dispatch = useDispatch();
    const {singleJob} = useSelector(store=>store.job);
    const {user} = useSelector(store=>store.auth);
    useEffect(()=>{
        const fetchsingleJobs = async ()=>{
            try {
                const res = await axios.get(`${Job_API_End_Point}/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
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
            disabled={isApplied}
            className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed':'bg-[#7209b7] hover:bg-[#611693]'}`}
            >{isApplied?'Applied':'Apply Now'}</Button>
        </div>
        <h1 className='border-b-2 border-b-gray-300 py-4 font-medium'>Job Description</h1>
        <div className='my-4 '>
            <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
            <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
            <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
            <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel} yrs</span></h1>
            <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} LPA</span></h1>
            <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>4</span></h1>
            <h1 className='font-bold my-1'>Post Date: <span className='pl-4 font-normal text-gray-800'>04-10-2024</span></h1>
        </div>
    </div>
  )
}

export default JobDescription
