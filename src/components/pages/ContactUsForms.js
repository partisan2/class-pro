import React from 'react'

function ContactUsForms({name,email,subject,message}) {
  return (
    <div className='CU-div'>
      <tbody>
        <tr className='CU-tr'>
            <td className='CU-td'>Name</td>
            <td className='CU-td'>{name}</td>
        </tr>
        <tr className='CU-tr'>
            <td className='CU-td'>Email</td>
            <td className='CU-td'>{email}</td>
        </tr>
        <tr className='CU-tr'>
            <td className='CU-td'>Subject</td>
            <td className='CU-td'>{subject}</td>
        </tr>
        <tr className='CU-tr'>
            <td className='CU-td'>Message</td>
            <td className='CU-td'>{message}</td>
        </tr>
      </tbody>
    </div>
  )
}

export default ContactUsForms
