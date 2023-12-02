import React from 'react'
import TeacherListLayout from './TeacherListLayout'

function AdminDashboard() {
  return (
    <div className='admin-dashboard'>
        <section className='container'>
          <div className='user-list'>
            <div className='teacher-list'>
              <TeacherListLayout/>
            </div>
            <div className='parent-list'>
              parents
            </div>
            <div className='students-list'>
              students
            </div>
            <div className='not-assigned-users'>
              not assigned
            </div>
          </div>
        </section>
          <div className='contact-us-messages'>
            contact us messages
          </div>
      </div>
  )
}

export default AdminDashboard
