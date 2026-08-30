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
        clearApplicantState:(state)=>{
            state.allApplicant=[]
        }

    }

})
export const {setAllApplicant,clearApplicantState} = applicantSlice.actions
export default applicantSlice.reducer