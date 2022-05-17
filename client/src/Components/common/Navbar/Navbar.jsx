//import { Link } from "react-router-dom";
import React from "react";
import { Navbar, Nav } from "react-bootstrap";


const NavbarComponent = () => {
    
    return (
        <Navbar collapseOnSelect expand="md" bg="light" variant="light">
       
        <Navbar.Brand href="/">Hotel</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/features">Features</Nav.Link>
            <Nav.Link href="/about">Pricing</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/login">Login/SignUp</Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      
      </Navbar>
    )
    };

    export default NavbarComponent;
