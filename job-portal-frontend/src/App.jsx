
import { createBrowserRouter } from "react-router-dom"
import Navbar from "./components/shared/navbar.jsx"

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
    path:'/',
    element:<Home></Home>
  },
  {
    path:'/',
    element:<Home></Home>
  },
])
function App() {

  return (
    <>
      <Navbar></Navbar>
    </>
  )
}

export default App
