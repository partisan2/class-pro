import React,{useState,useEffect} from 'react'
import './Style.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase'

function HeaderDashboard() {
    const {currentUser} = useAuth();
    const [documentData, setDocumentData] = useState();
    const [ pic, setPic ] =useState()

    useEffect(()=>{
        const fetchData = async () =>{
          try{
            const docRef = doc(db, "Users", currentUser.uid);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
              // console.log("Document data:", docSnap.data().email);
              setDocumentData(docSnap.data().userName)
              setPic(docSnap.data().profilePic)
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
       <nav className="navbar">
            <div className="logo"><Link to="/">ClassPro</Link></div>
            <ul className="nav-links">
                <input type="checkbox" id="checkbox_toggle"/>
                <label htmlFor="checkbox_toggle" class="three-line">&#9776;</label>
            <div className="menu">
                <li><Link to="/">Home</Link></li>
                <li><Link to='/subject'>Subject</Link></li>
                <li><Link to='/events'>Events</Link></li>
                <li><Link to='/messenger'>Message</Link></li>
                <li><a href="/">About</a></li>
                <li><a href="/">Contact</a></li>
                <li><Link to='/profile'>{documentData}</Link></li>
                <li><Link to='/profile'><img id='pic' src={pic} alt=''/></Link></li>
                </div>
            </ul>
       </nav>
    </div>
  )
}

export default HeaderDashboard
