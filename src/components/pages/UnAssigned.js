import React, { useState,useEffect } from 'react'
import { db } from '../../firebase'
import { getDocs,collection,query,where,doc,updateDoc } from "firebase/firestore";
import "./UnAssigned.css";



function UnAssigned() {
    const [ newUsers,setNewUsers] = useState()
    //get students
  //get all students
  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(
          query(collection(db, "Users"), where("userType", "==", ""))
        );
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          list.push({ id: doc.id, ...doc.data() });
        });
        setNewUsers(list);
        //   console.log(list)
      } catch (r) {
        console.log(r);
      }
    };
    fetchData();
  }, []);

  //---------object destruction
  const newUser = newUsers?.map(({ userName, email, userId,userDbId }, index) => {
    return (
      <UnAssignedUserLyout
        key={index}
        userName={userName}
        userId={userId}
        userDbId={userDbId}
        email={email}
      />
    );
  });
  
  return (
    <div>
      {newUser}
    </div>
  )
}

function UnAssignedUserLyout({userName,userId,email,userDbId}){
    async function handleSubmit(e){
        e.preventDefault()
        const type = document.getElementById("privilage").value
        try{
            await updateDoc(doc(db,"Users",userDbId), {
                userType:type
              });
              alert("data added")
              window.location.reload()
        }catch(r){
            console.log(r)
            
        }
    
    }
    return (
      <form onSubmit={handleSubmit} className='UA-form'>
        <tbody>
          <tr className='UA-tr'>
            <td className='UA-td'>{userId}</td>
            <td className='UA-td'>{userName}</td>
            <td className='UA-td'>{email}</td>
            <td className='UA-td'>
              <select name="privilage" id="privilage">
                <option value="">Choose</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="parent">Parent</option>
              </select>
            </td>
            <td className='UA-td'>
              <input type="submit" id="us-submit" />
            </td>
          </tr>
        </tbody>
        <hr />
      </form>
    );
}

export default UnAssigned
