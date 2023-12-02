import React from 'react'

function UserListLayout({userName,email,userType}) {
  return (
    <div>
      <tbody>
        <tr>
            <td>{userName}</td>
            {/* <td>{userId}</td> */}
            <td>{email}</td>
            <td>{userType}</td>
        </tr>
      </tbody>
    </div>
  )
}

export default UserListLayout
