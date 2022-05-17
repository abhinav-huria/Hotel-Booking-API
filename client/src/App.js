import {Routes, Route} from 'react-router-dom';
import './App.css';
 import Home from './Components/Pages/Home/Home';
// import Login from './Components/Pages/SignIn/Login.js';
import Register from './Components/Pages/SignIn/Register.js';
import NavbarComponent from './Components/common/Navbar/Navbar';

function App() {
  return (
 
    <>
    <NavbarComponent />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      {/* <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/hotels/:city/:" element={<Hotels />} />
   <Route path="/hotels/view/:id" element={<HotelDetails />} /> */}
    </Routes>
    
    
    </>
  );
}

export default App;
