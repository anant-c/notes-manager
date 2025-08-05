import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Notes = () => {
  const [userInfo, setUserInfo] = useState()
  const navigate = useNavigate()

  const handleLogout = ()=>{
    localStorage.removeItem("Token")
    localStorage.removeItem("User Info:")
    navigate("/signin")
  }

  useEffect(()=>{
    const data = localStorage.getItem('User Info:')
    const userData = JSON.parse(data)
    setUserInfo(userData)
  },[])
  return (
    <div>Notes
      <p>{userInfo?.name}</p>
      <p>{userInfo?.email}</p>
      <img src={userInfo?.image} alt="" />
      <button onClick={handleLogout}>Log Out</button>
    </div>
  )
}

export default Notes