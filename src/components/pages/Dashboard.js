import React, { useEffect, useState } from 'react'
import HeaderDashboard from '../HeaderDashboard'
import FooterDashboard from '../FooterDashboard'
import { db } from '../../firebase'
import { getDocs,collection,query,orderBy, where } from "firebase/firestore";
import "../Style.css"
import { Link } from 'react-router-dom';


function Dashboard() {
  const [ events,setEvents ] = useState()
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
        console.log(date)
        
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

  const upcomingEvent = events?.map(({eventName,eventDate,eventTime},index)=>{
    return <UpcomingEvent
    key={index}
    eventName={eventName}
    eventDate={eventDate}
    eventTime={eventTime}
    />
  })

  return (
    <div>
      <HeaderDashboard/>
      <div className='dashboard-container'>
        <div className='upcming-act'>
          <span>Assignments</span>
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

export default Dashboard
