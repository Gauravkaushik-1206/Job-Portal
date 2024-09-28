import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import Navbar from '../shared/Navbar'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div>
        <Navbar></Navbar>
        <div className='flex items-center justify-center max-w-7xl mx-auto'>
            <form action="" className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                <h1 className='font-bold text-xl mb-5'>LogIn</h1>
                <div className='my-2'>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        placeholder="gaurav@gmail.com"
                    ></Input>
                </div>
                <div className='my-2'>
                    <Label>Password</Label>
                    <Input
                        type="password"
                        placeholder=""
                    ></Input>
                </div>
                    <Button type="submit" className="w-full my-4">LogIn</Button>
                <span>Don't have an acount?<Link to="/signup" className="text-blue-600">Signup</Link></span>
            </form>
          </div>
    </div>
  )
}

export default Login
