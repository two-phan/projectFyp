import React, { useState, useEffect, use } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup } from "react-bootstrap";
import Message from "../components/Message";
import { validPassword } from "../components/Validpass";
import { signup } from "../actions/userActions";
import Loader from "../components/Loader";

function Signup() {
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [message, setMessage] = useState("");
  const [show, changeshow] = useState("fa fa-eye-slash");
  const dispatch = useDispatch();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userSignup = useSelector((state) => state.userSignup);
  const { loading, userInfo, error } = userSignup;

  useEffect(() => {
    if (userInfo) {
      setMessage(userInfo.details);
      setFname("");
      setLname("");
      setEmail("");
      setPass1("");
      setPass2("");
    }
  }, [userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(fname, lname, email, pass1, pass2);

    if (pass1 !== pass2) {
      setMessage("Passwords do not match");
      return;
    } else if (!validPassword.test(pass1)) {
      setMessage("Invalid password format");
      return;
    } else {
      dispatch(signup(fname, lname, email, pass1));
      setMessage("Signup successful");
      navigate("/signup");
    }
  };

  const showPassword = () => {
    var x = document.getElementById("pass1");
    var z = document.getElementById("pass2");
    if (x.type === "password" && z.type === "password") {
      x.type = "text";
      z.type = "text";
      changeshow("fa fa-eye");
    } else {
      x.type = "password";
      z.type = "password";
      changeshow("fa fa-eye-slash");
    }
  };

  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
          <Card>
            <Card.Header as="h3" className="text-center bg-black text-light">
              Sign Up
            </Card.Header>
            <br />
            <Card.Body>
              {message && <Message variant="danger">{message}</Message>}
              {loading && <Loader />}
              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="fname">
                  <Form.Label>
                    <span>
                      <i className="fa fa-user"></i>
                    </span>
                    First Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter First Name"
                    required
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="lname">
                  <Form.Label>
                    <span>
                      <i className="fa fa-user"></i>
                    </span>
                    Last Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Last Name"
                    required
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>
                    <span>
                      <i className="fa-solid fa-envelope"></i>
                    </span>
                    Email Address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    {""}
                    <span>
                      <i className={show}></i>
                    </span>{" "}
                    Password
                  </Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Checkbox onClick={showPassword} />
                    {""}
                    <Form.Control
                      placeholder="Enter password"
                      required
                      type="password"
                      id="pass1"
                      value={pass1}
                      onChange={(e) => setPass1(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    {""}
                    <span>
                      <i className={show}></i>
                    </span>{" "}
                    Confirm Password
                  </Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Checkbox onClick={showPassword} />
                    {""}
                    <Form.Control
                      placeholder="Confirm password"
                      required
                      type="password"
                      id="pass2"
                      value={pass2}
                      onChange={(e) => setPass2(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
                <small className="text-muted">
                  Password must contains at least one letter (uppercase or
                  lowercase), at least one digit and at least 5 characters long.
                </small>

                <br />
                <div className="d-grid gap-2">
                  <Button className="btn btn-md btn-success" type="submit">
                    Sign Up
                  </Button>
                </div>
              </Form>
              <Row className="py-3">
                <Col>
                  Already have an account?{" "}
                  <Link to="/login" className="text-decoration-none">
                    Login
                  </Link>
                </Col>
              </Row>
            </Card.Body>
            </Card>
          </Col>
          <Col md={4}></Col>
        </Row>
      </Container>
    </>
  );
}

export default Signup;
