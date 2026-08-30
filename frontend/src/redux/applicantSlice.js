import { createSlice } from "@reduxjs/toolkit";

const applicantSlice= createSlice({
    name:"applicant",
    initialState:{
        allApplicant :[],
    },
    reducers :{
        // actions
        setAllApplicant : (state,action)=>{
            state.allApplicant= action.payload
        },

    }

})
export const {setAllApplicant} = applicantSlice.actions
export default applicantSlice.reducer