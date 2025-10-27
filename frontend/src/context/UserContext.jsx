import React, { useContext, useState,createContext, useEffect } from 'react'
import axios from 'axios'
import { authDataContext } from './AuthContext'
export const userDataContext=createContext()
const UserContext = ({children}) => {
    let [userData,setUserData]=useState(null)
    let {serverUrl}=useContext(authDataContext)
    const getCurrentUser=async()=>{
        try{
            let result = await axios.get(serverUrl+"/api/user/currentuser",{withCredentials:true})
            setUserData(result.data)
        }catch(err){
            setUserData(null)
        }
    }
    useEffect(()=>{
        getCurrentUser()
    },[])
    const value={
        userData,setUserData
    }
  return (
    <div>
        <userDataContext.Provider value={value}>
      {children}
      </userDataContext.Provider>
    </div>
  )
}

export default UserContext
