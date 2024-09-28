import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import Navbar from '../shared/Navbar'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div>
        <Navbar></Navbar>
        <div className='flex items-center justify-center max-w-7xl mx-auto'>
            <form action="" className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                <h1 className='font-bold text-xl mb-5'>SignUp</h1>
                <div className='my-2'>
                    <Label>Full Name</Label>
                    <Input
                        type="text"
                        placeholder="gaurav kaushik"
                    ></Input>
                </div>
                <div className='my-2'>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        placeholder="gaurav@gmail.com"
                    ></Input>
                </div>
                <div className='my-2'>
                    <Label>Phone Number</Label>
                    <Input
                        type="number"
                        placeholder=""
                    ></Input>
                </div>
                <div className='my-2'>
                    <Label>Password</Label>
                    <Input
                        type="password"
                        placeholder=""
                    ></Input>
                </div>
                <div className='flex items-center justify-between'>
                    <RadioGroup className='flex items-center gap-4 my-2'>
                        <div className="flex items-center space-x-2">
                            <Input
                                type="radio"
                                name="role"
                                value="student"
                                className="cursor-pointer"
                            ></Input>
                            <Label htmlFor="r1">Student</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Input
                                type="radio"
                                name="role"
                                value="student"
                                className="cursor-pointer"
                            ></Input>
                            <Label htmlFor="r2">Recruiter</Label>
                        </div>
                    </RadioGroup>
                </div>
                <div className='flex items-center gap-2'>  
                    <Label>Profile</Label>
                    <Input
                        accept="image/*"
                        type="file"
                        className="cursor-pointer"
                    ></Input>
                </div>
                <div>
                    <Button type="submit" className="w-full my-4">SignUp</Button>
                </div>
                <span>Already have an acount?<Link to="/login" className="text-blue-600">Login</Link></span>
            </form>
        </div>
    </div>
  )
}

export default Signup
