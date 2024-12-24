import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarsousel from './CategoryCarsousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJob from '@/hooks/useGetAllJob'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const {user} = useSelector(store=>store.auth);
  const navigate = useNavigate();
  useEffect(()=>{
    if(user?.role==='recruiter'){
      navigate("/admin/companies");
    }
  })
  useGetAllJob();
  return (
    <div>
      <Navbar></Navbar>
      <HeroSection ></HeroSection>
      <CategoryCarsousel></CategoryCarsousel>
      <LatestJobs></LatestJobs>
      <Footer></Footer>
    </div>
  )
}

export default Home
