import { useContext, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import queryString from "query-string";

import { signIn } from "../../API/Auth.js";
import { authContext } from "../../Context/authContext.js";
import "./login.css";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const location = useLocation();

  const { dispatch } = useContext(authContext);
  const navigate = useNavigate();
  const [err, setErr] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const response = await signIn(user);
      console.log(response);

      if (response.status === 200) {
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data.user });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isAuthenticated", true);
        const { redirectTo } = queryString.parse(location.search);
        if (redirectTo) {
          navigate(redirectTo);
        } else {
          navigate("/");
        }
      } else {
        setErr("Invalid Credentials");
        dispatch({ type: "LOGIN_FAILURE", payload: response.data });
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response });
    }
  };

  return (
    <>
      <div className="container full-height">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="bg-white">
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

                <Button variant="danger" type="submit">
                  Login
                </Button>
                {err ? <p>{err}</p> : null}
              </Form>
              <Link to="/signup">Don't have an account yet?</Link>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </>
  );
}
