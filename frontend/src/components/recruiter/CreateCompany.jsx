import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { Building2 } from 'lucide-react'

const CreateCompany = () => {
    const navigate = useNavigate()
    const [companyName, setCompanyName] = useState('')
    const dispatch = useDispatch()

    const registerCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                withCredentials: true
            })
            if (res?.data?.success) {
                dispatch(setSingleCompany(res?.data?.company))
                toast.success(res?.data?.message)
                const companyId = res?.data?.company?._id
                navigate(`/company/${companyId}`)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    return (
        <div className="min-h-screen bg-gray-50/60">
            <Navbar />
            <div className="max-w-xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
                    <span className="flex items-center justify-center h-12 w-12 rounded-xl bg-violet-50 text-violet-600 mb-5">
                        <Building2 className="h-6 w-6" />
                    </span>
                    <h1 className='font-bold text-xl sm:text-2xl text-gray-900'>What's your company name?</h1>
                    <p className="text-sm text-gray-500 mt-1.5">
                        You can change this later from the company settings page.
                    </p>
                    <div className="mt-6">
                        <Label className="mb-2 block text-sm font-medium text-gray-700">Company name</Label>
                        <Input
                            type='text'
                            placeholder="e.g. Google, Microsoft"
                            className="w-full"
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>
                    <div className="mt-8 flex items-center gap-3">
                        <Button className="cursor-pointer flex-1" variant='outline' onClick={() => navigate('/companies')}>Cancel</Button>
                        <Button className="cursor-pointer flex-1 bg-violet-600 hover:bg-violet-700" onClick={registerCompany} disabled={!companyName.trim()}>Continue</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateCompany
