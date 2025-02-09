import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'

const AdminJobTable = () => {
    useGetAllAdminJobs();
    const {allAdminJobs, searchJobByText} = useSelector(store=>store.job);
    const [filterAdminJobs, setFilterAdminJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        const filteredAdminJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job)=>{
            if(!searchJobByText){
                return true;
            }
            return job.title.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        })
        setFilterAdminJobs(filteredAdminJobs);
    },[allAdminJobs, searchJobByText]);

  return (
    <div>
       <Table>
            <TableCaption>A List of your recent Jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Comapny Name</TableHead>
                    <TableHead>Job Role</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            {
                        filterAdminJobs?.map((job) => (
                            <tr>
                                <TableCell>{job?.company?.name}</TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={()=> navigate(`/admin/job/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                            <div onClick={()=> navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                <Eye className='w-4'/>
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>

                        ))
                    }
            </TableBody>
       </Table>
    </div>
  )
}

export default AdminJobTable
