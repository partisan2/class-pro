import React from 'react'
import HeaderDashboard from './HeaderDashboard'
import FooterDashboard from './FooterDashboard'
import LogOut from './LogOut'
import { Link } from 'react-router-dom'

function Profile() {
  return (
    <div>
      <HeaderDashboard/>
      <Link to='/update-profile'>Update profile</Link>
      <Link to='/update-password'>update password</Link>
      <LogOut/>
      <FooterDashboard/>
    </div>
  )
}

export default Profile
