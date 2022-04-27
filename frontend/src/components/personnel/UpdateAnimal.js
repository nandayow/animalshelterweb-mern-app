import React, { Fragment, useState, useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import {
  getAnimalDetails,
  updateAnimal,
  clearErrors,
} from "../../actions/animalActions";
import { getPersonnelHealths } from "../../actions/healthActions";

import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import MetaData from "../layouts/MetaData";
import Sidebar from "./Sidebar";
import { UPDATE_ANIMAL_RESET } from "../../constants/animalConstant";
const UpdateAnimal = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [rescuer, setRescuer] = useState("");
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState([]);

  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [myhealth, setMyhealth] = useState([]);

  const categs = ["Cat", "Dog"];
  const alert = useAlert();
  const dispatch = useDispatch();

  let { id } = useParams();
  let navigate = useNavigate();

  const { animal } = useSelector((state) => state.animalDetails);
  const { healths } = useSelector((state) => state.allHealth);
  const { error, isUpdated, updateError, loading } = useSelector(
    (state) => state.animal
  );

  useEffect(() => {
    dispatch(getPersonnelHealths());
    if (animal && animal._id !== id) {
      dispatch(getAnimalDetails(id));
    } else {
      setName(animal.name);
      setAge(animal.age);
      setBreed(animal.breed);
      setGender(animal.gender);
      setCategory(animal.category);
      setRescuer(animal.rescuer);
      setOldImages(animal.images);
      setMyhealth(animal.healths);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      navigate("/personnel/animals");
      alert.success("Animal updated successfully");
      dispatch({ type: UPDATE_ANIMAL_RESET });
    }
  }, [dispatch, alert, error, isUpdated, navigate, updateError, animal, id]);

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
      console.log(result);
    });

    dispatch(updateAnimal(animal._id, formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);
    setOldImages([]);

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
    let records = { label: sakit.name, value: sakit.name };
    return records;
  });

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <MetaData title={"Edit Animal"} />
            <Modal.Dialog>
              <Form
                className="shadow-lg"
                onSubmit={submitHandler}
                encType="multipart/form-data"
              >
                <Modal.Header>
                  <Modal.Title>Update</Modal.Title>
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

                      <div className="form-group">
                        <label htmlFor="breed_field">Breed</label>
                        <input
                          className="form-control"
                          id="breed_field"
                          value={breed}
                          onChange={(e) => setBreed(e.target.value)}
                        ></input>
                      </div>

                      <div className="form-group">
                        <label htmlFor="category_field">Category</label>
                        <select
                          className="form-control"
                          id="category_field"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          {categs.map((categ) => (
                            <option key={categ} value={categ}>
                              {categ}
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

                    {oldImages &&
                      oldImages.map((oldimg) => (
                        <img
                          key={oldimg.public_id}
                          src={oldimg.url}
                          alt={oldimg.url}
                          className="mt-3 mr-2"
                          width="55"
                          height="52"
                        />
                      ))}

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
                    <pre>{JSON.stringify(myhealth)}</pre>
                    <MultiSelect
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
                    id="animalupdate_button"
                    type="submit"
                    disabled={loading ? true : false}
                  >
                    Submit
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Dialog>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateAnimal;
