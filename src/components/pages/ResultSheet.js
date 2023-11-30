import React, { useState,useEffect } from 'react'
import HeaderDashboard from '../HeaderDashboard'
import FooterDashboard from '../FooterDashboard'
import { db } from '../../firebase'
import { getDocs,collection,query,doc,getDoc,where } from "firebase/firestore";
import { useAuth } from '../../contexts/AuthContext'



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

function ResultSheetLayout({studentId,studentName,subject01,subject01result,subject02,subject02result,
    subject03,subject03result,subject04,subject04result,subject05,subject05result}){
    return(
        <div className='report'>
            <table>
                    <h3>Result Sheet</h3>
                    <tr>
                        <td><p>Student Name</p></td>
                        <td><p>{studentName}</p></td>
                    </tr>
                    <tr>
                        <td><p>Student Id</p></td>
                        <td><p>{studentId}</p></td>
                    </tr>
                    <tr>
                        <td><p>{subject01}</p></td>
                        <td><p>{subject01result}</p></td>
                    </tr>
                    <tr>
                        <td><p>{subject02}</p></td>
                        <td><p>{subject02result}</p></td>
                    </tr>
                    <tr>
                        <td><p>{subject03}</p></td>
                        <td><p>{subject03result}</p></td>
                    </tr>
                    <tr>
                        <td><p>{subject04}</p></td>
                        <td><p>{subject04result}</p></td>
                    </tr>
                    <tr>
                        <td><p>{subject05}</p></td>
                        <td><p>{subject05result}</p></td>
                    </tr>
            </table>
      </div>
    )
}

export default ResultSheet
