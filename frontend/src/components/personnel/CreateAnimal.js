import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { useNavigate } from "react-router-dom";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { newAnimal, clearErrors } from "../../actions/animalActions";
import { NEW_ANIMAL_RESET } from "../../constants/animalConstant";

import Sidebar from "./Sidebar";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import { MultiSelect } from "react-multi-select-component";

import { getPersonnelHealths } from "../../actions/healthActions";
const CreateAnimal = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [rescuer, setRescuer] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [selected, setSelected] = useState([]);

  const categories = ["Cat", "Dog"];
  const breeds = [
    "Bulldog",
    "German Shepherd",
    "French Bulldog",
    "Labrador Retriever",
    "Poodle",
    "Beagle",
    "Domestic Shorthair",
    "Balinese",
    "American Shorthair",
    "Siamese",
    "Russian Blue",
    "Ragdoll",
    "Bengal",
  ];

  const alert = useAlert();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newAnimal);
  const { healths } = useSelector((state) => state.allHealth);

  useEffect(() => {
    dispatch(getPersonnelHealths());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      navigate("/personnel/animals");
      alert.success("Animal created successfully");
      dispatch({ type: NEW_ANIMAL_RESET });
    }
  }, [dispatch, alert, error, success, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("age", age);
    formData.set("breed", breed);
    formData.set("gender", gender);
    formData.set("category", category);
    formData.set("rescuer", rescuer);

    images.forEach((image) => {
      formData.append("images", image);
    });

    const sakitresults = selected.map((sakit) => {
      return sakit.value;
    });

    sakitresults.forEach((result) => {
      formData.append("healths", result);
    });

    console.log(sakitresults);
    dispatch(newAnimal(formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const results = healths.map((sakit) => {
    let sakits = { label: sakit.name, value: sakit.name };
    return sakits;
  });

  // console.log(results);

  return (
    <div>
      <Fragment>
        <div className="row">
          <div className="col-12 col-md-2">
            <Sidebar />
          </div>
          <div className="col-12 col-md-10">
            <MetaData title={"  New Animal"} />
            <Modal.Dialog>
              <Form
                className="shadow-lg"
                onSubmit={submitHandler}
                encType="multipart/form-data"
              >
                <Modal.Header>
                  <Modal.Title>Creating</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Row>
                    <Col>
                      <div className="form-group">
                        <label htmlFor="name_field">Name</label>
                        <input
                          type="text"
                          id="name_field"
                          className="form-control"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>

                      {/* <div className="form-group">
                        <label htmlFor="breed_field">Breed</label>
                        <input
                          className="form-control"
                          id="breed_field"
                          value={breed}
                          onChange={(e) => setBreed(e.target.value)}
                        ></input>
                      </div> */}

                      <div className="form-group">
                        <label htmlFor="breed_field">Breeds</label>
                        <select
                          aria-label="Default select example"
                          className="form-control"
                          id="breed_field"
                          value={breed}
                          onChange={(e) => setBreed(e.target.value)}
                        >
                          {" "}
                          <option>Open this select menu</option>
                          {breeds.map((breed) => (
                            <option key={breed} value={breed}>
                              {breed}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="category_field">Category</label>
                        <select
                          aria-label="Default select example"
                          className="form-control"
                          id="category_field"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          {" "}
                          <option>Open this select menu</option>
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Col>
                    <Col>
                      <div className="form-group">
                        <label htmlFor="price_field">Age</label>
                        <input
                          type="number"
                          id="price_field"
                          className="form-control"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="gender_field">Gender</label>
                        <input
                          className="form-control"
                          id="gender_field"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                        ></input>
                      </div>

                      <div className="form-group">
                        <label htmlFor="rescuer_field">Recuer </label>
                        <input
                          type="text"
                          id="rescuer_field"
                          className="form-control"
                          value={rescuer}
                          onChange={(e) => setRescuer(e.target.value)}
                        />
                      </div>
                    </Col>
                  </Row>

                  <div className="form-group">
                    <label>Images</label>

                    <div className="custom-file">
                      <input
                        type="file"
                        name="product_images"
                        className="custom-file-input"
                        id="customFile"
                        onChange={onChange}
                        multiple
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        Choose Images
                      </label>
                    </div>

                    {imagesPreview.map((img) => (
                      <img
                        src={img}
                        key={img}
                        alt="Images Preview"
                        className="mt-3 mr-2"
                        width="55"
                        height="52"
                      />
                    ))}
                  </div>
                  <div>
                    <h1>Health Problems</h1>
                    {/* <pre>{JSON.stringify(selected)}</pre> */}
                    <MultiSelect
                      name="helethselect"
                      options={results}
                      value={selected}
                      onChange={setSelected}
                      labelledBy="Select Health Problems"
                    />
                  </div>
                </Modal.Body>

                <Modal.Footer>
                  <Button
                    className="btn btn-block py-3"
                    variant="primary"
                    id="animal_button"
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
    </div>
  );
};

export default CreateAnimal;
