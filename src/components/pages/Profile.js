import React from 'react'
import HeaderDashboard from '../HeaderDashboard'
import FooterDashboard from '../FooterDashboard'
import LogOut from './LogOut'
import { Link } from 'react-router-dom'

function Profile() {
  return (
    <div>
      <HeaderDashboard/>
      <div className='about-me'>
        <h3>User Details</h3>
        <br/>
        <tr>
          <td className='name'><label>User Name</label></td>
          <td><label>vihan</label></td>
        </tr>
        <br></br>
        <tr>
          <td className='name'><label>User Email</label></td>
          <td><label>test@mail</label></td>
        </tr>
        <br/>
        <tr>
          <td className='name'><label>User Type</label></td>
          <td><lable>Teacher</lable></td>
        </tr>
        <span>
          <Link to='/update-profile'>Update profile</Link>
        </span>
        <br/>
        <span>
          <Link to='/update-password'>update password</Link>
        </span>
        <span>
          <LogOut/>
          <br/>
        </span>
      </div>
      <FooterDashboard/>
    </div>
  )
}

export default Profile
