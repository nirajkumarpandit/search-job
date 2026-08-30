import mongoose from "mongoose";
const companySchema=mongoose.Schema({
    companyName:{
        type:String,
        required:true,
        unique:true
    },
    location:{
        type:String
    },
    logo:{  // url to company logo
        type:String,
    },
    description:{
        type:String
    },
    website:{
        type:String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

},{timestamps:true})

const Company=mongoose.model("Company",companySchema)
export default Company