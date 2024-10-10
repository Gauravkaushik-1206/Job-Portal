
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./components/auth/Login.jsx"
import Signup from "./components/auth/Signup.jsx"
import Home from "./components/Home.jsx"
import Jobs from "./components/Jobs.jsx"
import Browse from "./components/Browse.jsx"
import Profile from "./components/Profile.jsx"
import JobDescription from "./components/JobDescription.jsx"

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
])
function App() {

  return (
    <>
      <RouterProvider router={appRouter}></RouterProvider>
    </>
  )
}

export default App
