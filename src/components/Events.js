import React, { useEffect, useState } from 'react'
import HeaderDashboard from './HeaderDashboard'
import FooterDashboard from './FooterDashboard'
import { Link } from 'react-router-dom'
import { db } from '../firebase'
import { getDocs,collection,deleteDoc,doc } from "firebase/firestore";



function Events() {
  const [ documents,setDocuments ] = useState([])

  useEffect(()=>{
    const fetchData = async () =>{
      let list = []
      try{
        const querySnapshot = await getDocs(collection(db, "Events"));
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        list.push({ id : doc.id ,...doc.data()})
      });
      setDocuments(list)
      // console.log(list)

      }catch(r){console.log(r)}
    }
    fetchData()
  },[])

  const event = documents?.map(({eventName,eventDate,eventTime,eventVenue,eventDiscription,eventId},index)=>{
    return <EventLayout
      key={index}
      eventName={eventName}
      eventDate={eventDate}
      eventTime={eventTime}
      eventVenue={eventVenue}
      eventDiscription={eventDiscription}
      eventId={eventId}
    />
  })

  return (
    <div>
      <HeaderDashboard/>
        <Link to='/add-events'>Add Events</Link>
        {event}
      <FooterDashboard/>
    </div>
  )
}

function EventLayout({eventName,eventDate,eventTime,eventVenue,eventDiscription,eventId}){
  async function deleteEvent(e){
    e.preventDefault()
    try{
      await deleteDoc(doc(db, "Events",eventId))
      alert("Event Removed")
      window.location.reload()
    }catch(r){}
  }
  return(
    <div className='event-component'>
      <h3>{eventName}</h3>
      <div>
        <p>{eventDate}</p>
        <p>{eventTime}</p>
        <p>{eventVenue}</p>
        <p>{eventDiscription}</p>
        {/* {console.log(eventId)} */}
      </div>
      <div>
        <span>Edit</span>
        <span><button onClick={deleteEvent}>Delete</button></span>
      </div>
    </div>
  );
}

export default Events
