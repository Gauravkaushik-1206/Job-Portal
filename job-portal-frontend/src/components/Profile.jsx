import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import Navbar from './shared/Navbar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'

const skills = ["HTML","javascript","ReactJs","NodeJs"];

const Profile = () => {
    const isResume = true;
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
                        <h1 className='font-medium text-xl'>Full Name</h1>
                        <p className='text-md text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum, harum.</p>
                    </div>
                </div>
                <Button className="text-right" variant="outline"><Pen></Pen></Button>
            </div>
            <div className='my-5'>
                <div className='flex items-center gap-3 my-2'>
                    <Mail></Mail>
                    <span>kaushikgaurav1206@gmail.com</span>
                </div>
                <div className='flex items-center gap-3 my-2'>
                    <Contact></Contact>
                    <span>9896384194</span>
                </div>
            </div>
            <div>
                <h1>Skills</h1>
                <div className='flex items-center gap-1 mt-2'>
                    {
                        skills.length!=0?
                        skills.map((item,index)=>{
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
                    isResume?<a target='blank' href="https://youtube.com" className='text-blue-500 hover:underline w-full cursor-pointer'>Resume Link</a>:<span>NA</span>
                }
            </div>
        </div>
        <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
            <h1 className='font-bold text-xl my-5'>Applied Job</h1>
            <AppliedJobTable></AppliedJobTable>

        </div>
    </div>
  )
}

export default Profile
