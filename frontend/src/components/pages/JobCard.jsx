import React from 'react'
import { Button } from '../ui/button'
import { Bookmark, MapPin, Briefcase } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const JobCard = ({job}) => {
  const navigate = useNavigate()
  const dayAgoFunction=(mongodbTime)=>{
    const createdAt =new Date(mongodbTime)
    const currentTime =new Date()
    const timeDifference =currentTime -createdAt
    return Math.floor(timeDifference / (1000*24*60*60))
  }

  return (
    <div className='group relative bg-white border border-gray-100 rounded-2xl px-6 py-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out'>

      {/* Top row */}
      <div className="flex items-center justify-between mb-3">
        <p className='text-xs font-medium text-gray-400'>{dayAgoFunction(job?.createdAt)===0 ?'today':`${dayAgoFunction(job?.createdAt)} day ago`}</p>
        <Button
          variant='outline'
          size='icon'
          className="rounded-full cursor-pointer border-gray-200 hover:bg-violet-50 hover:border-violet-300 hover:text-violet-600 transition-colors"
        >
          <Bookmark className="h-4 w-4" />
        </Button>
      </div>

      {/* Company info */}
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="h-12 w-12 rounded-xl border border-gray-100 shadow-sm">
          <AvatarImage src={job?.company?.logo} />
        </Avatar>
        <div>
          <h1 className='font-semibold text-gray-900 text-base leading-tight'>{job?.company?.companyName}</h1>
          <p className='flex items-center gap-1 text-gray-500 text-sm'>
            <MapPin className="h-3.5 w-3.5" />
            {job?.location}, India
          </p>
        </div>
      </div>

      {/* Job info */}
      <div className="mb-4">
        <h1 className='font-bold text-lg text-gray-900 mb-1'>{job?.title}</h1>
        <p className='text-gray-500 text-sm leading-relaxed line-clamp-2'>
         {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className='flex flex-wrap gap-2 mb-5'>
        <Badge className="bg-blue-50 text-blue-700 font-medium border-blue-100 rounded-full px-3" variant='outline'>
          <Briefcase className="h-3 w-3 mr-1" />
          12 Positions
        </Badge>
        <Badge className="bg-red-50 text-red-600 font-medium border-red-100 rounded-full px-3" variant='outline'>
         {job?.jobType}
        </Badge>
        <Badge className="bg-purple-50 text-purple-700 font-medium border-purple-100 rounded-full px-3" variant='outline'>
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Actions */}
      <div className='flex gap-3'>
        <Button
          onClick={() => navigate(`/jobDescription/${job._id}`)}
          className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg cursor-pointer shadow-sm shadow-violet-200 transition-colors"
        >
          Details
        </Button>
        <Button
          variant='outline'
          className="flex-1 rounded-lg border-gray-200 font-medium cursor-pointer hover:bg-gray-50 transition-colors"
        >
          Save for later
        </Button>
      </div>
    </div>
  )
}

export default JobCard