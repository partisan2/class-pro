import React, { useRef, useState } from 'react'
import HeaderDashboard from '../HeaderDashboard'
import FooterDashboard from '../FooterDashboard'
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';



function AddReport() {
    const { currentUser } = useAuth()
    const subject01Ref = useRef()
    const subject02Ref = useRef()
    const subject03Ref = useRef()
    const subject04Ref = useRef()
    const subject05Ref = useRef()
    const subject01resultRef = useRef()
    const subject02resultRef = useRef()
    const subject03resultRef = useRef()
    const subject04resultRef = useRef()
    const subject05resultRef = useRef()
    const studentNameRef = useRef()
    const studentIdRef = useRef()
    const [ totalResult,setTotalResult ] = useState()
    const [ averageResult,setAverage ] = useState()

    async function handleSubmit(e){
        e.preventDefault()
        function calculateAverage(){
            const total = (
                parseInt(subject01resultRef.current.value)+parseInt(subject02resultRef.current.value)+parseInt(subject03resultRef.current.value)+parseInt(subject04resultRef.current.value)+parseInt(subject05resultRef.current.value))
            const average = total/5
            setTotalResult(total)
            setAverage(average)
            console.log(totalResult)
        }
        try{
            const id = currentUser.uid+(new Date().getTime().toString())
            // console.log(id)
            calculateAverage()
            await setDoc(doc(db, "ReportSheets", id), {
                resultId:id,
                studentName:studentNameRef.current.value,
                studentId:studentIdRef.current.value,
                subject01:subject01Ref.current.value,
                subject01result:subject01resultRef.current.value,
                subject02:subject02Ref.current.value,
                subject02result:subject02resultRef.current.value,
                subject03:subject03Ref.current.value,
                subject03result:subject03resultRef.current.value,
                subject04:subject04Ref.current.value,
                subject04result:subject04resultRef.current.value,
                subject05:subject05Ref.current.value,
                subject05result:subject05resultRef.current.value,
                studentAverageResult:averageResult,
                studentTotalResult:totalResult,
                timeStamp: serverTimestamp()
            });
            alert("data added")
            window.location.reload()
            // console.log("dump");

        }catch(r){console.log(r)}

    }

    
  return (
    <div>
      <HeaderDashboard/>
        <div className='result-component'>
            <form onSubmit={handleSubmit}>
                <table>
                    <h3>Result Sheet</h3>
                    <tr>
                        <td><lable>Student Name</lable></td>
                        <td><input type='text' placeholder='Student Name' ref={studentNameRef}/></td>
                    </tr>
                    <tr>
                        <td><lable>Student Id</lable></td>
                        <td><input type='text' placeholder='Student Id' ref={studentIdRef}/></td>
                    </tr>
                    <tr>
                        <td><input type='text' placeholder='Subject 01' ref={subject01Ref} /></td>
                        <td><input type='number' placeholder='Result' ref={subject01resultRef}/></td>
                    </tr>
                    <tr>
                        <td><input type='text' placeholder='Subject 02' ref={subject02Ref} /></td>
                        <td><input type='number' placeholder='Result' ref={subject02resultRef}/></td>
                    </tr>
                    <tr>
                        <td><input type='text' placeholder='Subject 03' ref={subject03Ref} /></td>
                        <td><input type='number' placeholder='Result' ref={subject03resultRef}/></td>
                    </tr>
                    <tr>
                        <td><input type='text' placeholder='Subject 04' ref={subject04Ref} /></td>
                        <td><input type='number' placeholder='Result' ref={subject04resultRef}/></td>
                    </tr>
                    <tr>
                        <td><input type='text' placeholder='Subject 05' ref={subject05Ref} /></td>
                        <td><input type='number' placeholder='Result' ref={subject05resultRef}/></td>
                    </tr>
                </table>
                <input type='submit' />
            </form>
        </div>
      <FooterDashboard/>
    </div>
  )
}

export default AddReport
