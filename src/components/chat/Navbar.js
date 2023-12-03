import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase'


function Navbar() {
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
        console.log(docSnap.data().profilePic)
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    }catch(r){console.log(r)}
  }
  fetchData()
},[currentUser.uid])

return (
  <div className='navbar'>
    {/* {console.log(documentData)} */}
      <div className='user'>
        <img className="m-img" src={pic} alt=''/>
        <span className='m-span'><p>{documentData}</p></span>
      </div>
    </div>
  )
}

export default Navbar
