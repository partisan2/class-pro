import React from 'react'
import LogOut from './LogOut'
import { Link } from 'react-router-dom'
import HeaderDashboard from './HeaderDashboard'
import FooterDashboard from './FooterDashboard'
// import Header from './Header'

function Dashboard() {
  return (
    <div>
      <HeaderDashboard/>
      
      <FooterDashboard/>
    </div>
  )
}

export default Dashboard
