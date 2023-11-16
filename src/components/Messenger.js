import React from 'react'
import Sidebar from './chat/Sidebar'
import Chat from './chat/Chat'
import './Messenger.css'

function Messenger() {
  return (
    <div className='messenger'>
      <div className='containerm'>
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

export default Messenger
