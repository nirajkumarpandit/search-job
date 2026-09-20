import { createSlice } from "@reduxjs/toolkit";

const resumeAnalyzer= createSlice({
    name:"resumeAnalysis",
    initialState:{
        analysis :null,
    },
    reducers :{
        // actions
        setAnalysis : (state,action)=>{
            state.analysis= action.payload
        }
    }

})
export const {setAnalysis} = resumeAnalyzer.actions
export default resumeAnalyzer.reducer