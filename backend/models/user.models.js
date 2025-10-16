import express from 'express'
import mongoose from 'mongoose'
const userSchema=new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{required:true,type:String},
    userName:{required:true,type:String},
    email:{required:true,type:String,unique:true},
    password:{required:true,type:String},
    profileImage:{default:"",type:String},
    coverImage:{default:"",type:String},
    headline:{default:"",type:String},
    skills:[{type:String}],
    education:[{
        college:{type:String},
        degree:{type:String},
        fieldOfStudy:{type:String}
    }],
    location:{
        type:String
    },
    gender:{
        type:String,
        enum:["male","female","other"]
    },
    experience:[{
        title:{type:String},
        company:{type:String},
        description:{type:String}
    }],
    connection:[
        {type:mongoose.Schema.Types.ObjectId,
        ref:'User'}
]
},{timestamps:true})
const User=mongoose.model("User",userSchema)
export default User