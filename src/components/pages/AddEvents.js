import React, { useRef } from 'react'
import HeaderDashboard from '../HeaderDashboard'
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
        }catch(r){console.log(r)}
    }

  return (
    <div>
        <HeaderDashboard/>
      <div className='form'>
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Name' ref={eventNameRef}/>
            <input type='date' placeholder='Date' ref={eventDateRef}/>
            <input type='time' placeholder='Time' ref={eventTimeRef}/>
            <input type='text' placeholder='Venue' ref={eventVenueRef}/>
            <input type='text' placeholder='Description' ref={eventDiscriptionRef}/>
            <input type='submit'/>
        </form>
      </div>
    </div>
  )
}

export default AddEvents
