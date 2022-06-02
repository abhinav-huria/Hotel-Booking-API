import { Routes, Route } from "react-router-dom";

import Home from "./Components/Pages/Home/Home";
import Login from "./Components/Pages/SignIn/Login.js";
import Register from "./Components/Pages/SignIn/Register.js";
import NavbarComponent from "./Components/common/Navbar/Navbar";
import Hotels from "./Components/common/Hotel/Hotels";
import Hotel from "./Components/common/Hotel/Hotel";
import Book from "./Components/common/Book/Book";
import Booking from "./Components/common/Book/Booking";
import ProtectedRoute from "./Components/common/ProtectedRoute/ProtectedRoute";
import MyBookings from "./Components/Pages/User/MyBookings";
import ProtectedRouteAdmin from "./Components/common/ProtectedRoute/ProtectedRouteAdmin";
import Dashboard from "./Components/Pages/Admin/Dashboard";
import ProtectedRouteHotelOwner from "./Components/common/ProtectedRoute/ProtectedRouteHotelOwner";
import AddHotels from "./Components/Pages/Admin/AddHotels";
import AddRoom from "./Components/Pages/Admin/AddRoom";
import Help from "./Components/Pages/Help/Help";

import "./App.css";

function App() {
  return (
    <>
      <div className="common-container">
        <NavbarComponent />
        <Routes>
          <Route  path="/" element={<Home />} />
          <Route  path="/signup" element={<Register />} />
          <Route  path="/login" element={<Login />} />
          <Route  path="/hotels" element={<Hotels />} />
          <Route  path="/viewhotel" element={<Hotel />} />
          <Route  path="/bookRoom" element={<Book />} />
          <Route  path="/booking/:id" element={<ProtectedRoute />}>
            <Route  path="/booking/:id" element={<Booking />} />
          </Route>
          <Route  path="/mybookings" element={<ProtectedRoute />}>
            <Route  path="/mybookings" element={<MyBookings />} />
          </Route>
          <Route  path="/dashboard" element={<ProtectedRouteAdmin />}>
            <Route  path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route
            
            path="/hotelconsole"
            element={<ProtectedRouteHotelOwner />}
          >
            <Route  path="/hotelconsole" element={<Dashboard />} />
          </Route>
          <Route  path="/addhotel" element={<ProtectedRouteHotelOwner />}>
            <Route  path="/addhotel" element={<AddHotels />} />
          </Route>
          <Route
            
            path="/addroom/:hotelId"
            element={<ProtectedRouteHotelOwner />}
          >
            <Route  path="/addroom/:hotelId" element={<AddRoom />} />
          </Route>
          <Route  path="/help" element={<ProtectedRoute />}>
            <Route  path="/help" element={<Help />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
