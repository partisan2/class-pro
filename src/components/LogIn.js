import React,{ useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link,useNavigate } from 'react-router-dom'
import './LogIn.css'
import Header from './Header'

function LogIn() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error,setError] = useState()
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate();


    async function handleSubmit(e){
        e.preventDefault()
        
        try{
            setError("")
            setLoading(true)
            await login(emailRef.current.value,passwordRef.current.value)
            console.log(emailRef.current.value,passwordRef.current.value)
            navigate('/')
        }catch{
            console.log(error)
            setError('Failed to Loging to account');
        }
        setLoading(false)

    }

  return (
    <div className='container'>
        <Header/>
        <div className='error'>
            {error && <span>{error}</span>}
        </div>
        <div className='form-login'>
                    <form onSubmit={handleSubmit}>
                        <h1 className='signup_h'>LogIn</h1>
                        <br/>
                        <input name='email' type='email' placeholder='Email' ref={emailRef} required />
                        <input name='password' type='password' placeholder='Password'ref={passwordRef} required />
                        <div className='forgot_password'><Link to='/forgot-password'>Forgot Password?</Link></div>
                        <button dissabled = {loading}>Login</button>
                        <br/>
                    </form>
                    <br/>
                    <div className='to_signup'>
                        Need An Account? 
                        <br/>
                        <Link to="/signup">Sign Up</Link>
                    </div>
            </div>
    </div>
  )
}

export default LogIn
