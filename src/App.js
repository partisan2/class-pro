import Dashboard from "./components/Dashboard";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import PrivateRout from "./components/PrivateRout";
import ForgotPassword from "./components/ForgotPassword";
import UpdatePsswrd from "./components/UpdatePsswrd";
import UpdateProfile from "./components/UpdateProfile";

function App() {
  return (
    <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<PrivateRout><Dashboard/></PrivateRout>}/>
            <Route path="/update-password" element={<PrivateRout><UpdatePsswrd/></PrivateRout>}/>
            <Route path="/update-profile" element={<PrivateRout><UpdateProfile/></PrivateRout>}/>
            <Route path="/signup" Component={SignUp}/>
            <Route path="/login" Component={LogIn}/>
            <Route path="/forgot-password" Component={ForgotPassword}/>
          </Routes>
        </AuthProvider>
    </Router>
  );
}

export default App;
