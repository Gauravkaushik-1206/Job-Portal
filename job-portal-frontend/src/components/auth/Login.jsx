import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { User_API_End_Point } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input,setInput]=useState({
        email:"",
        password:"",

    })
    const {loading} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const changeEventHandler = (e)=>{
        setInput({...input, [e.target.name]:e.target.value})
    }

    const submitHandler = async (e)=>{
        e.preventDefault();

        try {
            dispatch(setLoading(true));
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${User_API_End_Point}/login`,input,{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            });
            if(res.data.sucess){
                dispatch(setUser(res.data.user));
                navigate("/")
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
        } finally{
            dispatch(setLoading(false));
        }
    }
  return (
    <div>
        <Navbar></Navbar>
        <div className='flex items-center justify-center max-w-7xl mx-auto'>
            <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                <h1 className='font-bold text-xl mb-5'>LogIn</h1>
                <div className='my-2'>
                    <Label>Email</Label>
                    <Input
                       type="email"
                       name="email"
                       value={input.email}
                       onChange={changeEventHandler}
                       placeholder="gaurav@gmail.com"
                    ></Input>
                </div>
                <div className='my-2'>
                    <Label>Password</Label>
                    <Input
                         type="text"
                         name="password"
                         value={input.password}
                         onChange={changeEventHandler}
                         placeholder=""
                    ></Input>
                </div>
                {
                    loading ? <Button className="w-full my-4"><Loader2 className='mr-2 w-2 h-2 animate-spin'>Please wait</Loader2></Button> :
                    <Button type="submit" className="w-full my-4">LogIn</Button>
                }
                <span>Don't have an acount?<Link to="/signup" className="text-blue-600">Signup</Link></span>
            </form>
          </div>
    </div>
  )
}

export default Login
