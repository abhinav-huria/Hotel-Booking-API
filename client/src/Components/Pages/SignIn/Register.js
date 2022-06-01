import React, { useState } from "react";
 import { useNavigate, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { signUp } from "../../API/Auth.js";
import Login from "./Login.js";
import "./login.css";

export default function Register() {
  const [user, setUser] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    userPhoneNumber: ""
  });
  const [error, setError] = useState("");
const navigate = useNavigate();
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
    signUp(user).then((res) => {
      if (res.status === 201) {
  navigate("/login")
      }
      else{
        console.log(res.response.data._message);
        setError(res.response.data._message);
      }
    })
    .catch(error => {
      console.log(error);
     // setError(error);
    });
  }

  return (
    <>
      <div className="container">
      <div className="row">
      <div className="col-md-3"></div>
      <div className="col-md-6">
      <div className="bg-white">
      {error? <div className="alert alert-danger">{error}</div>:null}
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
      <Link to="/login">Already have an account?</Link>
      </div></div>
      <div className="col-md-3"></div>
      </div>
      </div>

        
    </>
  );
}
