import React,{ useState,useRef} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error,setError] = useState()
    const [message,setMessage] = useState()
    const [loading,setLoading] = useState(false)


    async function handleSubmit(e){
        e.preventDefault()
        
        try{
            setError("")
            setMessage("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check Your Email')
            // console.log(emailRef.current.value,passwordRef.current.value)

        }catch{
            console.log(error)
            setError('Failed to reset password');
        }
        setLoading(false)

    }

  return (
    <div className='form'>
                    {error}
                    {message}
                    <form onSubmit={handleSubmit}>
                        <h1 className='signup_h'>Password Reset</h1>
                        <input type='email' placeholder='Email' ref={emailRef} required />
                        <br/>
                        <button dissabled = {loading}>Reset Password</button>
                        <br/>
                        <div><Link to='/login'>Log In</Link></div>
                    </form>
                    <div>
                        Need An Account? <Link to="/signup">Sign Up</Link>
                    </div>
            </div>
  )
}

export default ForgotPassword
