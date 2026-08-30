import React from 'react'
import Navbar from '../shared/Navbar'
import ApplicantTable from './ApplicantTable'
import useGetAllApplicant from '@/hooks/useGetAllApplicant'
import { useSelector } from 'react-redux'

const Applicant = () => {
    useGetAllApplicant()
    const { allApplicant } = useSelector(store => store.applicant)
    return (
        <div className="min-h-screen bg-gray-50/60">
            <Navbar />
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
                <div className="mb-6">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                        Applicants <span className="text-gray-400 font-normal text-base">({allApplicant.length})</span>
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Review candidates and update their status</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-2 sm:p-4 overflow-x-auto">
                    <ApplicantTable />
                </div>
            </div>
        </div>
    )
}

export default Applicant
