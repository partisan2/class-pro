import React from 'react'
import Sidebar from './chat/Sidebar'
import Chat from './chat/Chat'
import './Messenger.css'
import HeaderDashboard from './HeaderDashboard'
import FooterDashboard from './FooterDashboard'

function Messenger() {
  return (
    <div>
      <HeaderDashboard/>
    <div className='messenger'>
      <div className='containerm'>
        <Sidebar/>
        <Chat/>
      </div>
    </div>
    <FooterDashboard/>
    </div>
  )
}

export default Messenger
