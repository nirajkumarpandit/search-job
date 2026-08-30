import React from 'react'
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
import { MoreHorizontal, CheckCircle2, XCircle, Users } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'

const ApplicantTable = () => {
    const { allApplicant } = useSelector(store => store.applicant)
    const statusHandler = async (status, id) => {
        try {
            const res = await axios.put(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status }, { withCredentials: true })
            if (res.data.success) {
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message)
        }
    }

    return (
        <div className="min-w-[680px]">
            <Table>
                <TableCaption>List of applicants for this job</TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {allApplicant.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-10">
                                <div className="flex flex-col items-center gap-2 text-gray-400">
                                    <Users className="h-8 w-8" />
                                    <span className="text-sm">No applicants yet</span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        allApplicant.map((item) => (
                            <TableRow key={item._id} className="hover:bg-gray-50/70">
                                <TableCell className="font-medium text-gray-800">
                                    {item?.applicant?.username}
                                </TableCell>
                                <TableCell className="text-gray-600">
                                    {item?.applicant?.email}
                                </TableCell>
                                <TableCell className="text-gray-600">
                                    {item?.applicant?.phoneNumber}
                                </TableCell>
                                <TableCell>
                                    {item?.applicant?.profile?.resume ? (
                                        <a target='_blank' rel="noreferrer" className='text-violet-700 hover:underline' href={item?.applicant?.profile?.resume}>
                                            {item?.applicant?.profile?.resumeOriginalName}
                                        </a>
                                    ) : <span className="text-gray-400">NA</span>}
                                </TableCell>
                                <TableCell className="text-gray-500">
                                    {item?.applicant?.createdAt?.split('T')[0]}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger className="cursor-pointer inline-flex items-center justify-center h-8 w-8 rounded-lg hover:bg-gray-100">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-40 p-1.5">
                                            <button
                                                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-green-700 hover:bg-green-50 cursor-pointer transition-colors"
                                                onClick={() => statusHandler("Accepted", item._id)}
                                            >
                                                <CheckCircle2 className="w-4 h-4" /> Accept
                                            </button>
                                            <button
                                                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer transition-colors"
                                                onClick={() => statusHandler("Rejected", item._id)}
                                            >
                                                <XCircle className="w-4 h-4" /> Reject
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

export default ApplicantTable
