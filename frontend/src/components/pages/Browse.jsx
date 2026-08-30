import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import JobCard from './JobCard';
import { useSelector, useDispatch } from 'react-redux';
import { SearchX, X } from 'lucide-react'
import { setSearchQuery } from '@/redux/jobSlice'

const Browse = () => {
  const { allJobs, searchQuery } = useSelector(store => store.job)
  const dispatch = useDispatch()

  return (
    <div className="min-h-screen bg-gray-50/60 flex flex-col">
      <Navbar />
      <div className='max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1 w-full'>
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <h1 className='font-bold text-xl sm:text-2xl text-gray-900'>
            Search Results <span className="text-gray-400 font-normal text-base">({allJobs.length})</span>
          </h1>
          {searchQuery && (
            <button
              onClick={() => dispatch(setSearchQuery(""))}
              className="flex items-center gap-1.5 text-sm font-medium text-violet-700 bg-violet-50 border border-violet-100 rounded-full px-3 py-1.5 hover:bg-violet-100 transition-colors cursor-pointer"
            >
              "{searchQuery}" <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        {
          allJobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-gray-400 bg-white rounded-2xl border border-gray-100">
              <SearchX className="h-10 w-10" />
              <p className="text-sm font-medium">No jobs found</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6'>
              {
                allJobs.map((job) => <JobCard key={job._id} job={job} />)
              }
            </div>
          )
        }
      </div>
      <Footer />
    </div>
  )
}

export default Browse
