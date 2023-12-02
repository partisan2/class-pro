import React,{useState,useEffect} from 'react'
import './HeaderDashboard.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase'

function HeaderDashboard() {
    const {currentUser} = useAuth();
    const [ pic, setPic ] =useState()
    const [ userType,setUserType ] = useState()

    useEffect(()=>{
        const fetchData = async () =>{
          try{
            const docRef = doc(db, "Users", currentUser.uid);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
              setPic(docSnap.data().profilePic)
              setUserType(docSnap.data().userType)
            } else {
              console.log("No such document!");
            }
          }catch(r){console.log(r)}
        }
        fetchData()
      },[currentUser.uid])
  if(userType === "admin"){
    return(
      <div className='header-dashboard'>
       <nav className="navbar-dashboard">
            <div className="logo"><Link to="/"><h3>ClassPro</h3></Link></div>
            <div className='admin-profile'>
                <Link to='/profile' className='admin-profile'><img id='pic' src={pic} alt=''/></Link>  
            </div>
       </nav>
    </div>
    )
  }
  if(userType === "teacher" || userType !== "admin"){
    return (
      <div className='header-dashboard'>
         <nav className="navbar-dashboard">
              <div className="logo"><Link to="/"><h3>ClassPro</h3></Link></div>
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
}

export default HeaderDashboard
