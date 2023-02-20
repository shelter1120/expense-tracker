import SignUp from './pages/SignUp';
import {Routes, Route} from "react-router-dom";
import MainNavigation from './components/MainNavigation';
import Home from './pages/Home';
function App() {
  return (
    <div>
      {/* <SignUp /> */}
      <MainNavigation />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<SignUp />} />

      </Routes>
      
    </div>
  );
}

export default App;
