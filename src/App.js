import SignUp from './pages/SignUp';
import {Routes, Route} from "react-router-dom";
import MainNavigation from './components/MainNavigation';
import Home from './pages/Home';
import UpdateProfile from './components/UpdateProfile';
import ForgotPassword from './components/ForgotPassword';
import Expenses from './pages/Expenses';
function App() {
  return (
    <div>
      {/* <SignUp /> */}
      <MainNavigation />
      <Routes>
        <Route path="/home" element={<Home />} />
      
        <Route path="/login" element={<SignUp />} />
        <Route path="/update" element={<UpdateProfile />} />
        <Route path="/expense" element={<Expenses />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
      
    </div>
  );
}

export default App;
