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
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Edit } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaTrash } from 'react-icons/fa'
import { Building2 } from 'lucide-react'

const CompanyTable = () => {
    const navigate = useNavigate()

    const { companies, searchCompanyByText } = useSelector(
        (store) => store.company
    )

    const [filterCompany, setFilterCompany] = useState(companies)

    useEffect(() => {
        const filteredCompany = companies.filter((company) => {
            if (!searchCompanyByText) {
                return true
            }

            return company?.companyName
                ?.toLowerCase()
                .includes(searchCompanyByText.toLowerCase())
        })

        setFilterCompany(filteredCompany)
    }, [companies, searchCompanyByText])

    return (
        <div className="min-w-[560px]">
            <Table>
                <TableCaption>List of recently registered companies</TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead className="w-16">Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {companies.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-10">
                                <div className="flex flex-col items-center gap-2 text-gray-400">
                                    <Building2 className="h-8 w-8" />
                                    <span className="text-sm">No company registered yet</span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : filterCompany.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-gray-400 py-8">
                                No matching companies found
                            </TableCell>
                        </TableRow>
                    ) : (
                        filterCompany.map((company) => (
                            <TableRow key={company._id} className="hover:bg-gray-50/70">
                                <TableCell>
                                    <Avatar className="h-11 w-11 rounded-xl border border-gray-100 shadow-sm">
                                        <AvatarImage src={company?.logo} alt={company?.companyName} />
                                        <AvatarFallback className="rounded-xl bg-violet-50 text-violet-600 font-semibold">
                                            {company?.companyName?.[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                </TableCell>

                                <TableCell className="font-medium text-gray-800">
                                    {company?.companyName}
                                </TableCell>

                                <TableCell className="text-gray-500">
                                    {company?.createdAt?.split('T')[0]}
                                </TableCell>

                                <TableCell className="text-right">
                                    <div className="flex gap-4 items-center justify-end">
                                        <Edit
                                            className="w-4 cursor-pointer text-gray-400 hover:text-violet-600 transition-colors"
                                            onClick={() => navigate(`/company/${company?._id}`)}
                                        />
                                        <FaTrash className="w-3.5 text-gray-400 hover:text-red-600 cursor-pointer transition-colors" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default CompanyTable
