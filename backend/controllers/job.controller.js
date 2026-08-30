import Job from '../models/job.model.js'

// create job
// admin post karega
export const postJob=async(req,res)=>{
    let{title,description,salary,requirement,location,jobType,company,position,experience}=req.body
    const userId =req.id // kon create kar raha hai
    if(!title || !description || !salary || !requirement || !location || !jobType || !company){
        return res.status(400).json({
            message:"something is missing",
            success:false
        })
    }
    let job=await Job.create({
        title,
        description,
        salary,
        requirement,
        location,
        jobType,
        position,
        experience,
        company:company,
        createdBy:userId
    })
    return res.status(201).json({
        message:"Job successfully created",
        job,
        success:true
    })

}
// update job
// admin update karega
export const updateJob = async(req, res)=>{
     let{title,description,salary,requirement,location,jobType}=req.body
     const userId =req.id
     let job= await Job.findOne({userId})
     if(!job){
        return res.status(404).json({
            message:"job not found",
            success:false
        })
     }

     if(title) job.title=title
     if(description) job.description=description
     if(salary) job.salary=salary
     if(requirement) job.requirement=requirement
     if(location) job.location=location
     if(jobType) job.jobType=jobType
     
     await job.save();
     return res.status(200).json({
        message:"successfully updated joB",
        job,
        succcess:true
     })
     
}
// find All job
// student ke liye
export const getAllJob=async(req,res)=>{
    const keyword=req.query.keyword || ""
    const query={
        $or:[
            {title:{$regex:keyword, $options:"i"}},
            {description:{$regex:keyword, $options:"i"}},
            {location:{$regex:keyword, $options:"i"}},
        ]
    }
    const jobs=await Job.find(query).populate({
        path:"company",
    }).sort({createdAt:-1})
    if(!jobs || jobs.length===0){
        return res.status(404).json({
            message:"job not found",
            success:false
        })
    }
    
    return res.status(200).json({
        jobs,
        success:true
    })
}
// find job By id

export const getJobById=async(req,res)=>{
    const jobId=req.params.id
    const job=await Job.findById(jobId).populate({
        path:"applications"
    })
    if(!job){
        return res.status(404).json({
            message:"job not found",
            success:false
        })
    }
    return res.status(200).json({
        job,
        success:true
    })
}
// delete job
export const deleteJob =async(req,res)=>{
    const jobId=req.params.id
    const job=await Job.findByIdAndDelete(jobId)
    if(!job){
        return res.status(404).json({
            message:"job not found",
            success:false
        })
    }
    return res.status(200).json({
        message:"job delete successfully",
        success:true
    })

}

// admin ne kitne job create kiye hai
export const getAdminJob =async(req,res)=>{
    const adminId=req.id
    const job=await Job.find({createdBy:adminId}).populate({
        path:"company"
    })
    if(!job || job.length===0){
        return res.status(404).json({
            message:"job not found",
            success:false
        })
    }
    return res.status(200).json({
        job,
        success:true
    })
}
