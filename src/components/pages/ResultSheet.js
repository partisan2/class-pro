import React, { useState,useEffect } from 'react'
import HeaderDashboard from '../HeaderDashboard'
import FooterDashboard from '../FooterDashboard'
import { db } from '../../firebase'
import { getDocs,collection,query,doc,getDoc,where } from "firebase/firestore";
import { useAuth } from '../../contexts/AuthContext'
import ResultSheetLayout from './ResultSheetLayout';



function ResultSheet() {
    const [ documents,setDocuments ] = useState([])
    const [ studentId,setStudentId ] = useState()
    const {currentUser} = useAuth();

    useEffect(()=>{
        const fetchData = async () =>{
          try{
            const docRef = doc(db, "Users", currentUser.uid);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
              // console.log("Document data:", docSnap.data().email);
              setStudentId(docSnap.data().userId)
              // console.log(docSnap.data().profilePic)
            } else {
              // docSnap.data() will be undefined in this case
              console.log("No such document!");
            }
          }catch(r){console.log(r)}
        }
        fetchData()
      },[currentUser.uid])
    //   console.log(studentId)

    //fetch data from db
  useEffect(()=>{
    const fetchData = async () =>{
      let list = []
      try{
        const querySnapshot = await getDocs(query(collection(db, "ReportSheets"),where("studentId","==",studentId)));
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        list.push({ id : doc.id ,...doc.data()})
      });
      setDocuments(list)
    //   console.log(list)

      }catch(r){console.log(r)}
    }
    fetchData()
  },[studentId])

  const report = documents?.map(({studentId,studentName,subject01,subject01result,subject02,subject02result,
    subject03,subject03result,subject04,subject04result,subject05,subject05result},index)=>{
        return <ResultSheetLayout 
        key={index}
        studentId={studentId}
        studentName={studentName}
        subject01={subject01}
        subject01result={subject01result}
        subject02={subject02}
        subject02result={subject02result}
        subject03={subject03}
        subject03result={subject03result}
        subject04={subject04}
        subject04result={subject04result}
        subject05={subject05}
        subject05result={subject05result}
        />
    })

  return (
    <div>
      <HeaderDashboard/>
        {report}
      <FooterDashboard/>
    </div>
  )
}




export default ResultSheet
