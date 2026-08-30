import React from 'react'
import JobCards from './LatestJobCards'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { ArrowRight, SearchX } from 'lucide-react'

const LatestJobs = () => {
  const { allJobs } = useSelector(store => store.job)
  const navigate = useNavigate()

  return (
    <section className='max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10'>
      <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
        <div>
          <h2 className='text-2xl sm:text-3xl font-extrabold text-gray-900'>
            <span className='text-violet-600'>Latest &amp; Top</span> Job Openings
          </h2>
          <p className="text-sm text-gray-500 mt-1">Fresh opportunities added by top companies</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/jobs')} className="cursor-pointer hidden sm:inline-flex">
          View all jobs <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {
        allJobs?.length <= 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-gray-400">
            <SearchX className="h-10 w-10" />
            <p className="text-sm font-medium">No jobs available right now</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {allJobs?.slice(0, 6).map((job) => <JobCards key={job._id} job={job} />)}
          </div>
        )
      }

      <div className="mt-8 flex justify-center sm:hidden">
        <Button variant="outline" onClick={() => navigate('/jobs')} className="cursor-pointer w-full">
          View all jobs <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </section>
  )
}

export default LatestJobs
