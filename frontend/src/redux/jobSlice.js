import { createSlice } from "@reduxjs/toolkit";

const jobSlice= createSlice({
    name:"job",
    initialState:{
        allJobs :[],
        allAdminJobs :[],
        singleJob :null,
        searchJobByText:"",
        appliedJobs:[],
        searchQuery:"",
    },
    reducers :{
        // actions
        setAllJobs : (state,action)=>{
            state.allJobs= action.payload
        },
        setSingleJob :(state,action)=>{
            state.singleJob=action.payload
        },
        setAdminJobs :(state,action)=>{
            state.allAdminJobs =action.payload
        },
        setSearchJobByText :(state,action)=>{
            state.searchJobByText =action.payload
        },
        setAppliedJobs :(state,action)=>{
            state.appliedJobs =action.payload
        },
        setSearchQuery :(state,action)=>{
            state.searchQuery=action.payload
        }

    }

})
export const {setSearchQuery,setAllJobs,setSingleJob,setAdminJobs,setSearchJobByText,setAppliedJobs} = jobSlice.actions
export default jobSlice.reducer