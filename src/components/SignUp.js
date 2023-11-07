import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import './SignUp.css'
import Header from './Header'

function SignUp() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const { signup } = useAuth()
    const [error,setError] = useState()
    const [loading,setLoading] = useState("false")
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault()
        if(passwordRef.current.value !== confirmPasswordRef.current.value){
            return setError('Password do not match')
        }
        
        try{
            setError("")
            setLoading("true")
            // console.log(emailRef.current.value,passwordRef.current.value)
            await signup(emailRef.current.value,passwordRef.current.value)
            navigate('/login')
        }catch{
            console.log(error)
            setError('Failed to Create an account');
        }
        setLoading("false")

    }

    
  return (
        <div className='container'>
            <Header/>
            <div className='error'>
                {error && <span>{error}</span>}
            </div>
            <div className='form-signup'>
                    <form onSubmit={handleSubmit}>
                        <h1 className='signup_h'>SignUp</h1>
                        <br/>
                        <input type='email' placeholder='Email' ref={emailRef} required />
                        <input type='password' placeholder='Password'ref={passwordRef} required />
                        <input type='password' placeholder='Confirm Password' ref={confirmPasswordRef} required/>
                        <br/>
                        <button dissabled = {loading}>Sign Up</button>
                        <br/>
                    </form>
                    <div className='to_login'>
                        Already Have An Account?
                        <br/>
                        <Link to="/login">LogIn</Link>
                    </div>
            </div>
        </div>
  )
}

export default SignUp
