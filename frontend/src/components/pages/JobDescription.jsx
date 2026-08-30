import React, { useEffect, useState } from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { setSingleJob } from '@/redux/jobSlice'
import { Briefcase, MapPin, Wallet, Users, CalendarDays, ArrowLeft, CheckCircle2 } from 'lucide-react'

const JobDescription = () => {
    const { jobId } = useParams()
    const { singleJob } = useSelector(store => store.job)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(store => store.auth)
    const isInitialApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false
    const [isApplied, setIsApplied] = useState(isInitialApplied)

    const applyJobHandler = async () => {
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true })
            if (res.data.success) {
                setIsApplied(true)
                const updateSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }]
                }
                dispatch(setSingleJob(updateSingleJob))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message)
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job))
                    setIsApplied(res?.data?.job?.applications?.some(application => application.applicant === user?._id))
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (jobId) {
            fetchSingleJob()
        }
    }, [jobId])

    const infoItems = [
        { icon: Users, label: 'Positions', value: `${singleJob?.position ?? '-'} openings` },
        { icon: Briefcase, label: 'Job type', value: singleJob?.jobType },
        { icon: Wallet, label: 'Salary', value: singleJob?.salary ? `${singleJob.salary} LPA` : '-' },
        { icon: MapPin, label: 'Location', value: singleJob?.location },
        { icon: CalendarDays, label: 'Posted on', value: singleJob?.createdAt ? new Date(singleJob.createdAt).toLocaleDateString() : '-' },
    ]

    return (
        <div className="min-h-screen bg-gray-50/60 flex flex-col">
            <Navbar />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex-1 w-full">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-violet-600 transition-colors mb-5 cursor-pointer"
                >
                    <ArrowLeft className="h-4 w-4" /> Back
                </button>

                {/* Header card */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                        <Avatar className="h-16 w-16 rounded-2xl border border-gray-100 shadow-sm shrink-0">
                            <AvatarImage src={singleJob?.company?.logo} />
                            <AvatarFallback className="rounded-2xl bg-violet-50 text-violet-600 font-bold">
                                {singleJob?.company?.companyName?.[0]}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                            <h1 className='font-extrabold text-xl sm:text-2xl text-gray-900'>{singleJob?.title}</h1>
                            <p className="text-gray-500 text-sm mt-0.5">
                                {singleJob?.company?.companyName} {singleJob?.location && `· ${singleJob.location}`}
                            </p>
                            <div className='flex flex-wrap gap-2 mt-3 items-center'>
                                <Badge className="text-blue-700 font-medium bg-blue-50 border-blue-100 rounded-full px-3" variant='outline'>
                                    {singleJob?.position} Positions
                                </Badge>
                                <Badge className="text-red-500 font-medium bg-red-50 border-red-100 rounded-full px-3" variant='outline'>
                                    {singleJob?.jobType}
                                </Badge>
                                <Badge className="text-violet-700 font-medium bg-violet-50 border-violet-100 rounded-full px-3" variant='outline'>
                                    {singleJob?.salary} LPA
                                </Badge>
                            </div>
                        </div>

                        <Button
                            onClick={isApplied ? undefined : applyJobHandler}
                            disabled={isApplied}
                            className={`rounded-xl w-full sm:w-auto shrink-0 font-medium ${isApplied ? "cursor-not-allowed bg-gray-200 text-gray-500 hover:bg-gray-200" : "bg-violet-600 cursor-pointer hover:bg-violet-700 shadow-sm shadow-violet-200"}`}>
                            {isApplied ? (<><CheckCircle2 className="h-4 w-4 mr-1" /> Already Applied</>) : "Apply now"}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    {/* Description */}
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-8">
                        <h2 className="font-bold text-lg text-gray-900 mb-3">Job Description</h2>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-line">{singleJob?.description}</p>
                    </div>

                    {/* Overview */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 h-fit">
                        <h2 className="font-bold text-lg text-gray-900 mb-4">Job Overview</h2>
                        <div className="space-y-4">
                            {infoItems.map(({ icon: Icon, label, value }) => (
                                <div key={label} className="flex items-start gap-3">
                                    <span className="flex items-center justify-center h-9 w-9 rounded-lg bg-violet-50 text-violet-600 shrink-0">
                                        <Icon className="h-4 w-4" />
                                    </span>
                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-400">{label}</p>
                                        <p className="text-sm font-semibold text-gray-800 truncate">{value || '-'}</p>
                                    </div>
                                </div>
                            ))}
                            <div className="flex items-start gap-3 pt-1 border-t border-gray-100">
                                <span className="flex items-center justify-center h-9 w-9 rounded-lg bg-violet-50 text-violet-600 shrink-0 mt-3">
                                    <Users className="h-4 w-4" />
                                </span>
                                <div className="min-w-0 mt-3">
                                    <p className="text-xs text-gray-400">Total applicants</p>
                                    <p className="text-sm font-semibold text-gray-800">{singleJob?.applications?.length ?? 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default JobDescription
