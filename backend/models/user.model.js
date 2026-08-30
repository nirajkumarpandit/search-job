import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["student","recruiter"],
        required:true
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String},
        resumeOriginalName:{type:String},
        company:{  // ye company schema se aayega 
            type:mongoose.Schema.Types.ObjectId,
            ref:"Compnay"
        },
        profilePhoto:{
            type:String,
            default:""
        }
    }
    
},{timestamps:true})

 const User=mongoose.model("User",userSchema)

 export default User;