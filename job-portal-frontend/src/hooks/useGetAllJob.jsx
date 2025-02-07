import { setAllJobs } from '@/redux/jobSlice'
import { Job_API_End_Point } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllJob = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllJobs = async ()=>{
            try {
                const res = await axios.get(`${Job_API_End_Point}/jobs`,{
                    withCredentials:true,
                    validateStatus: () => true  // ✅ Treats all status codes as successful
                });
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs));
                }
                else{
                    dispatch(setAllJobs([]));
                }

            } catch (error) {
                console.log(error)
            }
        }
        fetchAllJobs();
    },[])
}

export default useGetAllJob
