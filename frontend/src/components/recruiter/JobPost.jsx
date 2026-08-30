import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'

const JobPost = () => {
  useGetAllCompanies()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirement: "",
    location: "",
    experience: 0,
    position: 0,
    salary: 0,
    jobType: '',
    company: ''
  })
  const { companies } = useSelector(store => store.company)

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((company) => company.companyName.toLowerCase() === value)
    setInput({ ...input, company: selectedCompany._id })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await axios.post(`${JOB_API_END_POINT}/postJob`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/recruiterJob")
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message)
    }
    finally {
      setLoading(false)
    }
  }

  const textFields = [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'text' },
    { name: 'location', label: 'Location', type: 'text' },
    { name: 'jobType', label: 'Job Type', type: 'text', placeholder: 'e.g. Full-time' },
    { name: 'position', label: 'Position', type: 'number' },
    { name: 'salary', label: 'Salary (LPA)', type: 'number' },
    { name: 'requirement', label: 'Requirement', type: 'text' },
    { name: 'experience', label: 'Experience (yrs)', type: 'number' },
  ]

  return (
    <div className="min-h-screen bg-gray-50/60">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <Button className="cursor-pointer mb-5" variant='outline' onClick={() => navigate('/recruiterJob')}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-8">
          <h1 className='font-bold text-xl text-gray-900 mb-1'>Post a new job</h1>
          <p className="text-sm text-gray-500 mb-6">Fill in the details below to publish this opening.</p>

          <form onSubmit={submitHandler}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {textFields.map(field => (
                <div key={field.name}>
                  <Label className="mb-1.5 block text-sm font-medium text-gray-700">{field.label}</Label>
                  <Input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={input[field.name]}
                    onChange={changeEventHandler}
                    required={field.required}
                  />
                </div>
              ))}
              <div className="sm:col-span-2">
                <Label className="mb-1.5 block text-sm font-medium text-gray-700">Company</Label>
                {
                  companies.length > 0 ? (
                    <Select onValueChange={selectChangeHandler}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a company" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {companies.map((company) => (
                            <SelectItem key={company._id} value={company?.companyName.toLowerCase()}>
                              {company.companyName}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm text-gray-400 border border-dashed border-gray-200 rounded-lg px-3 py-2.5">
                      Register a company first before posting a job.
                    </p>
                  )
                }
              </div>
            </div>
            <div className="mt-7">
              {
                loading
                  ? <Button disabled className="w-full bg-violet-600 hover:bg-violet-700">
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                  </Button>
                  : <Button className='w-full bg-violet-600 hover:bg-violet-700 cursor-pointer transition-colors' type="submit">
                    Post Job
                  </Button>
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default JobPost
