import React, { useEffect, useState } from 'react'
import HeaderDashboard from '../HeaderDashboard'
import FooterDashboard from '../FooterDashboard'
import { db } from '../../firebase'
import { getDocs,collection,query,orderBy, where } from "firebase/firestore";
import "../Style.css"
import { Link } from 'react-router-dom';


function Dashboard() {
  const [ events,setEvents ] = useState()
  const [ assignments,setAssignments ] = useState()
  // get ucoming events
  useEffect(()=>{
    const fetchData = async ()=>{
      let list =[]
      try{
        const date = new Date()
        const day = date.getDate()
        const month = date.getMonth()+1
        const year = date.getFullYear()
        const currentDate = `${year}-${month}-${day}`
        // console.log(date)
        
        const querySnapshot = await getDocs(query(collection(db, "Events"),where("eventDate","==",currentDate),orderBy("eventDate")));
        querySnapshot.forEach((doc) => {
        list.push({ id : doc.id, eventName: doc.data().eventName,eventDate: doc.data().eventDate , eventTime: doc.data().eventTime})
      });
      setEvents(list)
      // console.log(list)

      }catch(r){console.log(r)}
    }
    fetchData()
  },[])

  // get assignments
  useEffect(()=>{
    const fetchData = async ()=>{
      let list =[]
      try{
        const date = new Date()
        const day = date.getDate()
        const month = date.getMonth()+1
        const year = date.getFullYear()
        const currentDate = `${year}-${month}-${day}`
        
        
        const querySnapshot = await getDocs(query(collection(db, "Assignments"),where("assignmentDue",">=",currentDate),orderBy("assignmentDue")));
        querySnapshot.forEach((doc) => {
        list.push({ id : doc.id, assignmentName: doc.data().assignmentName,assignmentDue: doc.data().assignmentDue})
      });
      setAssignments(list)
      // console.log(list)

      }catch(r){console.log(r)}
    }
    fetchData()
  },[])

  const upcomingEvent = events?.map(({eventName,eventDate,eventTime},index)=>{
    return <UpcomingEvent
    key={index}
    eventName={eventName}
    eventDate={eventDate}
    eventTime={eventTime}
    />
  })

  const upcomingAssignments = assignments?.map(({assignmentName,assignmentDue},index)=>{
    return <UpcomingAssignment
    key={index}
    assignmentName={assignmentName}
    assignmentDue={assignmentDue}
    />
  })

  return (
    <div>
      <HeaderDashboard/>
      <div className='dashboard-container'>
        <div className='upcming-act'>
          <span>Assignments</span>
          {upcomingAssignments}
        </div>
        {/* upcoming event */}
        <div className='upcming-event'>
          <span className='upcming-event-name'>Upcoming Events</span>
          {upcomingEvent}
          <span><Link to='/events'>Events</Link></span>
        </div>
      </div>
      <div className='dashboard-notice'>
        <span>Notice</span>
      </div>
      <div className='banner'>
        banner
      </div>
      <FooterDashboard/>
    </div>
  )
}

function UpcomingEvent({eventName,eventDate,eventTime}){
  return(
    <table>
      <tr>
        <th>{eventName}</th>
      </tr>
      <tr>
        <td>{eventDate}</td>
        <td>{eventTime}</td>
      </tr>
    </table>
  );
}

function UpcomingAssignment({assignmentName,assignmentDue}){
  return(
    <table>
      <tr>
        <th>{assignmentName}</th>
      </tr>
      <tr>
        <td>{assignmentDue}</td>
      </tr>
    </table>
  )
}

export default Dashboard
