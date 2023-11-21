import Dashboard from "./components/Dashboard";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import PrivateRout from "./components/PrivateRout";
import ForgotPassword from "./components/ForgotPassword";
import UpdatePsswrd from "./components/UpdatePsswrd";
import UpdateProfile from "./components/UpdateProfile";
import Subject from "./components/Subject";
import Events from "./components/Events";
import Messenger from "./components/Messenger";
import Profile from "./components/Profile";
import AddEvents from "./components/AddEvents";



function App() {
  return (
    <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<PrivateRout><Dashboard/></PrivateRout>}/>
            <Route path="/update-password" element={<PrivateRout><UpdatePsswrd/></PrivateRout>}/>
            <Route path="/update-profile" element={<PrivateRout><UpdateProfile/></PrivateRout>}/>
            <Route path="/subject" element={<PrivateRout><Subject/></PrivateRout>}/>
            <Route path="/events" element={<PrivateRout><Events/></PrivateRout>}/>
            <Route path="/messenger" element={<PrivateRout><Messenger/></PrivateRout>}/>
            <Route path="/profile" element={<PrivateRout><Profile/></PrivateRout>}/>
            <Route path="/add-events" element={<PrivateRout><AddEvents/></PrivateRout>}/>
            <Route path="/signup" Component={SignUp}/>
            <Route path="/login" Component={LogIn}/>
            <Route path="/forgot-password" Component={ForgotPassword}/>
          </Routes>
        </AuthProvider>
    </Router>
  );
}

export default App;
