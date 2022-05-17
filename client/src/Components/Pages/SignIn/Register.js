// import { LockClosedIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
export default function Register() {
  const [user, setUser] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    userPhoneNumber: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user, 
      [name]: value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    localStorage.clear();
    alert(user.userEmail);
    // await axios
    //   .post("/api/login", { email, password })
    //   .then((result) => {
    //     if (result.status === 200 && result.data.passed === true) {

    //       localStorage.setItem("isAuthenticated", "true");
    //       navigate("/dashboard");
    //       return Promise.resolve("Dummy response to keep the console quiet");
    //     } else {
    //       alert("Invalid Credentials");

    //     }
    //     return Promise.resolve("Dummy response to keep the console quiet");
    //   })
    //   .catch((error) => {

    //     alert("Something went wrong");
    //   });
  }

  return (
    <>
      <div className="container">
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="userNhgame">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            value={user.userName}
            onChange={handleChange}
            name="userName"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="userEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={user.userEmail}
            onChange={handleChange}
            name="userEmail"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="userPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={user.userPassword}
            onChange={handleChange}
            name="userPassword"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="userPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Phone Number"
            value={user.userPhoneNumber}
            onChange={handleChange}
            name="userPhoneNumber"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      </div>


        
    </>
  );
}
