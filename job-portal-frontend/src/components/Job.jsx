import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
    const navigate = useNavigate();
    const jobId = `${job._id}`;
    
    const daysAgoFunction = (mongodbTime)=>{
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDiff = currentTime-createdAt;
        return Math.floor(timeDiff/(1000*24*60*60));
    }
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
        <div className='flex items-center justify-between'>
            <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt)===0?"Today":`${daysAgoFunction(job?.createdAt)} days ago`}</p>
            <Button variant="outline" size="icon" className="rounded-full"><Bookmark></Bookmark></Button>
        </div>
        <div className='flex items-center gap-2 my-2'>
            <Button className="p-6" variant="outline" size="icon">
                <Avatar>
                    <AvatarImage src="https://tse2.mm.bing.net/th?id=OIP.NXILvymg8PHUgZW6_b7fegHaHa&pid=Api&P=0&h=180"></AvatarImage>
                </Avatar>
            </Button>
            <div>
                <h1 className='font-medium text-lg'>{job?.comapnay?.name}</h1>
                <p className='text-sm text-gray-500'>{job?.location}</p>
            </div>
        </div>
        <div>
            <h1 className='font-bold text-lg my-2 '>{job?.title}</h1>
            <p className='text-sm text-gray-600'>{job?.description}</p>
        </div>
        <div className='flex items-center gap-2 mt-4'>
            <Badge className="text-blue-700 font-bold" variant="ghost">{job?.position} Positions</Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">{job?.jobType}</Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">{job?.salary}LPA</Badge>
        </div>
        <div className='flex items-center gap-4 mt-4'>
            <Button onClick={()=> navigate(`/description/${jobId}`)} variant="outline">Details</Button>
            <Button className="bg-[#7209b7]">Save</Button>
        </div>
    </div>
  )
}

export default Job
