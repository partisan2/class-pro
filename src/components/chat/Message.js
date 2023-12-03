import React, { useContext } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { ChatContext } from '../../contexts/ChatContext'

function Message({message}) {
  const {currentUser} = useAuth()
  const {data} = useContext(ChatContext)
  return (
    <div className='message owner'>
      <div className='messageInfo'>
        <img src={message.senderId === currentUser.uid ? currentUser.profilePic : data.user.profilePic} alt=''/>
        <span>just now</span>
      </div>
      <div className='messageContent'>
        <p>{message.text}</p>
      </div>
    </div>
  )
}

export default Message
