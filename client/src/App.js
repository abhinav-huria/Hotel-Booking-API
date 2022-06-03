import { Routes, Route} from "react-router-dom";

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
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/hotels" element={<Hotels />} />
          <Route exact path="/viewhotel" element={<Hotel />} />
          <Route exact path="/bookRoom" element={<Book />} />
          <Route exact path="/booking/:id" element={<ProtectedRoute />}>
            <Route exact path="/booking/:id" element={<Booking />} />
          </Route>
          <Route exact path="/mybookings" element={<ProtectedRoute/>}>
            <Route exact path="/mybookings" element={<MyBookings />} />
          </Route>
          <Route exact path="/dashboard" element={<ProtectedRouteAdmin />}>
            <Route exact path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route
            exact
            path="/hotelconsole"
            element={<ProtectedRouteHotelOwner />}
          >
            <Route exact path="/hotelconsole" element={<Dashboard />} />
          </Route>
          <Route exact path="/addhotel" element={<ProtectedRouteHotelOwner />}>
            <Route exact path="/addhotel" element={<AddHotels />} />
          </Route>
          <Route
            
            path="/addroom/:hotelId"
            element={<ProtectedRouteHotelOwner />}
          >
            <Route exact path="/addroom/:hotelId" element={<AddRoom />} />
          </Route>
          <Route exact path="/help" element={<ProtectedRoute/>}>
            <Route exact path="/help" element={<Help />} />
          </Route>
          
        </Routes>
      </div>
    </>
  );
}

export default App;
