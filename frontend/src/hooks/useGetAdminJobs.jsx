
import { setAdminJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

const useGetAdminJobs = () => {
    const dispatch = useDispatch()
    useEffect(() => {
      const fetchAdminJob =async()=>{
        try {
            const res= await axios.get(`${JOB_API_END_POINT}/getAdminJobs` ,{withCredentials :true} )
            if(res?.data?.success){
                dispatch(setAdminJobs(res?.data?.job))
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
        }
      }
      fetchAdminJob()
    }, [])
    
}

export default useGetAdminJobs