import React from 'react'
import LogOut from './LogOut'
import { Link } from 'react-router-dom'

function Dashboard() {
  return (
    <div>
      DashBoard
      <LogOut/>
      UpdateProfile<Link to='/update-profile'>Update</Link>
    </div>
  )
}

export default Dashboard
