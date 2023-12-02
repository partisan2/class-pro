// Import React and other necessary libraries
import React, { useState, useEffect } from "react";
import HeaderDashboard from "../HeaderDashboard";
import FooterDashboard from "../FooterDashboard";
import LogOut from "./LogOut";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import "./profile.css";

function Profile() {
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userType, setUserType] = useState();
  const [userId, setUserID] = useState();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "Users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserName(docSnap.data().userName);
          setUserEmail(docSnap.data().email);
          setUserType(docSnap.data().userType);
          setUserID(docSnap.data().userId);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentUser.uid]);

  return (
    <div>
      <HeaderDashboard />
      <div className="pp-contentContainer">
        <h2>User Details</h2>
        <tbody>
          <tr className="pp-userDetails">
            <td>
              <label className="pp-label">User Name:</label>
            </td>
            <td>
              <span className="pp-userDetailSpan">{userName}</span>
            </td>
          </tr>
          <tr className="pp-userDetails">
            <td>
              <label className="pp-label">User Email:</label>
            </td>
            <td>
              <span className="pp-userDetailSpan">{userEmail}</span>
            </td>
          </tr>
          <tr className="pp-userDetails">
            <td>
              <label className="pp-label">User Type:</label>
            </td>
            <td>
              <span className="pp-userDetailSpan">{userType}</span>
            </td>
          </tr>
          <tr className="pp-userDetails">
            <td>
              <label className="pp-label">User ID:</label>
            </td>
            <td>
              <span className="pp-userDetailSpan">{userId}</span>
            </td>
          </tr>
        </tbody>
        <div className="pp-userDetails" id="pp-userDetailsid">
          <Link to="/update-profile" className="pp-link">
            Update Profile
          </Link>
          <Link to="/update-password" className="pp-link">
            Update Password
          </Link>
        </div>
        <LogOut />
      </div>
      <FooterDashboard />
    </div>
  );
}

export default Profile;
