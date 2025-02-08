import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import { use } from 'react'
import { useDispatch } from 'react-redux'
import AdminJobTable from './AdminJobTable'
import { setSearchJobByText } from '@/redux/jobSlice'

const AdminJobs = () => {
    const navigate = useNavigate();
    const [input,setInput] = useState('');
    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(setSearchJobByText(input));
    },[input]);

  return (
    <div>
        <Navbar></Navbar>
        <div className='max-w-6xl mx-auto my-10'>
            <div className='flex items-center justify-between my-5'>
                <Input
                className='w-fit'
                placeholder="Filter by Name"
                onChange={(e)=>setInput(e.target.value)}
                ></Input>
                <Button onClick={()=> navigate("/admin/job/create")}>New Job</Button>
            </div>
            <AdminJobTable></AdminJobTable>
            
        </div>
    </div>
  )
}

export default AdminJobs
