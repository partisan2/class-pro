import React, { useRef, useState,useEffect } from 'react'
import HeaderDashboard from '../HeaderDashboard'
import FooterDashboard from '../FooterDashboard'
import { storage,db } from '../../firebase';
import { doc, setDoc,serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAuth } from '../../contexts/AuthContext';

function AddAssignment() {
    const assignmentNameRef = useRef()
    const assignmentDueRef = useRef()
    const assignmetDescriptionRef = useRef()
    const [ assignmentFile,setAssignmentFile ] = useState("")
    const [file,setFile] = useState("")
    const [ loading, setLoading ] =useState(null)
    const { currentUser } = useAuth()

    useEffect(()=>{
        const uploadFile = () =>{
            const name = new Date().getTime()+file.name
            console.log(name)
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed', 
                (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setLoading(progress)
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                    }
                },(error) => {
                    // Handle unsuccessful uploads
                  }, 
                  () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    //   console.log('File available at', downloadURL);
                      setAssignmentFile(downloadURL);
                    });
                  }
                ); 
        }
        file && uploadFile()
    },[file])

    async function handleSubmit(e){
        e.preventDefault()
        try{
            const id = currentUser.uid+(new Date().getTime().toString())
            await setDoc(doc(db, "Assignments", id), {
                assignmetId:id,
                assignmentName:assignmentNameRef.current.value,
                assignmentDue:assignmentDueRef.current.value,
                assignmetDescription:assignmetDescriptionRef.current.value,
                assignmentFile:assignmentFile,
                timeStamp: serverTimestamp()
            });
            alert("data added")
            console.log("dump");
            window.location.reload()
        }catch(r){
            console.log(r)
        }
    }

  return (
    <div>
      <HeaderDashboard/>
        <div className='form'>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Assignment Name' ref={assignmentNameRef}/>
                <input type='date' placeholder='Due Date' ref={assignmentDueRef}/>
                <input type='text' placeholder='Assignment Description' ref={assignmetDescriptionRef}/>
                <input type='file' id='file' onChange={(e) => setFile(e.target.files[0])}/>
                {loading===100 && <span>uploadcompleted</span>}
                <button dissabled={loading !==null && loading<100 }>Update</button>
            </form>
        </div>
      <FooterDashboard/>
    </div>
  )
}

export default AddAssignment
