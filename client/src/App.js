import { useContext } from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css';
 import Home from './Components/Pages/Home/Home';
import Login from './Components/Pages/SignIn/Login.js';
import Register from './Components/Pages/SignIn/Register.js';
import NavbarComponent from './Components/common/Navbar/Navbar';
import Hotels from './Components/common/Hotel/Hotels';
import Hotel from './Components/common/Hotel/Hotel';
import Book from './Components/common/Book/Book';
import Booking from './Components/common/Book/Booking';
function App() {

  return (
 
    <>

    <NavbarComponent />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Register />} />
       <Route path="/login" element={<Login />} />
       <Route path="/hotels" element={<Hotels />} />
       <Route path="/viewhotel" element={<Hotel />} />
       <Route path="/bookRoom" element={<Book />} />
       <Route path="/booking/:id" element={<Booking />} />
      {/* <Route path="/about" element={<About />} /> 
      <Route path="/hotels/:city/:" element={<Hotels />} />
   <Route path="/hotels/view/:id" element={<HotelDetails />} /> */}
    </Routes>
  
    </>
  );
}

export default App;
