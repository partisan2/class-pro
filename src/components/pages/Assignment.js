import React,{ useState,useEffect} from 'react'
import HeaderDashboard from '../HeaderDashboard'
import FooterDashboard from '../FooterDashboard'
import { db } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import { getDocs,collection,deleteDoc,doc,getDoc,query,orderBy } from "firebase/firestore";
import { Link } from 'react-router-dom'





function Assignment() {
    const {currentUser} = useAuth();
    const [ userType, setUserType ] =useState()
    const [ documents,setDocuments ] = useState([])
    
    // get user type
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
    
    //fetch data from db
    useEffect(()=>{
        const fetchData = async () =>{
          let list = []
          try{
            const querySnapshot = await getDocs(query(collection(db, "Assignments"),orderBy("assignmentDue")));
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            list.push({ id : doc.id ,...doc.data()})
          });
          setDocuments(list)
          console.log(list)
    
          }catch(r){console.log(r)}
        }
        fetchData()
      },[])

      const assignment = documents?.map(({assignmentName,assignmentDue,assignmetDescription,assignmentFile,assignmetId},index)=>{
        return <AssignmentLayout
            key={index}
            assignmentName={assignmentName}
            assignmentDue={assignmentDue}
            assignmetDescription={assignmetDescription}
            assignmentFile={assignmentFile}
            assignmetId={assignmetId}
            />
      })

  return (
    <div>
      <HeaderDashboard/>
      {userType === "teacher" && <Link to='/add-assignment'>Add Assignment</Link>}
      <div>
        {assignment}
      </div>
      <FooterDashboard/>
    </div>
  )
}

function AssignmentLayout({assignmentName,assignmentDue,assignmetDescription,assignmentFile,assignmetId}){
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

  async function deleteAssignment(e){
    e.preventDefault()
    try{
      await deleteDoc(doc(db, "Assignments",assignmetId))
      alert("Assignment Removed")
      window.location.reload()
    }catch(r){}
  }
    return(
        <div className='assignment-component'>
            <h3>{assignmentName}</h3>
            <br/>
            <div>
                <p>Due Date:{assignmentDue}</p>
                <p>Description:{assignmetDescription}</p>
                <span><Link to={assignmentFile} target='blank'>file</Link></span>
            </div>
            {userType === "teacher" && 
                <div>
                    <br/>
                    <span><button onClick={deleteAssignment}>Delete</button></span>
                </div>}
        </div>
    )
}

export default Assignment
