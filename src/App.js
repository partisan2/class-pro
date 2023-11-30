import Dashboard from "./components/pages/Dashboard";
import LogIn from "./components/pages/LogIn";
import SignUp from "./components/pages/SignUp";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import PrivateRout from "./components/PrivateRout";
import ForgotPassword from "./components/pages/ForgotPassword";
import UpdatePsswrd from "./components/pages/UpdatePsswrd";
import UpdateProfile from "./components/pages/UpdateProfile";
import Events from "./components/pages/Events";
import Messenger from "./components/Messenger";
import Profile from "./components/pages/Profile";
import AddEvents from "./components/pages/AddEvents";
import Assignment from "./components/pages/Assignment";
import AddAssignment from "./components/pages/AddAssignment";
import AboutUs from "./components/pages/AboutUs";
import Contact from "./components/pages/Contact";
import AddReport from "./components/pages/AddReport";
import ResultSheet from "./components/pages/ResultSheet";
import AllResults from "./components/pages/AllResults";




function App() {
  return (
    <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<PrivateRout><Dashboard/></PrivateRout>}/>
            <Route path="/update-password" element={<PrivateRout><UpdatePsswrd/></PrivateRout>}/>
            <Route path="/update-profile" element={<PrivateRout><UpdateProfile/></PrivateRout>}/>
            <Route path="/events" element={<PrivateRout><Events/></PrivateRout>}/>
            <Route path="/messenger" element={<PrivateRout><Messenger/></PrivateRout>}/>
            <Route path="/profile" element={<PrivateRout><Profile/></PrivateRout>}/>
            <Route path="/add-events" element={<PrivateRout><AddEvents/></PrivateRout>}/>
            <Route path="/assignments" element={<PrivateRout><Assignment/></PrivateRout>}/>
            <Route path="/add-assignment" element={<PrivateRout><AddAssignment/></PrivateRout>}/>
            <Route path="/aboutus" element={<PrivateRout><AboutUs/></PrivateRout>}/>
            <Route path="/contact" element={<PrivateRout><Contact/></PrivateRout>}/>
            <Route path="/add-result" element={<PrivateRout><AddReport/></PrivateRout>}/>
            <Route path="/result-sheet" element={<PrivateRout><ResultSheet/></PrivateRout>}/>
            <Route path="/all-results" element={<PrivateRout><AllResults/></PrivateRout>}/>
            <Route path="/signup" Component={SignUp}/>
            <Route path="/login" Component={LogIn}/>
            <Route path="/forgot-password" Component={ForgotPassword}/>
          </Routes>
        </AuthProvider>
    </Router>
  );
}

export default App;
