import React from 'react'
import { Badge } from '../ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Bookmark } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const JobCards = ({job}) => {
    const navigate =useNavigate()
  return (
    <div onClick={() => navigate(`/jobDescription/${job?._id}`)} className='p-5 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:border-purple-100 transition-all duration-300 cursor-pointer'>

        {/* Top: company info + bookmark */}
        <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
                <Avatar className="h-11 w-11 border border-gray-100">
                    <AvatarImage src={job?.company?.logo} alt="company logo" />
                </Avatar>
                <div>
                    <h1 className='text-base font-semibold text-gray-900'>{job?.company?.companyName}</h1>
                    <p className='text-gray-500 text-xs'>India</p>
                </div>
            </div>
            <Bookmark className="w-4 h-4 text-gray-400 hover:text-purple-600 transition-colors" />
        </div>

        {/* Middle: job title + description */}
        <div className="mt-4">
            <h1 className='text-lg font-bold text-gray-900'>{job?.title}</h1>
            <p className='text-gray-500 text-sm mt-1 line-clamp-2'>
                {job?.description}
            </p>
        </div>

        {/* Bottom: badges */}
        <div className='flex flex-wrap gap-2 mt-4'>
            <Badge className="text-blue-700 font-medium bg-blue-50 border-blue-100" variant='outline'>
                {job?.position} Positions
            </Badge>
            <Badge className="text-red-500 font-medium bg-red-50 border-red-100" variant='outline'>
                {job?.jobType}
            </Badge>
            <Badge className="text-purple-600 font-medium bg-purple-50 border-purple-100" variant='outline'>
                {job?.salary}LPA
            </Badge>
        </div>
    </div>
  )
}

export default JobCards