import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  getDoc,
  query,
  orderBy,
} from "firebase/firestore";

import HeaderDashboard from "../HeaderDashboard";
import FooterDashboard from "../FooterDashboard";

import "./Assignment.css"; 

function Assignment() {
  const { currentUser } = useAuth();
  const [userType, setUserType] = useState();
  const [documents, setDocuments] = useState([]);

  // get user type
  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "Users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserType(docSnap.data().userType);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [currentUser.uid]);

  // fetch data from db
  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(
          query(collection(db, "Assignments"), orderBy("assignmentDue"))
        );
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setDocuments(list);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const assignment = documents?.map(
    (
      {
        assignmentName,
        assignmentDue,
        assignmetDescription,
        assignmentFile,
        assignmetId,
      },
      index
    ) => {
      return (
        <AssignmentLayout
          key={index}
          assignmentName={assignmentName}
          assignmentDue={assignmentDue}
          assignmetDescription={assignmetDescription}
          assignmentFile={assignmentFile}
          assignmetId={assignmetId}
        />
      );
    }
  );

return (
  <div className="assignment-page-container">
    <HeaderDashboard />
    {userType === "teacher" && (
      <Link to="/add-assignment" className="add-assignment-link">
        Add Assignment
      </Link>
    )}
    <div className="assignment-list">{assignment}</div>
    <FooterDashboard />
  </div>
);
    }

function AssignmentLayout({
  assignmentName,
  assignmentDue,
  assignmetDescription,
  assignmentFile,
  assignmetId,
}) {
  const { currentUser } = useAuth();
  const [userType, setUserType] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "Users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserType(docSnap.data().userType);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [currentUser.uid]);

  async function deleteAssignment(e) {
    e.preventDefault();
    try {
      await deleteDoc(doc(db, "Assignments", assignmetId));
      alert("Assignment Removed");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="assignment-component">
      <table>
        <tbody>
          <tr>
            <th>
              <h3>{assignmentName}</h3>
            </th>
            <td>
              <p>{assignmentDue}</p>
            </td>
          </tr>
        </tbody>
      </table>
      <p className="description">{assignmetDescription}</p>
      <br />
      {assignmentFile !== "" && (
        <div className="file-link">
          <span>
            <Link to={assignmentFile} target="_blank">
              {assignmentName}
            </Link>
          </span>
        </div>
      )}
      {userType === "teacher" && (
        <div className="delete-button">
          <br />
          <span>
            <button onClick={deleteAssignment}>Delete</button>
          </span>
        </div>
      )}
    </div>
  );
}

export default Assignment;
