import React,{useState,useEffect} from 'react'
import './Style.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase'

function HeaderDashboard() {
    const {currentUser} = useAuth();
    const [ pic, setPic ] =useState()

    useEffect(()=>{
        const fetchData = async () =>{
          try{
            const docRef = doc(db, "Users", currentUser.uid);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
              setPic(docSnap.data().profilePic)
            } else {
              console.log("No such document!");
            }
          }catch(r){console.log(r)}
        }
        fetchData()
      },[currentUser.uid])

  return (
    <div className='header-dashboard'>
       <nav className="navbar-dashboard">
            <div className="logo"><Link to="/">ClassPro</Link></div>
            <ul className="nav-links">
            <div className="menu">
                <li><Link to='/assignments'>Assignment</Link></li>
                <li><Link to='/events'>Events</Link></li>
                <li><Link to='/messenger'>Message</Link></li>
                <li><Link to='/aboutus'>About</Link></li>
                <li><Link to='/contact'>Contact</Link></li>
                </div>
                <Link to='/profile'><img id='pic' src={pic} alt=''/></Link>
            </ul>
       </nav>
    </div>
  )
}

export default HeaderDashboard
