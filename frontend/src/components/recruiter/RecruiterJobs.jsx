import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import RecruiterJobTable from './RecruiterJobTable'
import useGetAdminJobs from '@/hooks/useGetAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'
import { Search, Plus } from 'lucide-react'

const RecruiterJobs = () => {
  useGetAdminJobs()
  const navigate = useNavigate()
  const [input, setInput] = useState("")
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setSearchJobByText(input))
  }, [input])

  return (
    <div className="min-h-screen bg-gray-50/60">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Your Jobs</h1>
          <p className="text-sm text-gray-500 mt-1">Manage postings and review applicants</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              className="pl-9"
              placeholder="Filter by title or company"
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <Button className="cursor-pointer bg-violet-600 hover:bg-violet-700 shrink-0" onClick={() => navigate('/job/create')}>
            <Plus className="h-4 w-4 mr-1" /> New Job
          </Button>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-2 sm:p-4 overflow-x-auto">
          <RecruiterJobTable />
        </div>
      </div>
    </div>
  )
}

export default RecruiterJobs
