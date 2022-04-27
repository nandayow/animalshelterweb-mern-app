import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import MetaData from "../layouts/MetaData";
import Sidebar from "./Sidebar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUser,
  getUserDetails,
  clearErrors,
} from "../../actions/userActions";

import { Button, Col, Form, Modal, Row } from "react-bootstrap";

import { UPDATE_USER_RESET } from "../../constants/userConstants";

const UpdatePersonnel = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { error, isUpdated } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.userDetails);
  const roles = ["Employee", "Veterinarian", "Volunteer"];

  //   console.log(user);
  const { id } = useParams();

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User updated successfully");

      navigate("/personnel/users");

      dispatch({
        type: UPDATE_USER_RESET,
      });
    }
  }, [dispatch, alert, error, navigate, isUpdated, id, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("role", role);

    dispatch(updateUser(user._id, formData));
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10 ">
          <MetaData title={"Upate Personnel information"} />
          <Modal.Dialog>
            <Form onSubmit={submitHandler}>
              <Modal.Header>
                <Modal.Title>Uppdating</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Type your Full Name"
                    name="name"
                    id="user_name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      id="email_field"
                      placeholder="Enter email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Col>
                  {/* <Col>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        id="password_field"
                        placeholder="Password"
                        name="password"
                        // value={password}
                        // onChange={onChange}
                      />
                    </Col> */}
                </Row>

                {/* <div className="form-group">
                    <label htmlFor="avatar_upload">Avatar</label>
                    <div className="d-flex align-items-center">
                      <div>
                        <figure className="avatar mr-3 item-rtl">
                          <img
                            // src={avatarPreview}
                            className="rounded-circle"
                            alt="Avatar Preview"
                          />
                        </figure>
                      </div>
                      <div className="custom-file">
                        <input
                          type="file"
                          name="avatar"
                          className="custom-file-input"
                          id="customFile"
                          accept="iamges/*"
                          //   onChange={onChange}
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="customFile"
                        >
                          Choose Avatar
                        </label>
                      </div>
                    </div>
                  </div> */}

                <Form.Group className="mb-3">
                  <Form.Label>Personnel Role</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    className="form-control"
                    name="role"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Text className="text-muted">Select the menu.</Form.Text>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Link to="/personnel/users">
                  <Button variant="warning">Close</Button>
                </Link>
                <Button
                  variant="primary"
                  id="user_button"
                  type="submit"
                  // disabled={loading ? true : false}
                >
                  Submit
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Dialog>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdatePersonnel;
