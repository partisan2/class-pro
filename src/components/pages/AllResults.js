import React,{useState,useEffect} from 'react'
import { db } from '../../firebase'
import { getDocs,collection,query,doc,getDoc } from "firebase/firestore";
import ResultSheetLayout from './ResultSheetLayout';
import { useAuth } from '../../contexts/AuthContext'
import HeaderDashboard from '../HeaderDashboard';
import FooterDashboard from '../FooterDashboard';

function AllResults() {
    const [ documents,setDocuments ] = useState([])
    const {currentUser} = useAuth();
    const [ userType, setUserType ] =useState()
    //fetch data from db
  useEffect(()=>{
    const fetchData = async () =>{
      let list = []
      try{
        const querySnapshot = await getDocs(query(collection(db, "ReportSheets")));
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
  },[])

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
      {userType === "teacher" && report}
      <FooterDashboard/>
    </div>
  )
}

export default AllResults
