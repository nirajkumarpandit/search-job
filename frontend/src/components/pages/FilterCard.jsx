import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'
import { Button } from '../ui/button'
import { SlidersHorizontal, X } from 'lucide-react'

const filterArray = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Goa", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend developer", "Full stack developer", "Backend developer"]
    },
    {
        filterType: "Salary",
        array: ["0-80k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch()
    const filterHandler = (value) => {
        setSelectedValue(value)
    }
    useEffect(() => {
        dispatch(setSearchQuery(selectedValue))
    }, [selectedValue])

    return (
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5 sm:sticky sm:top-20">
            <div className="flex items-center justify-between mb-1">
                <h1 className='text-base font-bold text-gray-900 flex items-center gap-2'>
                    <SlidersHorizontal className="h-4 w-4 text-violet-600" /> Filter Jobs
                </h1>
                {selectedValue && (
                    <button
                        onClick={() => setSelectedValue('')}
                        className="flex items-center gap-1 text-xs font-medium text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                    >
                        <X className="h-3.5 w-3.5" /> Clear
                    </button>
                )}
            </div>
            <hr className="my-3 border-gray-100" />
            <RadioGroup value={selectedValue} onValueChange={filterHandler} className="space-y-5">
                {
                    filterArray.map((data, index) => (
                        <div key={index}>
                            <h2 className='text-sm font-semibold text-gray-700 mb-2'>{data.filterType}</h2>
                            <div className="space-y-2">
                                {
                                    data.array.map((item, idx) => {
                                        const itemId = `id${index}-${idx}`
                                        const active = selectedValue === item
                                        return (
                                            <div
                                                className={`flex items-center gap-3 text-sm rounded-lg px-2 py-1.5 transition-colors ${active ? 'bg-violet-50' : 'hover:bg-gray-50'}`}
                                                key={itemId}
                                            >
                                                <RadioGroupItem className={"cursor-pointer"} id={itemId} value={item} />
                                                <Label htmlFor={itemId} className={`cursor-pointer w-full ${active ? 'text-violet-700 font-medium' : 'text-gray-600'}`}>
                                                    {item}
                                                </Label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard
