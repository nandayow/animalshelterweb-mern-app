import React, { Fragment, useEffect, useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateProfile,
  loadUser,
  clearErrors,
} from "../../actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  const alert = useAlert();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    console.log(isUpdated);
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile updated successfully");
      dispatch(loadUser());

      navigate("/me", { replace: true });

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, alert, error, isUpdated, user, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("avatar", avatar);

    dispatch(updateProfile(formData));
  };

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
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
              <Modal.Title>Update Profile</Modal.Title>
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

              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                id="email_field"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

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
            </Modal.Body>
            <Modal.Footer>
              <Link to="/me">
                <Button variant="warning">Cancel</Button>
              </Link>
              <Button
                variant="primary"
                id="user_button"
                type="submit"
                disabled={loading ? true : false}
              >
                Update
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Dialog>
      </div>
    </Fragment>
  );
};

export default UpdateProfile;
