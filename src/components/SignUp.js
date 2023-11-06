import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
// import './SignUp.css'

function SignUp() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const { signup } = useAuth()
    const [error,setError] = useState()
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault()
        if(passwordRef.current.value !== confirmPasswordRef.current.value){
            return setError('Password do not match')
        }
        
        try{
            setError("")
            setLoading(true)
            console.log(emailRef.current.value,passwordRef.current.value)
            await signup(emailRef.current.value,passwordRef.current.value)
            navigate('/login')
        }catch{
            console.log(error)
            setError('Failed to Create an account');
        }
        setLoading(false)

    }

    
  return (
        <div className='container'>
            <div className='form'>
                    {error}
                    <form onSubmit={handleSubmit}>
                        <h1 className='signup_h'>SignUp</h1>
                        <input type='email' placeholder='Email' ref={emailRef} required />
                        <input type='password' placeholder='Password'ref={passwordRef} required />
                        <input type='password' placeholder='Confirm Password' ref={confirmPasswordRef} required/>
                        <br/>
                        
                        <button dissabled = {loading}>SignUp</button>
                        {/* <span dissabled = {loading}>SignUp</span> */}
                        <br/>
                    </form>
                    <div>
                        Already Have An Account <Link to="/login">LogIn</Link>
                    </div>
            </div>
        </div>
  )
}

export default SignUp
