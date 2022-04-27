import React, { Fragment, useState, useEffect } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../../actions/userActions";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: " ",
  });

  const { name, email, password } = user;
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );
  const alert = useAlert();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("role", "Adopter");
    formData.set("avatar", avatar);

    dispatch(register(formData));
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
      <div className="Register">
        <Modal.Dialog>
          <Form onSubmit={submitHandler}>
            <Modal.Header
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Modal.Title>Registration Form</Modal.Title>
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
                <Form.Control
                  type="hidden"
                  id="email_field"
                  placeholder="Enter email"
                  name="role"
                  value="Adopter"
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Link to="/login">
                <Button variant="warning">Login</Button>
              </Link>
              <Button
                variant="primary"
                id="user_button"
                type="submit"
                disabled={loading ? true : false}
              >
                Register
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Dialog>
      </div>
    </Fragment>
  );
};

export default Register;
