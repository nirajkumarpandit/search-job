import jwt from 'jsonwebtoken'

const isAuthenticate= async (req,res,next)=>{
    try {
        const token=req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"user not authenticated",
            success:false
        })
    }
    const decode=jwt.verify(token,process.env.SECRET_KEY);
    if(!decode){
       return res.status(401).json({
            message:"invaled token",
            success:false
        })
    }
    req.id = decode.userId;
    next()
    } catch (e) {
        console.log(e)
         return res.status(401).json({
            message:"Invalid or expired token",
            success:false
        })
    }
}
export default isAuthenticate