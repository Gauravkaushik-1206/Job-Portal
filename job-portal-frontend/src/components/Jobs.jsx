import React from 'react'
import Navbar from './shared/Navbar'
import FilterCad from './FilterCad'
import Job from './Job'

const jobArray = [1,2,3,4,5,6,7,8];

const Jobs = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className='max-w-7xl mx-auto mt-5 '>
        <div className='flex gap-5'>
            <div className='w-20%'>
                <FilterCad></FilterCad>
            </div>
            {
                jobArray.length<=0 ? <span>Job Not Found</span>:
                <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                    <div className='grid grid-cols-3 gap-4'>
                        {jobArray.map((item,index) => (
                            <div>
                                <Job></Job>
                            </div>
                        ))}
                    </div>
                </div>
                
            }
        </div>
      </div>
    </div>
  )
}

export default Jobs
