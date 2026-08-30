import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import JobCard from './JobCard'
import FilterCard from './FilterCard'
import { useSelector } from 'react-redux'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { motion } from "framer-motion"
import { Button } from '../ui/button'
import { SlidersHorizontal, SearchX, X } from 'lucide-react'

const Jobs = () => {
  useGetAllJobs()
  const { allJobs, searchQuery } = useSelector(store => store.job)
  const [filterJob, setFilterJob] = useState(allJobs)
  const [showMobileFilter, setShowMobileFilter] = useState(false)

  useEffect(() => {
    if (searchQuery) {
      const filteredJob = allJobs.filter((job) => {
        return job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase())
      })
      setFilterJob(filteredJob)
    } else {
      setFilterJob(allJobs)
    }
  }, [allJobs, searchQuery])

  return (
    <div className="min-h-screen bg-gray-50/60">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Browse Jobs {filterJob?.length > 0 && <span className="text-gray-400 font-normal text-base">({filterJob.length})</span>}
          </h1>
          <Button
            variant="outline"
            className="sm:hidden cursor-pointer"
            onClick={() => setShowMobileFilter(true)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-1" /> Filters
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 items-start">
          {/* Desktop filter sidebar */}
          <aside className="hidden sm:block w-full sm:w-72 shrink-0">
            <FilterCard />
          </aside>

          <div className="flex-1 w-full">
            {
              filterJob?.length <= 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 py-20 text-gray-400 bg-white rounded-2xl border border-gray-100">
                  <SearchX className="h-10 w-10" />
                  <p className="text-sm font-medium">No jobs match your search</p>
                </div>
              ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6'>
                  {
                    filterJob?.map((job) => (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        key={job._id}>
                        <JobCard job={job} />
                      </motion.div>
                    ))
                  }
                </div>
              )
            }
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-50 sm:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowMobileFilter(false)} />
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl p-4 overflow-y-auto animate-fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">Filters</h2>
              <button onClick={() => setShowMobileFilter(false)} className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>
            <FilterCard />
            <Button onClick={() => setShowMobileFilter(false)} className="w-full mt-4 bg-violet-600 hover:bg-violet-700 cursor-pointer">
              Show results
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Jobs
