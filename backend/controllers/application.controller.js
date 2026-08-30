
import Application from "../models/application.model.js"
import Job from "../models/job.model.js"

export const applyJob = async (req, res) => {
    const userId = req.id
    const jobId = req.params.id
    if (!jobId) {
        return res.status(400).json({
            message: "job id required",
            success: false
        })
    }
    // check if user have already applied 
    const existingApplication = await Application.findOne({ job: jobId, applicant: userId })
    if (existingApplication) {
        return res.status(400).json({
            message: "user already applied for this job",
            success: false
        })
    }
    // check job exist or not
    const job = await Job.findById(jobId)
    if (!job){
        return res.status(404).json({
            message:"job not found",
            success:false
        })
    }
    // create new new application
    const newApplication=await Application.create({
        job:jobId,
        applicant:userId,
    })
    // job model me applications ka array hai usme new application ka id dal denge taki kitne user ne applied kiya pata chale
    job.applications.push(newApplication._id)
    await job.save()
    return res.status(201).json({
        message:"job applied successfully",
        success:true
    })
}

// all applied job get
export const getAllApplied=async(req,res)=>{
    const userId=req.id
    const application =await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
        path:"job",
        options:{sort:{createdAt:-1}},
        populate:{
            path:"company",
            options:{sort:{createdAt:-1}}
        }
    })
    console.log(application)
    if(!application){
        return res.status(404).json({
            message:"application not found",
            success:false
        })
    }
    return res.status(200).json({
        application,
        success:true
    })
}

// admin dekhega ke job me kitne user ne apply kiya hai

export const getApplicant=async(req,res)=>{
    const jobId=req.params.id
    const job = await Job.findById(jobId).populate({
        path:"applications",
        options:{sort:{createdAt:-1}},
        populate:{
            path:"applicant",

        }
    })
    if(!job){
        return res.status(404).json({
            message:"Job not found",
            success:false
        })
    }
    return res.status(200).json({
        job,
        success:true
    })
}
export const updateStatus=async(req,res)=>{
    let{status}=req.body
    const applicationId=req.params.id
    if(!status){
        return res.status(400).json({
            message:"status required",
            success:false
        })
    }
    // find application
    const application =await Application.findById(applicationId)
    if(!application){
        return res.status(404).json({
            message:"application not found",
            success:false
        })
    }
    // update the status
    application.status=status.toLowerCase()
    await application.save()
    return res.status(200).json({
        message:"Status update successfully",
        success:true
    })
} 