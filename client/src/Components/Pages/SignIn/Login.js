import { useLocation, useNavigate, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { signIn } from "../../API/Auth.js";
import { useContext, useState } from "react";
import { authContext } from "../../Context/authContext.js";
import queryString from "query-string";
export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const location = useLocation();
  const { error, dispatch } = useContext(authContext);
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
      if(response.status === 200){
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });

      const { redirectTo } = queryString.parse(location.search);
      console.log(response.token);
     navigate(redirectTo == null ? "/" : redirectTo);
      }
      else
      {
        setErr("Invalid Credentials");
        dispatch({ type: "LOGIN_FAILURE", payload: response.data });
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response });
      console.log(error);
    }
  };

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
          {err? <p>{err}</p> : null}
        </Form>
        <Link to="/signup">Don't have an account yet?</Link>
      </div>
    </>
  );
}
