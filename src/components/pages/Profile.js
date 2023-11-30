import React,{useState,useEffect} from 'react'
import HeaderDashboard from '../HeaderDashboard'
import FooterDashboard from '../FooterDashboard'
import LogOut from './LogOut'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { db } from '../../firebase'
import { doc,getDoc } from "firebase/firestore";




function Profile() {
  const [ userName,setUserName ] = useState()
  const [ userEmail,setUserEmail ] = useState()
  const [ userType,setUserType ] = useState()
  const [ userId,setUserID ] = useState()
  const {currentUser} = useAuth();


  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const docRef = doc(db, "Users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          // console.log("Document data:", docSnap.data().email);
          setUserName(docSnap.data().userName)
          setUserEmail(docSnap.data().email)
          setUserType(docSnap.data().userType)
          setUserID(docSnap.data().userId)
          // console.log(docSnap.data().profilePic)
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      }catch(r){console.log(r)}
    }
    fetchData()
  },[currentUser.uid])
  return (
    <div>
      <HeaderDashboard/>
      <div className='about-me'>
        <h3>User Details</h3>
        <br/>
        <tr>
          <td className='name'><label>User Name</label></td>
          <td>{userName}</td>
        </tr>
        <br></br>
        <tr>
          <td className='name'><label>User Email</label></td>
          <td>{userEmail}</td>
        </tr>
        <br/>
        <tr>
          <td className='name'><label>User Type</label></td>
          <td>{userType}</td>
        </tr>
        <br/>
        <tr>
          <td className='name'><label>User ID</label></td>
          <td>{userId}</td>
        </tr>
        <br></br>
        <span>
          <Link to='/update-profile'>Update profile</Link>
        </span>
        <br/>
        <span>
          <Link to='/update-password'>update password</Link>
        </span>
        <br/>
        <span>
          <LogOut/>
          <br/>
        </span>
      </div>
      <FooterDashboard/>
    </div>
  )
}

export default Profile
