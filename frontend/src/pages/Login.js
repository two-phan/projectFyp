import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup } from "react-bootstrap";
import Message from "../components/Message";
import { validEmail, validPassword } from "../components/Validpass";
import { login } from "../actions/userActions";
import Loader from "../components/Loader";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [show, changeshow] = useState("fa fa-eye-slash");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, pass1));
  };

  const showPassword = () => {
    var x = document.getElementById("pass1");
    if (x.type === "password") {
      x.type = "text";
      changeshow("fa fa-eye");
    } else {
      x.type = "password";
      changeshow("fa fa-eye-slash");
    }
  };

  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <Card>
                <Card.Header
                  as="h3"
                  className="text-center bg-black text-light"
                >
                  Login
                </Card.Header>

                <Card.Body>
                  <Form onSubmit={submitHandler}>
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

                    <br />
                    <div className="d-grid gap-2">
                      <Button className="btn btn-md btn-success" type="submit">
                        Log In
                      </Button>
                    </div>
                  </Form>
                  <Row className="py-3">
                    <Col>
                      New User??{" "}
                      <Link to="/signup" className="text-decoration-none">
                        Sign Up
                      </Link>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            )}
          </Col>
          <Col md={4}></Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
