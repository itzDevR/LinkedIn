import express from 'express'
import User from '../models/user.models.js'

export const getCurrentUser=async(req,res)=>{
    try{
        let id=req.userId
        console.log(id)
        const user=await User.findById(id).select("-password")
        if(!user){
            return res.status(400).json({message:"user does not exist"})
        }
        return res.status(200).json(user)
    }catch(err){
        console.log(err)
        return res.status(400).json({message:"get current user error"})
    }
}