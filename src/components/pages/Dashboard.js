import React, { useEffect, useState } from 'react'
import HeaderDashboard from '../HeaderDashboard'
import FooterDashboard from '../FooterDashboard'
import { db } from '../../firebase'
import { getDocs,collection,query,orderBy, where,doc,getDoc } from "firebase/firestore";
import { useAuth } from '../../contexts/AuthContext'
import "../Style.css"
import { Link } from 'react-router-dom';


function Dashboard() {
  const [ events,setEvents ] = useState([])
  const [ assignments,setAssignments ] = useState([])
  const {currentUser} = useAuth();
  const [ userType, setUserType ] =useState()
  const [ users,setUsers ] = useState()
  //---------fetch Data
  // get usertype
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
        
        const querySnapshot = await getDocs(query(collection(db, "Events"),where("eventDate",">=",currentDate),orderBy("eventDate")));
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
        console.log(currentDate)
        
        const querySnapshot = await getDocs(query(collection(db, "Assignments"),orderBy("assignmentDue")));
        querySnapshot.forEach((doc) => {
        list.push({ id : doc.id, assignmentName: doc.data().assignmentName,assignmentDue: doc.data().assignmentDue})
      });
      setAssignments(list)
      // console.log(list)

      }catch(r){console.log(r)}
    }
    fetchData()
  },[])

  //get all students
  useEffect(()=>{
    const fetchData = async () =>{
      let list = []
      try{
        const querySnapshot = await getDocs(query(collection(db, "Users"),where("userType","==","student")));
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        list.push({ id : doc.id ,...doc.data()})
      });
      setUsers(list)
    //   console.log(list)

      }catch(r){console.log(r)}
    }
    fetchData()
  },[])

  //---------object destruction
  const studentList = users?.map(({userName,email,userId},index)=>{
    return <StudentListLayout
    key={index}
    userName={userName}
    userId={userId}
    email={email}
    />
  })

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
        <div className='banner'>
          <img className='banner-img' src='https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt=''/>
        </div>
        <div>
          <div className='upcming-act'>
            <span className='upcming-name'>Upcoming Assignments</span>
            {upcomingAssignments}
            <span><Link to='/assignments'>Assignments</Link></span>
          </div>
          <br/>
          {/* upcoming event */}
          <div className='upcming-event'>
            <span className='upcming-name'>Upcoming Events</span>
            {upcomingEvent}
            <span><Link to='/events'>Events</Link></span>
          </div>
        </div>
      </div>
      {userType === "teacher" && 
      <div className='teacher-function'>
        <span><Link to='/add-result'>Add Result</Link></span>
        <span><Link to='/all-results'>All Result</Link></span>
        <span><Link to='/add-assignment'>Add assignment</Link></span>
        <span><Link to='/add-events'>Add Events</Link></span>
      </div>
      }
      {userType === "teacher" && 
      <div className='student-list'>
        <h3>student list</h3>
        {studentList}
      </div>}
      <FooterDashboard/>
    </div>
  )
}


//-------------- Layouts----------------------------------
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
      <tbody>
      <tr>
        <th>{assignmentName}</th>
      </tr>
      <tr>
        <td>{assignmentDue}</td>
      </tr>
      </tbody>
    </table>
  )
}

function StudentListLayout({userName,email,userId}){
  return(
    <div>
    <table>
      <tbody>
        <tr>
          <td><p>{userId}</p></td>
          <td><p>{email}</p></td>
          <td><p>{userName}</p></td>
        </tr>
      </tbody>
    </table>
    </div>
  )
}


export default Dashboard
