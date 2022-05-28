//import { Link } from "react-router-dom";
import React,{useContext,useEffect,useState} from "react";
import { Navbar, Nav , NavDropdown} from "react-bootstrap";
import {authContext} from "../../Context/authContext";
import { getUser } from "../../API/User.js";
import { useNavigate } from "react-router-dom";
import './navbar.css';
const NavbarComponent = () => {
  const {user}=useContext(authContext);
    const [userData,setUserData]=useState({});
    const { error, dispatch } = useContext(authContext);
    const[isLoggedIn,setIsLoggedIn]=useState(false);
    const navigate = useNavigate();
    useEffect( ()=>{
      
        console.log(user);
       
         getUser(user).then((res)=>{
         if(res.status===200){
           console.log(res.data);
           setIsLoggedIn(true);
      setUserData(res.data);
         }
         else{
           setIsLoggedIn(false);
         }
        });
    }
    ,[user])

    const handleLogout = () => {
      localStorage.removeItem("user");
      localStorage.setItem("isAuthenticated", false);
      dispatch({type:'LOGOUT'});
     navigate("/");
    };
    return (
        <Navbar collapseOnSelect expand="md" bg="light" variant="light">
       
        <Navbar.Brand href="/">Hotel</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/features">Features</Nav.Link>
            <Nav.Link href="/about">Pricing</Nav.Link>
          </Nav>
          <Nav className="myacc">
          {isLoggedIn ? (
          <NavDropdown title={userData.userName} id="basic-nav-dropdown">
          <NavDropdown.Item href="/myaccount">My Account</NavDropdown.Item>
          <NavDropdown.Item href="/mybookings">My Bookings</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
        </NavDropdown> ) : (
            <Nav.Link href="/login">Login/SignUp </Nav.Link>
            )}
           
          </Nav>
        </Navbar.Collapse>
      
      </Navbar>
    )
    };

    export default NavbarComponent;
