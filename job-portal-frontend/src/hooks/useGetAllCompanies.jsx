import { setComapnies } from '@/redux/companySlice'
import { Company_API_End_Point } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchSingleCompany = async () => {
            try {
                // console.log("start")
                const res = await axios.get(`${Company_API_End_Point}/`,{
                    withCredentials:true,
                    validateStatus: () => true  // ✅ Treats all status codes as successful
                });
                // console.log(res.data.companies);
                if(res.data.success){
                    dispatch(setComapnies(res.data.companies));
                }
                else{
                    dispatch(setComapnies([]));
                    toast.error(res.data.message);
                }
                // console.log("end");
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleCompany();
    },[])
}

export default useGetAllCompanies