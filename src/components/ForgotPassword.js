import React,{ useState,useRef} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import './ForgotPassword.css'
import Header from './Header'

function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error,setError] = useState()
    const [message,setMessage] = useState()
    const [loading,setLoading] = useState("false")


    async function handleSubmit(e){
        e.preventDefault()
        
        try{
            setError("")
            setMessage("")
            setLoading("true")
            await resetPassword(emailRef.current.value)
            setMessage('Check Your Email')
            // console.log(emailRef.current.value,passwordRef.current.value)

        }catch{
            console.log(error)
            setError('Failed to reset password');
        }
        setLoading("false")

    }

  return (
    <div className='container'>
        <Header/>
        <div className='error'>
                {error && <span>{error}</span>}
        </div>
        <div className='form-forgotPassword'>
                    <form onSubmit={handleSubmit}>
                        <h1 className='signup_h'>Password Reset</h1>
                        <br/>
                        <span>{message && <p>{message}</p>}</span>
                        <input type='email' placeholder='Email' ref={emailRef} required />
                        <br/>
                        <div className='to_login'><Link to='/login'>Log In</Link></div>
                        <button dissabled = {loading}>Reset Password</button>
                        <br/>
                    </form>
                    <div className='to_signup'>
                        Need An Account?
                        <br/>
                        <Link to="/signup">Sign Up</Link>
                    </div>
            </div>
    </div>
  )
}

export default ForgotPassword
