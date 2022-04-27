import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layouts/MetaData";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, newPersonnel } from "../../actions/userActions";
import { NEW_PERSONNEL_RESET } from "../../constants/userConstants";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import Sidebar from "./Sidebar";

const CreatePersonnel = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: " ",
  });

  const { name, email, password, role } = user;
  const roles = ["Employee", "Veterinarian", "Volunteer"];

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );
  const alert = useAlert();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { loading, error, success } = useSelector(
    (state) => state.newPersonnel
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      navigate("/personnel/users");
      alert.success("Personnel created successfully");
      dispatch({ type: NEW_PERSONNEL_RESET });
    }
  }, [dispatch, alert, error, success, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("role", role);
    formData.set("avatar", avatar);

    dispatch(newPersonnel(formData));
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <MetaData title={"New Personnel information"} />
          <Modal.Dialog>
            <Form onSubmit={submitHandler}>
              <Modal.Header>
                <Modal.Title>Creating</Modal.Title>
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
                    onChange={onChange}
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
                      onChange={onChange}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      id="password_field"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={onChange}
                    />
                  </Col>
                </Row>

                <div className="form-group">
                  <label htmlFor="avatar_upload">Avatar</label>
                  <div className="d-flex align-items-center">
                    <div>
                      <figure className="avatar mr-3 item-rtl">
                        <img
                          src={avatarPreview}
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
                        onChange={onChange}
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        Choose Avatar
                      </label>
                    </div>
                  </div>
                </div>

                <Form.Group className="mb-3">
                  <Form.Label>Personnel Role</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    className="form-control"
                    name="role"
                    id="role"
                    value={role}
                    onChange={onChange}
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
                  disabled={loading ? true : false}
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

export default CreatePersonnel;
