import SignUp from './pages/SignUp';
import {Routes, Route} from "react-router-dom";
import MainNavigation from './components/MainNavigation';
import Home from './pages/Home';
import UpdateProfile from './components/UpdateProfile';
import ForgotPassword from './components/ForgotPassword';
import Expenses from './pages/Expenses';
import Premium from './components/Premium';
import { useSelector } from 'react-redux';

function App() {
 const themeMode = useSelector((state)=>state.theme.theme)
  return (
    <div>
      {/* <SignUp /> */}
      <MainNavigation />
      <div className={themeMode === 'dark' ? 'dark':''}>
      <Routes>
        <Route path="/home" element={<Home />} />
      
        <Route path="/login" element={<SignUp />} />
        <Route path="/update" element={<UpdateProfile />} />
        <Route path="/expense" element={<Expenses />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
