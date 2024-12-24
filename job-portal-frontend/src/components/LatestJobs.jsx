import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
// const randomJob = [1,2,3,4,5,6,7,8];
const LatestJobs = () => {
  const {allJobs} = useSelector(store=>store.job); 
  return (
    <div className='mx-auto max-w-7xl my-20'>
        <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latst & Top</span>Job Openings</h1>
        <div className='grid grid-cols-3 gap-4 my-5'> 
            {
                allJobs.length<=0?<span>No Job available</span>: allJobs?.slice(0,6).map((job)=> <LatestJobCards key={job._id} job={job}></LatestJobCards>)
            }
        </div>
    </div>
  )
}

export default LatestJobs