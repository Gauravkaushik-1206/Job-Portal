import React from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarsousel from './CategoryCarsousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJob from '@/hooks/useGetAllJob'

const Home = () => {
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
