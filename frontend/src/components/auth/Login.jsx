import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, Mail, Lock } from 'lucide-react'

const Login = () => {

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: ""
  })

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const { loading } = useSelector(store => store.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        navigate("/")
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Login failed / Server not reachable")
    }
    finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center px-4 mt-5 ">
        <div className="w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/50 px-8 py-10">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className='text-2xl font-bold text-gray-900'>Welcome back</h1>
            <p className="text-gray-500 text-sm mt-1">Login to continue your job search</p>
          </div>

          <form onSubmit={submitHandler} className='w-full'>
            {/* Email */}
            <div className='mb-5'>
              <Label className="text-sm font-medium text-gray-700">Email</Label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className='pl-9'
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                />
              </div>
            </div>

            {/* Password */}
            <div className='mb-5'>
              <Label className="text-sm font-medium text-gray-700">Password</Label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Enter your password"
                  className='pl-9'
                  name="password"
                  value={input.password}
                  onChange={changeEventHandler}
                />
              </div>
            </div>

            {/* Role selection */}
            <div className="mb-6">
              <Label className="text-sm font-medium text-gray-700 mb-2 block">I am a</Label>
              <RadioGroup defaultValue="comfortable" className="flex gap-3">
                <label
                  htmlFor="r1"
                  className={`flex-1 flex items-center justify-center gap-2 border rounded-lg py-2.5 text-sm cursor-pointer transition-colors
                    ${input.role === 'student' ? 'border-purple-600 bg-purple-50 text-purple-700 font-medium' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                >
                  <input
                    id="r1"
                    className='cursor-pointer accent-purple-600'
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === 'student'}
                    onChange={changeEventHandler}
                  />
                  Student
                </label>
                <label
                  htmlFor="r2"
                  className={`flex-1 flex items-center justify-center gap-2 border rounded-lg py-2.5 text-sm cursor-pointer transition-colors
                    ${input.role === 'recruiter' ? 'border-purple-600 bg-purple-50 text-purple-700 font-medium' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                >
                  <input
                    id="r2"
                    className='cursor-pointer accent-purple-600'
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === 'recruiter'}
                    onChange={changeEventHandler}
                  />
                  Recruiter
                </label>
              </RadioGroup>
            </div>

            {/* Submit */}
            <div>
              {
                loading
                  ? <Button disabled className="w-full bg-violet-600 hover:bg-violet-700">
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                    </Button>
                  : <Button className='w-full bg-violet-600 hover:bg-violet-700 cursor-pointer transition-colors' type="submit">
                      Login
                    </Button>
              }
            </div>

            {/* Footer link */}
            <div className='mt-6 text-center text-sm text-gray-500'>
              Don't have an account?{' '}
              <Link to="/signup" className='text-purple-600 font-semibold hover:underline'>
                Signup
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login