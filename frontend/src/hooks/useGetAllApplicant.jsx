
import { setAllApplicant } from '@/redux/applicantSlice'
import { setAdminJobs } from '@/redux/jobSlice'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

const useGetAllApplicant = () => {
    const dispatch = useDispatch()
    const params= useParams()
    useEffect(() => {
      const fetchApplicant =async()=>{
        try {
            const res= await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicant` ,{withCredentials :true} )
            if(res?.data?.success){
                dispatch(setAllApplicant(res?.data?.job?.applications))
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
        }
      }
      fetchApplicant()
    }, [])
    
}

export default useGetAllApplicant