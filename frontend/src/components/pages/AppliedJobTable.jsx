import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { useSelector } from 'react-redux'
import { FileX2 } from 'lucide-react'

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  accepted: "bg-green-100 text-green-700 hover:bg-green-100",
  rejected: "bg-red-100 text-red-700 hover:bg-red-100",
}

const AppliedJobTable = () => {
  const { appliedJobs } = useSelector(store => store.job)
  return (
    <div>
      <h1 className='font-bold text-lg text-gray-900 mb-4'>Applied Jobs</h1>
      <div className="overflow-x-auto -mx-1">
        <Table className="min-w-[520px]">
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Job Role</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className={"text-right"}>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              appliedJobs && appliedJobs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10">
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                      <FileX2 className="h-8 w-8" />
                      <span className="text-sm">No jobs applied yet</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) :
                appliedJobs.map((job) => (
                  <TableRow key={job._id}>
                    <TableCell className="text-gray-500">{job?.createdAt?.split("T")[0]}</TableCell>
                    <TableCell className="font-medium text-gray-800">{job?.job?.title}</TableCell>
                    <TableCell className="text-gray-600">{job?.job?.company?.companyName}</TableCell>
                    <TableCell className={"text-right"}>
                      <Badge className={`rounded-full px-3 capitalize ${statusStyles[job?.status] || ""}`}>
                        {job?.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
            }
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default AppliedJobTable
