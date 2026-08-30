import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompanyTable from './CompanyTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { Search, Plus } from 'lucide-react'

const Companies = () => {
  useGetAllCompanies()
  const navigate = useNavigate()
  const [input, setInput] = useState("")
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setSearchCompanyByText(input))
  }, [input])

  return (
    <div className="min-h-screen bg-gray-50/60">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Companies</h1>
          <p className="text-sm text-gray-500 mt-1">Manage the companies you're hiring for</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              className="pl-9"
              placeholder="Filter by name"
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <Button className="cursor-pointer bg-violet-600 hover:bg-violet-700 shrink-0" onClick={() => navigate('/company/create')}>
            <Plus className="h-4 w-4 mr-1" /> New Company
          </Button>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-2 sm:p-4 overflow-x-auto">
          <CompanyTable />
        </div>
      </div>
    </div>
  )
}

export default Companies
