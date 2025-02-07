import { setAllAdminJobs, setAllJobs } from '@/redux/jobSlice'
import { Job_API_End_Point } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllJobs = async ()=>{
            try {
                const res = await axios.get(`${Job_API_End_Point}/admin/jobs`,{
                    withCredentials:true,
                    validateStatus: () => true  // ✅ Treats all status codes as successful
                });
                if(res.data.success){
                    dispatch(setAllAdminJobs(res.data.jobs));
                    toast.success(res.data.message);
                }
                else{
                    dispatch(setAllAdminJobs([]));
                    toast.error(res.data.message);
                }

            } catch (error) {
                console.log(error)
            }
        }
        fetchAllJobs();
    },[])
}

export default useGetAllAdminJobs
