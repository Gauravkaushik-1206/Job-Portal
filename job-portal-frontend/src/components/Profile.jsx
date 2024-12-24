import React, { useState } from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import Navbar from './shared/Navbar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfile from './UpdateProfile'
import { useSelector } from 'react-redux'


const isResume = true;

const Profile = () => {
    const [open,setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);
  return (
    <div>
        <Navbar></Navbar>
        <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
            <div className='flex justify-between'>
                <div className='flex items-center gap-4'>
                    <Avatar className="h-24 w-24">
                        <AvatarImage src="https://tse2.mm.bing.net/th?id=OIP.NXILvymg8PHUgZW6_b7fegHaHa&pid=Api&P=0&h=180"></AvatarImage>
                    </Avatar>
                    <div>
                        <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                        <p className='text-md text-gray-600'>{user?.profile?.bio}</p>
                    </div>
                </div>
                <Button onClick={()=> setOpen(true)} className="text-right" variant="outline"><Pen></Pen></Button>
            </div>
            <div className='my-5'>
                <div className='flex items-center gap-3 my-2'>
                    <Mail></Mail>
                    <span>{user?.email}</span>
                </div>
                <div className='flex items-center gap-3 my-2'>
                    <Contact></Contact>
                    <span>{user?.phoneNumber}</span>
                </div>
            </div>
            <div>
                <h1>Skills</h1>
                <div className='flex items-center gap-1 mt-2'>
                    {
                        user?.profile?.skills.length!=0?
                        user?.profile?.skills[0].map((item,index)=>{
                            return (
                                <Badge key={index}>{item}</Badge>
                            )
                        }):<span>NA</span>
                    }
                </div>
            </div>
            <div className='grid max-w-sm w-full items-center gap-1.5'>
                <Label className='font-bold text-lg '>Resume</Label>
                {
                    isResume?<a target='blank' href={user?.profile?.resume} className='text-blue-500 hover:underline w-full cursor-pointer'>{user?.profile?.resumeOriginalName}</a>:<span>NA</span>
                }
            </div>
        </div>
        <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
            <h1 className='font-bold text-xl my-5'>Applied Job</h1>
            <AppliedJobTable></AppliedJobTable>

        </div>
        <UpdateProfile open={open} setOpen={setOpen}></UpdateProfile>
    </div>
  )
}

export default Profile
