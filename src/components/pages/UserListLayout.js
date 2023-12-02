import React from 'react'
import './userlistlayout.css';

function UserListLayout({userName,email,userType}) {
  return (
      <div className='UL-conatiner'>
        <tbody>
          <tr className='UL-tr'>
            <td className='UL-td'>{userName}</td>
            <td className='UL-td'>{email}</td>
            <td className='UL-td'>{userType}</td>
          </tr>
        </tbody>
      </div>
  );
}

export default UserListLayout
