import jwt from 'jsonwebtoken'

const genToken=async(userId)=>{
    try{
        let token=await jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"})
    }
    catch(err){
        console.log(err)
    }
}
export default genToken
