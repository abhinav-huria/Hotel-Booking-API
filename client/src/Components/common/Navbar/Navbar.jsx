import React, { useContext, useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { authContext } from "../../Context/authContext";
import { getUser } from "../../API/User.js";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

const NavbarComponent = () => {
  const { user } = useContext(authContext);
  const [userData, setUserData] = useState({});
  const { dispatch } = useContext(authContext);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
    getUser(user)
      .then((res) => {
        if (res.status === 200) {
          setIsLoggedIn(true);
          setUserData(res.data);
          localStorage.setItem("isAdmin", res.data.isAdmin);
          localStorage.setItem("isHotelOwner", res.data.isHotelOwner);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((err) => {
        setError(err);
      });
  }
else{
  setIsLoggedIn(false);
}}, [user]);


  const handleLogout = () => {
    localStorage.clear();
    localStorage.setItem("isAuthenticated", false);
    localStorage.setItem("isAdmin", false);
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  
  return (
    <Navbar
      collapseOnSelect
      expand="md"
      className="nav-bg"
      bg="light"
      variant="light"
    >
      <Navbar.Brand href="/">Ôtel</Navbar.Brand>
      <Navbar.Brand href="/v1/api-docs">API DOCS</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/help">Help</Nav.Link>
        </Nav>
        <Nav className="myacc">
          {userData?.isHotelOwner ? (
            <Nav.Link className="big-text btn" href="/hotelconsole">
              Hotel Console
            </Nav.Link>
          ) : null}
          {userData?.isAdmin ? (
            <Nav.Link className="big-text btn1" href="/dashboard">
              Admin Console
            </Nav.Link>
          ) : null}
          {isLoggedIn ? (
            <NavDropdown title={userData.userName} id="basic-nav-dropdown">
              <NavDropdown.Item href="/myaccount">My Account</NavDropdown.Item>
              <NavDropdown.Item href="/mybookings">
                My Bookings
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav.Link className="big-text" href="/login">
              Login/SignUp{" "}
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
