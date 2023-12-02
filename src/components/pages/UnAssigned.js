import React, { useState,useEffect } from 'react'
import { db } from '../../firebase'
import { getDocs,collection,query,where } from "firebase/firestore";


function UnAssigned() {
    const [ users,setUsers] = useState()
    //get students
  useEffect(()=>{
    const fetchData = async () =>{
      let list = []
      try{
        const querySnapshot = await getDocs(query(collection(db, "Users"),where("userType","==","")));
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        list.push({ id : doc.id , userName:doc.data().userName,email:doc.data().email, userId:doc.data().userId})
      });
      setUsers(list)
      console.log(list)

      }catch(r){console.log(r)}
    }
    fetchData()
  },[])
  return (
    <div>
      
    </div>
  )
}

export default UnAssigned
