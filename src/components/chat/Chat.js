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
        <span className='c-span'><p>{data.user?.userName}</p></span>
      </div>
      <Messages/>
      <Input />
    </div>
  )
}

export default Chat
