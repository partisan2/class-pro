import React, { useContext, useState } from 'react'
import { ChatContext } from '../../contexts/ChatContext'
import { useAuth } from '../../contexts/AuthContext'
import { Timestamp, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'


function Input() {
  const [ text,setText] = useState("")
  const {currentUser} = useAuth()
  const {data} = useContext(ChatContext)

  const handleSend = async ()=>{
    await updateDoc(doc(db,"chats",data.chatId),{
      messages: arrayUnion({
        id:Math.random(),
        text,
        senderId:currentUser.uid,
        data:Timestamp.now(),
      })
    })
    setText("")

  }
  return (
    <div className='input'>
      <input type='text' placeholder='Type ....' onChange={e=>setText(e.target.value)} value={text}/>
      {/* {console.log(text)} */}
      <div className='send'>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Input
