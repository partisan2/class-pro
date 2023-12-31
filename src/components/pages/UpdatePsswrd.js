import React,{ useRef,useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import HeaderDashboard from '../HeaderDashboard'
import FooterDashboard from '../FooterDashboard'
import './updatepassword.css'


function UpdatePsswrd() {
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const { updatePassword } = useAuth()
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
    <div>
        <HeaderDashboard/>
        <div className='Up-ps'>
        {error && <span>{error}</span>}
        <div className='UP-PS-form'>
            <form onSubmit={handleSubmit}>
                <h1>Update Password</h1>
                <input type='password' placeholder='Password'ref={passwordRef} required />
                <input type='password' placeholder='Confirm Password' ref={confirmPasswordRef} required/>
                <br/>         
                <button dissabled = {loading}>Update Password</button>
                </form>
                <br/>
                <div>
                    <Link to="/" className="cancel-button">Cancel</Link>
                </div>
                <br/>
        </div>
        </div>
        <FooterDashboard/>
    </div>
  )
}

export default UpdatePsswrd
