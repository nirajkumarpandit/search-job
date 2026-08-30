import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Contact2, Mail, Pen, FileText, Award } from 'lucide-react'
import { Badge } from '../ui/badge'
import AppliedJobTable from './AppliedJobTable'
import Footer from '../shared/Footer'
import { Button } from '../ui/button'
import UpdateProfile from './UpdateProfile'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const Profile = () => {
  let isResume = true
  const [open, setOpen] = useState(false)
  useGetAppliedJobs()
  const { user } = useSelector(store => store.auth)

  return (
    <div className="min-h-screen bg-gray-50/60 flex flex-col">
      <Navbar />

      <div className='max-w-4xl mx-auto px-4 sm:px-6 w-full flex-1'>
        {/* Profile card */}
        <div className='mt-6 sm:mt-10 rounded-2xl shadow-sm border border-gray-100 bg-white overflow-hidden'>
          <div className="h-24 sm:h-28 bg-gradient-to-r from-violet-500 to-fuchsia-500" />
          <div className="px-5 sm:px-8 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-10 sm:-mt-12">
              <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-white shadow-md">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                  <AvatarFallback className="bg-violet-100 text-violet-700 font-bold text-2xl">
                    {user?.username?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="pb-1">
                  <h1 className='font-bold text-lg sm:text-xl text-gray-900'>{user?.username}</h1>
                  <p className='text-sm text-gray-500 max-w-md'>{user?.profile?.bio || 'No bio added yet.'}</p>
                </div>
              </div>
              <Button onClick={() => setOpen(true)} variant='outline' className="cursor-pointer w-fit self-start sm:self-auto">
                <Pen className="h-4 w-4 mr-1.5" /> Edit Profile
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
              <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3">
                <Mail className='w-4 h-4 text-violet-600 shrink-0' />
                <p className="text-sm text-gray-700 truncate">{user?.email}</p>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3">
                <Contact2 className='w-4 h-4 text-violet-600 shrink-0' />
                <p className="text-sm text-gray-700 truncate">{user?.phoneNumber || 'Not provided'}</p>
              </div>
            </div>

            <div className="mt-6">
              <h2 className='font-semibold text-sm text-gray-800 flex items-center gap-2 mb-2'>
                <Award className="h-4 w-4 text-violet-600" /> Skills
              </h2>
              <div className='flex flex-wrap gap-2'>
                {
                  user?.profile?.skills?.length ? user?.profile?.skills?.map((skill, index) => (
                    <Badge key={index} className="bg-violet-50 text-violet-700 border-violet-100 rounded-full px-3 py-1" variant="outline">
                      {skill}
                    </Badge>
                  )) : <span className="text-sm text-gray-400">No skills added yet</span>
                }
              </div>
            </div>

            <div className='mt-6'>
              <h2 className='font-semibold text-sm text-gray-800 flex items-center gap-2 mb-2'>
                <FileText className="h-4 w-4 text-violet-600" /> Resume
              </h2>
              {
                isResume && user?.profile?.resume
                  ? <a target='_blank' rel="noreferrer" href={user?.profile?.resume} className='text-sm text-violet-700 font-medium hover:underline break-all'>{user?.profile?.resumeOriginalName}</a>
                  : <span className="text-sm text-gray-400">Resume not uploaded</span>
              }
            </div>
          </div>
        </div>

        {/* Applied jobs */}
        <div className='my-8 rounded-2xl shadow-sm border border-gray-100 bg-white p-5 sm:p-6 overflow-x-auto'>
          <AppliedJobTable />
        </div>
      </div>

      <UpdateProfile open={open} setOpen={setOpen} />
      <Footer />
    </div>
  )
}

export default Profile
