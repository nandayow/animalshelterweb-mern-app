import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import Sidebar from "./Sidebar";

import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import { Button } from "react-bootstrap";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  getPersonnelAnimals,
  deleteAnimal,
  updateAnimalStatus,
  clearErrors,
} from "../../actions/animalActions";
import {
  DELETE_ANIMAL_RESET,
  UPDATE_HEALTH_RESET,
} from "../../constants/animalConstant";

const AnimalList = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, animals } = useSelector((state) => state.animals);
  const { isUpdated, isDeleted } = useSelector((state) => state.animal);

  useEffect(() => {
    dispatch(getPersonnelAnimals());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Animal deleted successfully");
      navigate("/personnel/animals");
      dispatch({ type: DELETE_ANIMAL_RESET });
    }
    if (isUpdated) {
      alert.success("Animal status updated");
      navigate("/personnel/animals");
      dispatch({ type: UPDATE_HEALTH_RESET });
    }
  }, [dispatch, alert, error, isDeleted, isUpdated, navigate]);

  const deletAnimalHandler = (id) => {
    dispatch(deleteAnimal(id));
  };

  const statusAnimalHandler = (id) => {
    dispatch(updateAnimalStatus(id));
  };

  const setHealth = () => {
    const data = {
      columns: [
        {
          label: "Animal ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Gender",
          field: "gender",
          sort: "asc",
        },
        {
          label: "Breed",
          field: "breed",
          sort: "asc",
        },
        {
          label: "Age",
          field: "age",
          sort: "asc",
        },
        {
          label: "Category",
          field: "category",
          sort: "asc",
        },
        {
          label: "HealthStatus",
          field: "healthstatus",
          sort: "asc",
        },
        {
          label: "Adoption",
          field: "adoption",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };
    animals.forEach((animal) => {
      data.rows.push({
        id: animal._id,
        gender: animal.gender,
        name: animal.name,
        breed: animal.breed,
        age: animal.age,
        category: animal.category,
        adoption: animal.adoption.status,
        healthstatus: animal.healthstatus,
        actions: (
          <Fragment>
            <Link
              to={`/personnel/animal/${animal._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deletAnimalHandler(animal._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
            {animal && animal.healthstatus === "Not Cured" && (
              <button
                className="btn btn-warning py-1 px-2 ml-2"
                onClick={() => statusAnimalHandler(animal._id)}
              >
                <i className="fa fa-medkit"></i>
              </button>
            )}

            {animal && animal.healthstatus === "Cured" && (
              <button
                className="btn btn-success py-1 px-2 ml-2"
                onClick={() => statusAnimalHandler(animal._id)}
              >
                <i className="fa fa-medkit"></i>
              </button>
            )}
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10  mytable">
          <MetaData title={"Animals Information"} />
          <p className="heading">Animals Table</p>
          <hr></hr>
          <Link to="/personnel/animal/create">
            <Button style={{ marginLeft: 9, marginBottom: 6 }}>
              Create new Animal
            </Button>
          </Link>
          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              // style={{ margin: "auto" }}
              striped
              bordered
              small
              paging={true}
              data={setHealth()}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default AnimalList;
