import React, { useEffect, useState } from 'react'
import HeaderDashboard from '../HeaderDashboard'
import { Link } from 'react-router-dom'
import { db } from '../../firebase'
import { getDocs,collection,deleteDoc,doc,getDoc,query,orderBy } from "firebase/firestore";
import { useAuth } from '../../contexts/AuthContext'
import FooterDashboard from '../FooterDashboard';



function Events() {
  const [ documents,setDocuments ] = useState([])
  const {currentUser} = useAuth();
  const [ userType, setUserType ] =useState()

  useEffect(()=>{
    const fetchData = async () =>{
      let list = []
      try{
        const querySnapshot = await getDocs(query(collection(db, "Events"),orderBy("eventDate")));
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

  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const docRef = doc(db, "Users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          // console.log("Document data:", docSnap.data().email);
          setUserType(docSnap.data().userType)
          // console.log(docSnap.data().profilePic)
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      }catch(r){console.log(r)}
    }
    fetchData()
  },[currentUser.uid])

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
        {userType === "teacher" && <Link to='/add-events'>Add Events</Link>}
        <div className='block'>
          {event}
        </div>
      <FooterDashboard/>
    </div>
  )
}

function EventLayout({eventName,eventDate,eventTime,eventVenue,eventDiscription,eventId}){
  const {currentUser} = useAuth();
  const [ userType, setUserType ] =useState()                                     

  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const docRef = doc(db, "Users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          // console.log("Document data:", docSnap.data().email);
          setUserType(docSnap.data().userType)
          // console.log(docSnap.data().profilePic)
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      }catch(r){console.log(r)}
    }
    fetchData()
  },[currentUser.uid])

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
      <br/>
      <div>
        <p>Event Date : {eventDate}</p>
        <p>Event Time : {eventTime}</p>
        <p>Event Venue : {eventVenue}</p>
        <p>Event Discription : {eventDiscription}</p>
      </div>
      {userType === "teacher" && 
      <div>
        <br/>
        <span><button onClick={deleteEvent}>Delete</button></span>
      </div>}
    </div>
  );
}

export default Events
