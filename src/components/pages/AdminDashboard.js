import React,{useEffect, useState} from 'react'
import { db } from '../../firebase'
import { getDocs,collection,query,where } from "firebase/firestore";
import UserListLayout from './UserListLayout';
import './admin.css'
import ContactUsForms from './ContactUsForms';
import UnAssigned from './UnAssigned';
import HeaderDashboard from '../HeaderDashboard';




function AdminDashboard() {
    const [ teacherList,setTeacherList ] = useState()
    const [ parentList,setParentList ] =useState()
    const [ studentList,setStudentList ] = useState()
    const [ forms,setForms ] = useState()
    

    
    //get all teacher
  useEffect(()=>{
    const fetchData = async () =>{
      let list = []
      try{
        const querySnapshot = await getDocs(query(collection(db, "Users"),where("userType","==","teacher")));
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        list.push({ id : doc.id ,...doc.data()})
      });
      setTeacherList(list)
    //   console.log(list)

      }catch(r){console.log(r)}
    }
    fetchData()
  },[])

  const teachers = teacherList?.map(({userName,email,userType},index)=>{
    return <UserListLayout
    key={index}
    userName={userName}
    email={email}
    userType={userType}
    />
  })

  //get parents
  useEffect(()=>{
    const fetchData = async () =>{
      let list = []
      try{
        const querySnapshot = await getDocs(query(collection(db, "Users"),where("userType","==","parent")));
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        list.push({ id : doc.id ,...doc.data()})
      });
      setParentList(list)
    //   console.log(list)

      }catch(r){console.log(r)}
    }
    fetchData()
  },[])

  const parents = parentList?.map(({userName,email,userType},index)=>{
    return <UserListLayout
    key={index}
    userName={userName}
    email={email}
    userType={userType}
    />
  })

  //get students
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
      setStudentList(list)
      console.log(list)

      }catch(r){console.log(r)}
    }
    fetchData()
  },[])

  const students = studentList?.map(({userName,email,userType},index)=>{
    return <UserListLayout
    key={index}
    userName={userName}
    email={email}
    userType={userType}
    />
  })

  //get all contact us dcuments
  useEffect(()=>{
    const fetchData = async () =>{
      let list = []
      try{
        const querySnapshot = await getDocs(query(collection(db, "Forms")));
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        list.push({ id : doc.id ,...doc.data()})
      });
      setForms(list)
      console.log(list)

      }catch(r){console.log(r)}
    }
    fetchData()
  },[])

  const form = forms?.map(({name,email,subject,message},index)=>{
    return <ContactUsForms
    key={index}
    name={name}
    email={email}
    subject={subject}
    message={message}
    />
  })

  return (
    <div className='ad-admin-dashboard'>
        <HeaderDashboard/>
        <section className='ad-container'>
          <div className='ad-user-list'>
            <div className='ad-teacher-list'>
                <h3>Teachers</h3>
              {teachers}
            </div>
            <div className='ad-parent-list'>
                <h3>Parents</h3>
              {parents}
            </div>
            <div className='ad-students-list'>
                <h3>Students</h3>
              {students}
            </div>
          </div>
          <hr/>
            <div className='ad-not-assigned-users'>
                <h3>Set Privillages</h3>
              <UnAssigned/>
            </div>
          <div className='ad-contact-us-messages'>
            <h3>User Messages</h3>
            {form}
          </div>
        </section>
      </div>
  )
}

export default AdminDashboard
