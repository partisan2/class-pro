import React, { useRef } from 'react'
import HeaderDashboard from '../HeaderDashboard'
import FooterDashboard from '../FooterDashboard'
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';


function AddEvents() {
    const eventNameRef = useRef()
    const eventDateRef = useRef()
    const eventTimeRef = useRef()
    const eventVenueRef = useRef()
    const eventDiscriptionRef = useRef()
    const { currentUser } = useAuth()


    async function handleSubmit(e){
        e.preventDefault()
        try{
            const id = currentUser.uid+(new Date().getTime().toString())
            // console.log(id)
            await setDoc(doc(db, "Events", id), {
                eventId:id,
                eventName:eventNameRef.current.value,
                eventDate:eventDateRef.current.value,
                eventTime:eventTimeRef.current.value,
                eventVenue:eventVenueRef.current.value,
                eventDiscription:eventDiscriptionRef.current.value,
                timeStamp: serverTimestamp()
            });
            alert("data added")
            console.log("dump");
            window.location.reload()
        }catch(r){console.log(r)}
    }

  return (
    <div className='ad-eve-wrap'>
        <HeaderDashboard/>
      <div className='ad-form'>
        <form onSubmit={handleSubmit}>
            <h3>Add Event</h3>
            <input type='text' placeholder='Name' ref={eventNameRef}/>
            <input type='date' placeholder='Date' ref={eventDateRef}/>
            <input type='time' placeholder='Time' ref={eventTimeRef}/>
            <input type='text' placeholder='Venue' ref={eventVenueRef}/>
            <input type='text' placeholder='Description' ref={eventDiscriptionRef}/>
            <input type='submit' className='submit-btn'/>
        </form>
      </div>
      <FooterDashboard/>
    </div>
  )
}

export default AddEvents
