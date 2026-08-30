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
        res.status(401).json({
            message:"invaled token",
            success:false
        })
    }
    req.id = decode.userId;
    next()
    } catch (e) {
        console.log(e)
    }
}
export default isAuthenticate