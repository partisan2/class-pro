import React,{ useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link,useNavigate } from 'react-router-dom'

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
    <div className='form'>
                    {error}
                    <form onSubmit={handleSubmit}>
                        <h1 className='signup_h'>LogIn</h1>
                        <input type='email' placeholder='Email' ref={emailRef} required />
                        <input type='password' placeholder='Password'ref={passwordRef} required />
                        <br/>
                        <button dissabled = {loading}>Login</button>
                        <br/>
                        <div><Link to='/forgot-password'>Forget Password?</Link></div>
                    </form>
                    <div>
                        Need An Account? <Link to="/signup">Sign Up</Link>
                    </div>
            </div>
  )
}

export default LogIn
