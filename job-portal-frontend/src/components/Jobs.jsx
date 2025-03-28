import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCad from './FilterCad'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux';
import { use } from 'react';
import useGetAllJob from '@/hooks/useGetAllJob';
import { setSearchedQuery } from '@/redux/jobSlice';
import { motion } from 'framer-motion';

const jobArray = [1,2,3,4,5,6,7,8];

const Jobs = () => {
    useGetAllJob();
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const dispatch = useDispatch();

    // useEffect(()=>{
    //   return ()=>{
    //     dispatch(setSearchedQuery(""));
    //   }
    // })

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar></Navbar>
      <div className='max-w-7xl mx-auto mt-5 '>
        <div className='flex gap-5'>
            <div className='w-20%'>
                <FilterCad></FilterCad>
            </div>
            {
                filterJobs.length<=0 ? <span>Job Not Found</span>:
                <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                    <div className='grid grid-cols-3 gap-4'>
                        {allJobs.map((job) => (
                            <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.3 }}
                            key={job?._id}>
                            <Job job={job} />
                        </motion.div>
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
