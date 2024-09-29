import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'

const Job = () => {
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
        <div className='flex items-center justify-between'>
            <p className='text-sm text-gray-500'>2 days ago</p>
            <Button variant="outline" size="icon" className="rounded-full"><Bookmark></Bookmark></Button>
        </div>
        <div className='flex items-center gap-2 my-2'>
            <Button className="p-6" variant="outline" size="icon">
                <Avatar>
                    <AvatarImage src="https://tse2.mm.bing.net/th?id=OIP.NXILvymg8PHUgZW6_b7fegHaHa&pid=Api&P=0&h=180"></AvatarImage>
                </Avatar>
            </Button>
            <div>
                <h1 className='font-medium text-lg'>Company Name</h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>
        </div>
        <div>
            <h1 className='font-bold text-lg my-2 '>Title</h1>
            <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, cum. Natus corporis ex praesentium necessitatibus asperiores placeat recusandae reiciendis quas.</p>
        </div>
        <div className='flex items-center gap-2 mt-4'>
            <Badge className="text-blue-700 font-bold" variant="ghost">12 Positions</Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">Part Time</Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">24LPA</Badge>
        </div>
        <div className='flex items-center gap-4 mt-4'>
            <Button variant="outline">Details</Button>
            <Button className="bg-[#7209b7]">Save</Button>
        </div>
    </div>
  )
}

export default Job
