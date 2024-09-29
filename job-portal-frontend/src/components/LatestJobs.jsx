import React from 'react'
import LatestJobCards from './LatestJobCards';
const randomJob = [1,2,3,4,5,6,7,8];
const LatestJobs = () => {
  return (
    <div className='mx-auto max-w-7xl my-20'>
        <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latst & Top</span>Job Openings</h1>
        <div className='grid grid-cols-3 gap-4 my-5'> 
            {
                randomJob.slice(0,6).map((job,index)=> <LatestJobCards></LatestJobCards>)
            }
        </div>
    </div>
  )
}

export default LatestJobs