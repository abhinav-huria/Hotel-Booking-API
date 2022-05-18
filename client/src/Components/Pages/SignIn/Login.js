import { LockClosedIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { signIn} from "../../API/Auth.js";
export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user, 
      [name]: value,
    });
  };

  // const navigate = useNavigate();
 

  async function handleSubmit(event) {
    event.preventDefault();
    localStorage.clear();
    signIn(user).then(result => { alert(result.data)});
    
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
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={user.email}
              onChange={handleChange}
              name="email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              name="password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
