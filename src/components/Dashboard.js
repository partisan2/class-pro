import React from 'react'
import LogOut from './LogOut'
import { Link } from 'react-router-dom'
// import Header from './Header'

function Dashboard() {
  return (
    <div>
      {/* <Header/> */}
      DashBoard
      <LogOut/>
      UpdateProfile<Link to='/update-profile'>Update</Link>
    </div>
  )
}

export default Dashboard
