import React, { useEffect, useRef, useState } from 'react'
import { storage,db } from '../../firebase';
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAuth } from '../../contexts/AuthContext';
import HeaderDashboard from '../HeaderDashboard';
import FooterDashboard from '../FooterDashboard';
import './updateprofile.css';


function UpdateProfile() {
    const nameRef = useRef()
    const [file,setFile] = useState("")
    const [ image, setImage] = useState("")
    const [ error,setError ] = useState()
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
                      setImage(downloadURL);
                    });
                  }
                ); 
        }
        file && uploadFile()
    },[file])

    async function handleUpdate(e){
        e.preventDefault()

        console.log(currentUser.email)
        try{
            setError("")
            await updateDoc(doc(db,"Users",currentUser.uid), {
                userName:nameRef.current.value,
                profilePic:image
              });
              alert("data added")
              window.location.reload()
        }catch(r){
            console.log(r)
            console.log(error)
        }

    }

  return (
      <div>
        <HeaderDashboard/>
        <div className='UP-container'> 
            {/* <Header/> */}
            <div className='error'>
                {error && <span>{error}</span>}
            </div>
            <div className='UP-form-signup'>
                    <form onSubmit={handleUpdate}>
                        <h1>Update Profile</h1>
                        <br/>
                        <tbody>
                            <tr>
                                <td className='UP-form-td'><label className='name'>Name</label></td>
                                <td className='UP-form-td'><input type='text' placeholder='Name' ref={nameRef} /></td>
                            </tr>
                            <tr>
                                <td className='UP-form-td'><lable className='profile_pic'>Profile Picture</lable></td>
                                <td className='UP-form-td'><input type='file'id='file' onChange={(e) => setFile(e.target.files[0])}/></td>
                            </tr>
                        </tbody>
                        {loading===100 && <span>image uploaded</span>}
                        <br/>
                        <button dissabled={loading !==null && loading<100 }>Update</button>
                        <br/>
                    </form>
            </div>
        </div>
        <FooterDashboard/>
        </div>
  )
}

export default UpdateProfile

