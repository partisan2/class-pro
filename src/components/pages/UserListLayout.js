import React from 'react'
import './userlistlayout.css';

function UserListLayout({userName,email,userType}) {
  return (
      <div>
        <tbody>
          <tr>
            <td>{userName}</td>
            <td>{email}</td>
            <td>{userType}</td>
          </tr>
        </tbody>
      </div>
  );
}

export default UserListLayout
