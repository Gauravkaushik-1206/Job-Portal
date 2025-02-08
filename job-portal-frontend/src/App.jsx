
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./components/auth/Login.jsx"
import Signup from "./components/auth/Signup.jsx"
import Home from "./components/Home.jsx"
import Jobs from "./components/Jobs.jsx"
import Browse from "./components/Browse.jsx"
import Profile from "./components/Profile.jsx"
import JobDescription from "./components/JobDescription.jsx"
import Companies from "./components/admin/Companies.jsx"
import CompanyCreate from "./components/admin/CompanyCreate.jsx"
import CompanySetup from "./components/admin/CompanySetup.jsx"
import AdminJobs from "./components/admin/AdminJobs.jsx"
import PostJob from "./components/admin/PostJob.jsx"

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home></Home>
  },
  {
    path:'/login',
    element:<Login></Login>
  },
  {
    path:'/signup',
    element:<Signup></Signup>
  },
  {
    path:'/jobs',
    element:<Jobs></Jobs>
  },
  {
    path:'/description/:id',
    element:<JobDescription></JobDescription>
  },
  {
    path:'/browse',
    element:<Browse></Browse> 
  },
  {
    path:'/profile',
    element:<Profile></Profile> 
  },
  //admin
  {
    path:'/admin/companies',
    element:<Companies></Companies>
  },
  {
    path:'/admin/companies/create',
    element:<CompanyCreate></CompanyCreate>
  },
  {
    path:'/admin/companies/:id',
    element:<CompanySetup></CompanySetup>
  },
  {
    path:'/admin/jobs',
    element:<AdminJobs></AdminJobs>
  },
  {
    path:'/admin/job/create',
    element:<PostJob></PostJob>
  },
])
function App() {

  return (
    <>
      <RouterProvider router={appRouter}></RouterProvider>
    </>
  )
}

export default App
