import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layouts/MetaData";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { newHealth, clearErrors } from "../../actions/healthActions";

import { Button, Form, Modal } from "react-bootstrap";
import { NEW_HEALTH_RESET } from "../../constants/healthConstants";

import Sidebar from "./Sidebar";

const NewHealth = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const categories = ["Injury", "Disease"];

  const alert = useAlert();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newHealth);

  useEffect(() => {
    if (error) {
      alert.error("Health created unsuccessfully");
      dispatch(clearErrors());
    }

    if (success) {
      navigate("/personnel/healths");
      alert.success("Health created successfully");
      dispatch({ type: NEW_HEALTH_RESET });
    }
  }, [dispatch, alert, error, success, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("category", category);
    formData.set("description", description);

    dispatch(newHealth(formData));
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <MetaData title={"Create New Health information"} />
          <Modal.Dialog>
            <Form onSubmit={submitHandler}>
              <Modal.Header>
                <Modal.Title>Creating</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Health Issue Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Type Here"
                    name="name"
                    id="health_name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Leave the description here"
                  style={{ height: "100px" }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    className="form-control"
                    name="category"
                    id="health_category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Text className="text-muted">Select the menu.</Form.Text>
                </Form.Group>
              </Modal.Body>

              <Modal.Footer>
                <Link to="/personnel/healths">
                  <Button variant="warning">Close</Button>
                </Link>
                <Button
                  variant="primary"
                  id="health_button"
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

export default NewHealth;
