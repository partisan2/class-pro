import React, { useRef, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import './SignUp.css'
import Header from '../Header'
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from '../../firebase';

function SignUp() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const userIdRef = useRef()
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
            // console.log(emailRef.current.value,passwordRef.current.value)
            const res = await signup(emailRef.current.value,passwordRef.current.value)
            try{
                await setDoc(doc(db, "Users", res.user.uid), {
                    email:emailRef.current.value,
                    userName:emailRef.current.value,
                    userType:"",
                    profilePic:"",
                    userId:userIdRef.current.value,
                    timeStamp: serverTimestamp()
                });

                await setDoc(doc(db, "UsersChats", res.user.uid), {
                });
                navigate('/login')
            }catch(r){console.log(r)}
        }catch{
            console.log(error)
            setError('Failed to Create an account');
            setLoading(false)
        }

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
                        <input type='text' placeholder='User Id' ref={userIdRef} required/>
                        <br/>
                        <button dissabled = {loading}>Sign Up</button>
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
