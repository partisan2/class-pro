import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';

function Chats() {
  const [ chats,setChats ] = useState([])
  const { currentUser } = useAuth()

  
  useEffect(()=>{
    const getChats = () =>{
      const unsub = onSnapshot(doc(db, "UsersChats", currentUser.uid), (doc) => {
        setChats(doc.data())
      });
      return()=>{
        unsub()
      }
    }
    currentUser.uid && getChats()
  },[currentUser.uid])

  console.log(Object.entries(chats))
  
  return (
    <div className='chats'>
      
      <div className='userchat'>
        <img src="https://images.unsplash.com/photo-1686102576420-21c7624cf146?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=''/>
        <div className='uchatInfo'>
          <span></span>
          <p>Hello</p>
        </div>
      </div>
      
    
    </div>
  )
}

export default Chats
