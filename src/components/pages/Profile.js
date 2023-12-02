// Import React and other necessary libraries
import React, { useState, useEffect } from 'react';
import HeaderDashboard from '../HeaderDashboard';
import FooterDashboard from '../FooterDashboard';
import LogOut from './LogOut';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

// Internal styles for the profile page
const styles = {
  pageContainer: {
    background: 'linear-gradient(to right bottom, #b9acee, #d694c8, #cf96a6, #e7c0b6, #ebd3b0, #F9F871)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  contentContainer: {
    flex: 1,
    padding: '20px',
    maxWidth: '400px',
    margin: 'auto',
    backgroundColor: '#FCF3E4', // Add transparent white background color
    borderRadius: '10px',
    display: 'flex',           // Use flexbox to center content
    flexDirection: 'column',   // Column layout
    alignItems: 'center',      // Center content vertically
    justifyContent: 'center',  // Center content horizontally
    
  },
  userDetails: {
    display: 'grid',
    gridTemplateColumns: 'max-content 1fr', // First column for labels, second column for details
    gridGap: '10px',
    margin: '10px 0',
    width: '400px', // Customize width of the square
    height: '50px', // Customize height of the square
  },

  label: {
    fontWeight: 'bold',
    //marginRight: '10px',
  },

  userDetailSpan: {
    display: 'flex',
    alignItems: 'left', // Align content vertically
  },

  link: {
    textDecoration: 'none',
    color: 'blue',
    marginRight: '10px',
  },
};

function Profile() {
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userType, setUserType] = useState();
  const [userId, setUserID] = useState();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'Users', currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserName(docSnap.data().userName);
          setUserEmail(docSnap.data().email);
          setUserType(docSnap.data().userType);
          setUserID(docSnap.data().userId);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentUser.uid]);

  return (
    <div style={styles.pageContainer}>
      <HeaderDashboard />
      <div style={styles.contentContainer}>
        <h2>User Details</h2>
        <div style={styles.userDetails}>
          <label style={styles.label}>User Name:</label>
          <span style={styles.userDetailSpan} >{userName}</span>
        </div>
        <div style={styles.userDetails}>
          <label style={styles.label}>User Email:</label>
          <span style={styles.userDetailSpan} >{userEmail}</span>
        </div>
        <div style={styles.userDetails}>
          <label style={styles.label}>User Type:</label>
          <span style={styles.userDetailSpan} >{userType}</span>
        </div>
        <div style={styles.userDetails}>
          <label style={styles.label}>User ID:</label>
          <span style={styles.userDetailSpan} >{userId}</span>
        </div>
        <div style={styles.userDetails}>
          <Link to='/update-profile' style={styles.link}>
            Update Profile
          </Link>
          <Link to='/update-password' style={styles.link}>
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
