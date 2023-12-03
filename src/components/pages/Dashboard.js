import React, { useEffect, useState } from "react";
import HeaderDashboard from "../HeaderDashboard";
import FooterDashboard from "../FooterDashboard";
import { db } from "../../firebase";
import {
  getDocs,
  collection,
  query,
  orderBy,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import "../Style.css";
import { Link } from "react-router-dom";
import DesignerImage from "./img/Designer.jpeg";
import AdminDashboard from "./AdminDashboard";

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const { currentUser } = useAuth();
  const [userType, setUserType] = useState();
  const [users, setUsers] = useState();
  //---------fetch Data
  // get usertype
  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "Users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // console.log("Document data:", docSnap.data().email);
          setUserType(docSnap.data().userType);
          // console.log(docSnap.data().profilePic)
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      } catch (r) {
        console.log(r);
      }
    };
    fetchData();
  }, [currentUser.uid]);
  // get ucoming events
  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const currentDate = `${year}-${month}-${day}`;
        // console.log(date)

        const querySnapshot = await getDocs(
          query(
            collection(db, "Events"),
            where("eventDate", ">=", currentDate),
            orderBy("eventDate")
          )
        );
        querySnapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            eventName: doc.data().eventName,
            eventDate: doc.data().eventDate,
            eventTime: doc.data().eventTime,
          });
        });
        setEvents(list);
        // console.log(list)
      } catch (r) {
        console.log(r);
      }
    };
    fetchData();
  }, []);

  // get assignments
  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const currentDate = `${year}-${month}-${day}`
        console.log(currentDate)

        const querySnapshot = await getDocs(
        query(collection(db, "Assignments"),orderBy("assignmentDue"))
        );
        querySnapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            assignmentName: doc.data().assignmentName,
            assignmentDue: doc.data().assignmentDue,
          });
        });
        setAssignments(list);
        // console.log(list)
      } catch (r) {
        console.log(r);
      }
    };
    fetchData();
  }, []);

  //get all students
  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(
          query(collection(db, "Users"), where("userType", "==", "student"))
        );
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          list.push({ id: doc.id, ...doc.data() });
        });
        setUsers(list);
        //   console.log(list)
      } catch (r) {
        console.log(r);
      }
    };
    fetchData();
  }, []);

  //---------object destruction
  const studentList = users?.map(({ userName, email, userId }, index) => {
    return (
      <StudentListLayout
        key={index}
        userName={userName}
        userId={userId}
        email={email}
      />
    );
  });

  const upcomingEvent = events?.map(
    ({ eventName, eventDate, eventTime }, index) => {
      return (
        <UpcomingEvent
          key={index}
          eventName={eventName}
          eventDate={eventDate}
          eventTime={eventTime}
        />
      );
    }
  );

  const upcomingAssignments = assignments?.map(
    ({ assignmentName, assignmentDue }, index) => {
      return (
        <UpcomingAssignment
          key={index}
          assignmentName={assignmentName}
          assignmentDue={assignmentDue}
        />
      );
    }
  );

  if(userType ==="admin"){
    return(
      <div>
        <AdminDashboard/>
      </div>
    )
  }
  if(userType !=="admin"){

    return (
      <div className="dashboard-wrapper">
        <HeaderDashboard />
        <div className="dashboard-container">
          <div className="banner">
            <img
              src={DesignerImage}
              alt="Designer"
              height="500px"
              width="500px"
            />
            {userType === "teacher" &&
              <div className="d-actions">
                <tbody>
                  <tr>
                    <td>
                      <Link to='add-events'>Add Events</Link>
                    </td>
                    <td>
                      <Link to='add-result'>Add Results</Link>
                    </td>
                    <td>
                      <Link to='add-assignment'>Add Assignment</Link>
                    </td>
                    <td>
                      <Link to='all-results'>See All Results</Link>
                    </td>
                  </tr>
                </tbody>
              </div>
            }
            {userType !== "teacher" &&
              <div className="d-actions">
                <span><Link to="/result-sheet">Results</Link></span>
              </div>
            }
          </div>
          <div>
            <div className="upcming-act">
              <span className="upcming-name">Upcoming Assignments</span>
              {upcomingAssignments}
              <span className="dashboard-button">
                <Link
                  to="/assignments"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Assignments
                </Link>
              </span>
            </div>
            <br />
            {/* upcoming event */}
            <div className="upcming-event">
              <span className="upcming-name">Upcoming Events</span>
              {upcomingEvent}
              <span className="dashboard-button">
                <Link
                  to="/events"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Events
                </Link>
              </span>
            </div>
          </div>
        </div>
        <hr/>
        {userType === "teacher" && (
          <div className="student-list">
            <h3>student list</h3>
            <table className="dash-st-list">
        <tbody>
          <tr className="dash-st-list-tr">
            <td className="dash-st-list-td-head">
              <p>Student ID</p>
            </td>
            <td className="dash-st-list-td-head">
              <p>Email</p>
            </td>
            <td className="dash-st-list-td-head">
              <p>Student Name</p>
            </td>
          </tr>
        </tbody>
      </table>
            {studentList}
          </div>
        )}
        <FooterDashboard />
      </div>
    );
  }
}

//-------------- Layouts----------------------------------
function UpcomingEvent({ eventName, eventDate, eventTime }) {
  return (
    <table className="dash-up-eve">
      <tbody>
      <tr className="dash-up-eve-tr">
        <th className="dash-up-eve-th">{eventName}</th>
        <th className="dash-up-eve-th">Time</th>
      </tr>
      <tr className="dash-up-eve-tr">
        <td className="dash-up-eve-td">{eventDate}</td>
        <td className="dash-up-eve-td">{eventTime}</td>
      </tr>
      </tbody>
    </table>
  );
}

function UpcomingAssignment({ assignmentName, assignmentDue }) {
  return (
    <table className="dash-up-act">
      <tbody>
        <tr className="dash-up-act-tr">
          <th>{assignmentName}</th>
        </tr>
        <tr className="dash-up-act-tr">
          <td>{assignmentDue}</td>
        </tr>
      </tbody>
    </table>
  );
}

function StudentListLayout({ userName, email, userId }) {
  return (
    <div>
      <table className="dash-st-list">
        <tbody>
          <tr className="dash-st-list-tr">
            <td className="dash-st-list-td">
              <p>{userId}</p>
            </td>
            <td className="dash-st-list-td">
              <p>{email}</p>
            </td>
            <td className="dash-st-list-td">
              <p>{userName}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
