import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../ui/table'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '../ui/popover'
import { Eye, MoreHorizontal, Briefcase } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaTrash } from 'react-icons/fa'
import { toast } from 'sonner'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { setAdminJobs } from '@/redux/jobSlice'

const RecruiterJobTable = () => {
    const navigate = useNavigate()
    const dispatch=useDispatch()

    const { searchJobByText, allAdminJobs } = useSelector(
        (store) => store.job
    )

    const [filterJob, setFilterJob] = useState(allAdminJobs)

    useEffect(() => {
        const filteredJob = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true
            }

            return (
                job?.title
                    ?.toLowerCase()
                    .includes(searchJobByText.toLowerCase()) ||
                job?.company?.companyName
                    ?.toLowerCase()
                    .includes(searchJobByText.toLowerCase())
            )
        })

        setFilterJob(filteredJob)
    }, [allAdminJobs, searchJobByText])

    const jobDeleteHandler = async (id) => {
        try {
            const res = await axios.delete(`${JOB_API_END_POINT}/delete/${id}`, { withCredentials: true })
            if (res.data.success) {
                toast.success(res.data.message)
                // Redux state update karein taaki UI bina page reload kiye rerender ho jaye
            const updatedJobs = allAdminJobs.filter((job) => job._id !== id)
            dispatch(setAdminJobs(updatedJobs))
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message)
        }
    }

    return (
        <div className="min-w-[620px]">
            <Table>
                <TableCaption>List of jobs you've posted</TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead>Company</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {allAdminJobs.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-10">
                                <div className="flex flex-col items-center gap-2 text-gray-400">
                                    <Briefcase className="h-8 w-8" />
                                    <span className="text-sm">No jobs posted yet</span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : filterJob.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-gray-400 py-8">
                                No matching jobs found
                            </TableCell>
                        </TableRow>
                    ) : (
                        filterJob.map((job) => (
                            <TableRow key={job._id} className="hover:bg-gray-50/70">
                                <TableCell className="font-medium text-gray-800">
                                    {job?.company?.companyName}
                                </TableCell>

                                <TableCell className="text-gray-600">
                                    {job?.title}
                                </TableCell>

                                <TableCell className="text-gray-500">
                                    {job?.createdAt?.split('T')[0]}
                                </TableCell>

                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger className="cursor-pointer inline-flex items-center justify-center h-8 w-8 rounded-lg hover:bg-gray-100">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </PopoverTrigger>

                                        <PopoverContent className="w-40 p-1.5">
                                            <button
                                                className="flex w-full items-center gap-2 cursor-pointer rounded-lg px-2.5 py-2 text-sm hover:bg-violet-50 hover:text-violet-700 transition-colors"
                                                onClick={() => navigate(`/job/${job?._id}/applicant`)}
                                            >
                                                <Eye className="w-4 h-4" />
                                                <span>Applicants</span>
                                            </button>
                                            <button
                                                className="flex w-full items-center gap-2 cursor-pointer rounded-lg px-2.5 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                                onClick={() => jobDeleteHandler(job._id)}
                                            >
                                                <FaTrash className="w-3.5 h-3.5" />
                                                <span>Delete</span>
                                            </button>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default RecruiterJobTable
