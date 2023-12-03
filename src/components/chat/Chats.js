import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { ChatContext } from '../../contexts/ChatContext';

function Chats() {
  const [ chats,setChats ] = useState([])
  const { currentUser } = useAuth()
  const { dispatch } = useContext(ChatContext)

  
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

  // console.log(Object.entries(chats))

  const handleSelect = (u) =>{
    dispatch({type:"CHANGE_USER",payload:u})
  }
  // {console.log(chats)}
  return (
    <div className='chats'>
      {Object.entries(chats)?.map((chat)=>(
        <div className='userchat' key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
          {/* {console.log(chat[1].userInfo)} */}
        <img src={chat[1].userInfo.profilePic} alt=''/>
        <div className='uchatInfo'>
          <span>{chat[1].userInfo.userName}</span>
        </div>
      </div>
      ))}
      
    
    </div>
  )
}

export default Chats
