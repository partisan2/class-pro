import React,{ useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

function UpdateProfile() {
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const {  updatePassword } = useAuth()
    const [error,setError] = useState()
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate();

    function handleSubmit(e){
        setError("")
        setLoading(true)
        e.preventDefault()
        if(passwordRef.current.value !== confirmPasswordRef.current.value){
            return setError('Password do not match')
        }

        const promises = []

        if(passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() =>{
            navigate("/login")
        }).catch(() =>{
            setError("Failed to Update")
        }).finally(() =>{
            setLoading(false)
        })
        

    }
  return (
    <div className='form'>
                    {error}
                    <form onSubmit={handleSubmit}>
                        <h1 className='signup_h'>Update Password</h1>
                        <input type='password' placeholder='Password'ref={passwordRef} required />
                        <input type='password' placeholder='Confirm Password' ref={confirmPasswordRef} required/>
                        <br/>
                        
                        <button dissabled = {loading}>Update Password</button>
                        {/* <span dissabled = {loading}>SignUp</span> */}
                        <br/>
                    </form>
                    <div>
                        <Link to="/">Cancel</Link>
                    </div>
            </div>
  )
}

export default UpdateProfile
