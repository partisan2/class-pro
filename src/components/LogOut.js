import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function LogOut() {
    const [error, setError ] = useState("")
    const navigate = useNavigate()
    const {currentUser,logout} = useAuth()

    async function handleLogout(){
        setError("")

        try{
            console.log('dump')
            await logout()
            navigate('/login')
        }catch{
            setError("Failed to Logout")
        }
    }
  return (
    <div>
        {error}
      <strong>Email :</strong>{currentUser.email}

      <button onClick={handleLogout}>Log out</button>
    </div>
  )
}

export default LogOut
