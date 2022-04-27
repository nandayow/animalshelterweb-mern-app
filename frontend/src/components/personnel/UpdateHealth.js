import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layouts/MetaData";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  updateHealth,
  getHealthDetails,
  clearErrors,
} from "../../actions/healthActions";
import { UPDATE_HEALTH_RESET } from "../../constants/healthConstants";
import { Button, Form, Modal } from "react-bootstrap";
import Sidebar from "./Sidebar";

const UpdateHealth = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const categories = ["Injury", "Disease"];

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, health } = useSelector((state) => state.healthDetails);
  console.log(health);
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.health
  );

  let { id } = useParams();
  let navigate = useNavigate();

  console.log(health);

  useEffect(() => {
    if (health && health._id !== id) {
      dispatch(getHealthDetails(id));
    } else {
      setName(health.name);
      setCategory(health.category);
      setDescription(health.description);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      navigate("/personnel/healths");
      alert.success("Health Updated successfully");
      dispatch({ type: UPDATE_HEALTH_RESET });
    }
    console.log(health);
  }, [dispatch, alert, error, isUpdated, navigate, updateError, health, id]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("category", category);
    formData.set("description", description);

    dispatch(updateHealth(health._id, formData));
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10 mytable">
          <MetaData title={"Update Health Information"} />
          <Modal.Dialog>
            <Form onSubmit={submitHandler}>
              <Modal.Header>
                <Modal.Title>Editing</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Health Issue Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Type Here"
                    id="edit_health_name"
                    name="name"
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
                    id="edit_health_category"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Text className="text-muted">Update Category</Form.Text>
                </Form.Group>
              </Modal.Body>

              <Modal.Footer>
                <Link to="/personnel/healths">
                  <Button variant="warning">Close</Button>
                </Link>
                <Button
                  variant="primary"
                  id="update_health_button"
                  type="submit"
                >
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Dialog>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateHealth;
