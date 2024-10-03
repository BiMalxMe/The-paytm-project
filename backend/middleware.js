const jwt=require('jsonwebtoken')
const { JWTToken } = require('./config')

const authMiddleware=async (req,res,next)=>{
    const authHeader=req.headers.authorization
    
    if( !authHeader  || !authHeader.startsWith('Bearer')){
        res.status(411).json({
            msg:'Invalid Authentication Header'
        })
    }
        const token=authHeader.split(' ')[1]
        try{
            const decoded=jwt.verify(token,JWTToken)

                req.userID=decoded.userID
                next()
            }
            catch(err){
            return res.status(403).json({})
        }
    
}
module.exports={authMiddleware}