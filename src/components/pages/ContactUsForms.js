import React from 'react'

function ContactUsForms({name,email,subject,message}) {
  return (
    <div>
      <tbody>
        <tr>
            <td>Name</td>
            <td>{name}</td>
        </tr>
        <tr>
            <td>Email</td>
            <td>{email}</td>
        </tr>
        <tr>
            <td>Subject</td>
            <td>{subject}</td>
        </tr>
        <tr>
            <td>Message</td>
            <td>{message}</td>
        </tr>
      </tbody>
    </div>
  )
}

export default ContactUsForms
