
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./components/pages/Home"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import Jobs from "./components/pages/Jobs"
import Browse from "./components/pages/Browse"
import Profile from "./components/pages/Profile"
import JobDescription from "./components/pages/JobDescription"
import Companies from "./components/recruiter/Companies"
import CreateCompany from "./components/recruiter/CreateCompany"
import CompanySetup from "./components/recruiter/CompanySetup"
import RecruiterJobs from "./components/recruiter/RecruiterJobs"
import JobPost from "./components/recruiter/JobPost"
import Applicant from "./components/recruiter/Applicant"
import ProtectedRoute from "./components/recruiter/ProtectedRoute"

const appRouter= createBrowserRouter([
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:'/jobDescription/:jobId',
    element:<JobDescription/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },{
    path:"/profile",
    element:<Profile/>
  },
  // recruiter ka route
  {
    path :'/companies',
    element :<ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path :"/company/create",
    element :<ProtectedRoute><CreateCompany/></ProtectedRoute>
  },
  {
    path :"/company/:id",
    element :<ProtectedRoute><CompanySetup/></ProtectedRoute>
  },
  {
    path :"/recruiterJob",
    element:<ProtectedRoute><RecruiterJobs/></ProtectedRoute>
  },
  {
    path :"/job/create",
    element:<ProtectedRoute><JobPost/></ProtectedRoute>
  },
  {
    path:"/job/:id/applicant",
    element :<ProtectedRoute><Applicant/></ProtectedRoute>
  }
])
function App() {
  return (
    <div>
      <RouterProvider router ={appRouter}/>
    </div>
  )
}

export default App