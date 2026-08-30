import User from "../models/user.model.js"
const isRecruiter =async(req,res,next)=>{
    try {
        const user = await User.findById(req.id)
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false
            })
        }
        if(user.role !='recruiter'){
             return res.status(403).json({
                message:"you are not recruiter ",
                success:false
            }) 
        }
        next()
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}
export default isRecruiter