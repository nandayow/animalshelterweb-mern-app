import React, { Fragment, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

import { Link, useNavigate, useLocation } from "react-router-dom";

import Loader from "../layouts/Loader";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";

import { login, clearErrors } from "../../actions/userActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let location = useLocation();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );
  const redirect = location.search ? location.search.split("=")[1] : "";
  // const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/${redirect}`);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, navigate, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="login">
            <Modal.Dialog>
              <Form onSubmit={submitHandler}>
                <Modal.Header
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Modal.Title>Login Form</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    id="email_field"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    id="password_field"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Modal.Body>

                <Modal.Footer>
                  <Button variant="primary" id="user_button" type="submit">
                    LOGIN
                  </Button>
                  <Link to="/register">
                    <Button variant="secondary">New User?</Button>
                  </Link>
                </Modal.Footer>
              </Form>
            </Modal.Dialog>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
