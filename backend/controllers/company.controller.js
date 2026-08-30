import Company from '../models/company.model.js'
import getDataUri from '../utils/datauri.js'
import cloudinary from '../utils/cludnary.js'
export const registeCompany = async (req, res) => {
    const { companyName } = req.body
    if (!companyName) {
        return res.status(400).json({
            message: "company name required ",
            success: false
        })
    }
    let company = await Company.findOne({ companyName: companyName })
    if (company) {
        return res.status(400).json({
            message: "you can't registe same company",
            success: false
        })
    }
    company = await Company.create({
        companyName: companyName,
        userId: req.id
    })
    return res.status(201).json({
        message: " company register successfully",
        company,
        success: true
    })
}

export const getAllCompany = async (req, res) => {
    const userId=req.id
    if(!userId){
        return res.status(400).json({
            message:"user not authenticate",
            success:false
        })
    }
    let companies= await Company.find({userId})
    if(!companies || companies.length === 0){
        return res.status(404).json({
            message:"comapny not found",
            success:false
        })
    }
    return res.status(200).json({
        companies,
        success:true
    }
    )
}

// get company by id
export const getCompanyById=async(req,res)=>{
    const companyId=req.params.id
    const company=await Company.findById(companyId)
    if(!company){
        return res.status(404).json({
            message:"company not found",
            success:false
        })
    }
    return res.status(200).json({company, success:true})
}

// update company details
export const updateCompany=async(req,res)=>{
    let{companyName,website, location,description}=req.body
    const companyId =req.params.id
    let file =req.file
    const fileUri= getDataUri(file)
    const cloudResopnse= await cloudinary.uploader.upload(fileUri.content)
    const logo =cloudResopnse.secure_url
    let updateData={companyName,website, location,description,logo}
    let company=await Company.findByIdAndUpdate(companyId,updateData,{new:true})
    if(!company){
        return res.status(404).json({
            message:"company not found",
            success:false
        })
    }
    return res.status(200).json({
        message:"company updated successfully",
        company,
        success:true
    })

}
