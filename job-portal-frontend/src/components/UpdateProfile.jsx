import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setUser } from '@/redux/authSlice'
import { User_API_End_Point } from '@/utils/constant'
import { toast } from 'sonner'

const UpdateProfile = ({open, setOpen}) => {
    const [loading,setLoading] = useState(false);
    const {user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();

    const [input,setInput] = useState({
        fullname:user?.fullname||"",
        email:user?.email||"",
        phoneNumber:user?.phoneNumber||"",
        bio:user?.profile?.bio||"",
        skills:user?.profile?.skills.map(skill => skill)||"",
        file:user?.profile?.resume||"",
    })

    const changeEventHandler = (e)=>{
        setInput({...input,[e.target.name]:e.target.value})
    }

    const fileChangeHandler = (e)=>{
        const file = e.target.files?.[0];

        setInput({...input,file});

    }

    const submitHandler = async (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname",input.fullname);
        formData.append("email",input.email);
        formData.append("phoneNumber",input.phoneNumber);
        formData.append("bio",input.bio);
        formData.append("skills",input.skills);
        if(input.file){
            formData.append("file",input.file);
        }
        console.log(formData.get("fullname"));
        try {
            setLoading(true);
            const res = await axios.post(`${User_API_End_Point}/updateprofile`,formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                },
                withCredentials:true
            });
            if(res.data.sucess){
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
        setOpen(false);
        console.log(input);
    }

    
  return (
    <div>
      <Dialog open={open}>
        <DialogContent className='sm:max-w-[425px]' onInteractOutside={()=> setOpen(false)}>
            <DialogHeader>
                <DialogTitle>Update Profile</DialogTitle>
            </DialogHeader>
            <form onSubmit={submitHandler}>
                <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='fullname' className='text-right'>Name</Label>
                        <Input
                            id='fullname'
                            name='fullname'
                            type='text'
                            value={input.fullname}
                            onChange={changeEventHandler}
                            className='col-span-3'
                        ></Input>
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='email' className='text-right'>Email</Label>
                        <Input
                            id='email'
                            name='email'
                            type='email'
                            value={input.email}
                            onChange={changeEventHandler}
                            className='col-span-3'
                        ></Input>
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='phoneNumber' className='text-right'>Phone Number</Label>
                        <Input
                            id='phoneNumber'
                            name='phoneNumber'
                            type='text'
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                            className='col-span-3'
                        ></Input>
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='bio' className='text-right'>Bio</Label>
                        <Input
                            id='bio'
                            name='bio'
                            type='text'
                            value={input.bio}
                            onChange={changeEventHandler}
                            className='col-span-3'
                        ></Input>
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='skills' className='text-right'>Skills</Label>
                        <Input
                            id='skills'
                            name='skills'
                            type='text'
                            value={input.skills}
                            onChange={changeEventHandler} 
                            className='col-span-3'
                        ></Input>
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='resume' className='text-right'>Resume</Label>
                        <Input
                            id='resume'
                            name='resume'
                            type='file'
                            accept='application/pdf'
                            onChange={fileChangeHandler} 
                            className='col-span-3'
                        ></Input>
                    </div>
                </div>
                <div>
                    {
                        loading ? <Button className="w-full my-4"><Loader2 className='mr-2 w-2 h-2 animate-spin'></Loader2>Please wait</Button> :
                        <Button type="submit" className="w-full my-4">Update</Button>
                    }
                </div>
            </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UpdateProfile
