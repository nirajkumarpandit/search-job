import React, { useState, useEffect } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
  const params = useParams()
  useGetCompanyById(params.id)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    companyName: "",
    description: "",
    location: "",
    website: '',
    file: null
  })
  const { singleCompany } = useSelector(store => store.company)
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const changeFileHandler = (e) => {
    const file = e.target.files?.[0]
    setInput({ ...input, file })
  }
  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("companyName", input.companyName)
    formData.append("description", input.description)
    formData.append("website", input.website)
    formData.append("location", input.location)
    if (input.file) {
      formData.append("file", input.file)
    }
    try {
      setLoading(true)
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: {
          "Content-Type": 'multipart/form-data'
        },
        withCredentials: true
      })
      if (res?.data?.success) {
        dispatch(setSingleCompany(res?.data?.company))
        toast.success(res?.data?.message)
        navigate("/companies")
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    setInput({
      companyName: singleCompany?.companyName || "",
      description: singleCompany?.description || "",
      location: singleCompany?.location || "",
      website: singleCompany?.website || '',
      file: singleCompany?.file || null
    })
  }, [singleCompany])

  const fields = [
    { name: 'companyName', label: 'Company name', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'text' },
    { name: 'location', label: 'Location', type: 'text' },
    { name: 'website', label: 'Website', type: 'text' },
  ]

  return (
    <div className="min-h-screen bg-gray-50/60">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <Button className="cursor-pointer mb-5" variant='outline' onClick={() => navigate('/companies')}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-8">
          <h1 className='font-bold text-xl text-gray-900 mb-1'>Company setup</h1>
          <p className="text-sm text-gray-500 mb-6">Update your company profile so candidates know who they're applying to.</p>

          <form onSubmit={submitHandler}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {fields.map(field => (
                <div key={field.name}>
                  <Label className="mb-1.5 block text-sm font-medium text-gray-700">{field.label}</Label>
                  <Input
                    type={field.type}
                    name={field.name}
                    value={input[field.name]}
                    onChange={changeEventHandler}
                    required={field.required}
                  />
                </div>
              ))}
              <div className="sm:col-span-2">
                <Label className="mb-1.5 block text-sm font-medium text-gray-700">Logo</Label>
                <Input
                  type="file"
                  accept='image/*'
                  onChange={changeFileHandler}
                  className="cursor-pointer"
                />
              </div>
            </div>
            <div className="mt-7">
              {
                loading
                  ? <Button disabled className="w-full bg-violet-600 hover:bg-violet-700">
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                  </Button>
                  : <Button className='w-full bg-violet-600 hover:bg-violet-700 cursor-pointer transition-colors' type="submit">
                    Update
                  </Button>
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CompanySetup
