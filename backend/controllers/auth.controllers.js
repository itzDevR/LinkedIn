import express from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/user.models.js'
import genToken from '../config/token.js'


export const signup=async (req,res)=>{
    try{
        let {firstName,lastName,userName,email,password}=req.body
        let emailExists=await User.findOne({email})
        if(emailExists){
            return res.status(400).json({message:"email already exists"})
        }
        if(password.length<8){
            return res.status(400).json({message:"password must be more than 8 characters"})
        }
        let isHashed=await bcrypt.hash(password,10)
        const user=await User.create({
            firstName,
            lastName,
            userName,
            email,
            password:isHashed
        })
        let token=await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV==='production',
            maxAge:7*24*60*60*1000
        })

        return res.status(201).json({message:"Successful User Created"})
    }
    catch(err){
    return res.status(500).json({message:err})
}
}

export const login=async (req,res)=>{
    try{
        let {email,password}=req.body
        let user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"user does not exists"})
        }
        let isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"passwords does not match"})
        }
        let token=await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV==='production',
            maxAge:7*24*60*60*1000
        })

        return res.status(201).json({message:"Login successful"})
    }
    catch(err){
    return res.status(500).json({message:err})
}
}

export const logout=async(req,res)=>{
    try{
        res.clearCookie("token")
        return res.status(200).json({message:"Logout successful"})
    }catch(err){
        return res.send(500).json({message:"Logout error"})
    }
}