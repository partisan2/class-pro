import React, { useContext, useState } from 'react'
import {db} from '../../firebase'
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp,getDoc } from "firebase/firestore";
import {useAuth} from '../../contexts/AuthContext'
import { ChatContext } from '../../contexts/ChatContext';


function Search() {
  const [ userName,setUsername] = useState("")
  const [ user,setUser ] = useState(null)
  const [ err,setErr ] = useState(false)
  const { currentUser } = useAuth()
  const { dispatch } = useContext(ChatContext)

  // console.log(currentUser.uid)

  const handleSearch = async () =>{
    const q = query(collection(db,"Users"),where("userName","==",userName))

    try{

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setUser(doc.data())
      });
    }catch(err){
      setErr(true)
    }
  }

  const handleKey = e=>{
    e.code === "Enter" && handleSearch()
  }

  const handleSelect = async () =>{
    
    const combinedID = 
    currentUser.uid > user.userDbId
    ? currentUser.uid + user.userDbId
    :user.userDbId+currentUser.uid;
    
    dispatch({type:"CHANGE_USER",payload:combinedID})
      // console.log(combinedID)

    try{
      const res = await getDoc(doc(db,"chats",combinedID))
      console.log('dump')
      if(!res.exists()){
        await setDoc(doc(db,"chats",combinedID),{messages:[]})
        // console.log('dump1')
        
        await updateDoc(doc(db,"UsersChats",currentUser.uid),{
          [combinedID+".userInfo"]:{
            uid:user.userDbId,
            userName:user.userName,
            profilePic:user.profilePic,
          },
          [combinedID+".date"]: serverTimestamp(),
        });
        // console.log(user.userDbId)
        await updateDoc(doc(db,"UsersChats",user.userDbId),{
          [combinedID+".userInfo"]:{
            uid:currentUser.uid,
            userName:currentUser.userName,
            profilePic:currentUser.profilePic,
          },
          [combinedID+".date"]: serverTimestamp(),
        });

        console.log('d');
      }
    }catch(r){}
    setUser(null)
    setUsername("")
  }
  
  return (
    <div className='search'>
      <div className='search-form'>
        <input type='text'placeholder='Find a User' onKeyDown={handleKey} onChange={e=>setUsername(e.target.value)} value={userName}/>
      </div>
      {err && <span>User Not Found</span>}
      {user && 
      <div className='userchat' onClick={handleSelect}>
        {/* {console.log(user.profilePic)} */}
        <img src={user.profilePic} alt=''/>
        <div className='uchatInfo'>
          <span className='s-span'><p>{user.userName}</p></span>
        </div>
      </div>
      }
    </div>
  )
}

export default Search
