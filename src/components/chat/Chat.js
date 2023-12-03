import React, { useContext } from 'react'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../../contexts/ChatContext'


function Chat() {
  const {data} = useContext(ChatContext)
  // console.log(data)
  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>{data.user?.userName}</span>
      </div>
      <Messages/>
      <Input />
    </div>
  )
}

export default Chat
