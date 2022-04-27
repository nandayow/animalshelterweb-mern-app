import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import Sidebar from "./Sidebar";

import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdoptionAnimals,
  updateAdoptionStatus,
  trashAdoptionStatus,
  clearErrors,
} from "../../actions/animalActions";
import {
  UPDATE_ADOPTION_RESET,
  TRASH_ADOPTION_RESET,
  DELETE_ANIMAL_RESET,
} from "../../constants/animalConstant";

const AdoptionList = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, adoptions } = useSelector((state) => state.adoptions);
  const { isUpdated, isDeleted, isTrashed } = useSelector(
    (state) => state.animal
  );

  useEffect(() => {
    dispatch(getAdoptionAnimals());

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
      alert.success("Adoption status updated");
      navigate("/personnel/adoptions");
      dispatch({ type: UPDATE_ADOPTION_RESET });
    }
    if (isTrashed) {
      alert.success("Request Adoption Deleted");
      navigate("/personnel/adoptions");
      dispatch({ type: TRASH_ADOPTION_RESET });
    }
  }, [dispatch, alert, error, isDeleted, isUpdated, isTrashed, navigate]);

  const trashAdoptionHandler = (id) => {
    dispatch(trashAdoptionStatus(id));
  };

  const statusAdoptionHandler = (id) => {
    dispatch(updateAdoptionStatus(id));
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
          label: "Animal Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Adopter ID",
          field: "adopter_id",
          sort: "asc",
        },
        {
          label: "Adopter",
          field: "adopter",
          sort: "asc",
        },

        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };
    adoptions.forEach((animal) => {
      data.rows.push({
        id: animal._id,
        name: animal.name,
        adopter_id: animal.adoption.user,
        adopter: animal.adoption.name,
        status: animal.adoption.status,
        actions: (
          <Fragment>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => trashAdoptionHandler(animal._id)}
            >
              <i className="fa fa-ban"></i>
            </button>
            {animal && animal.adoption.status === "Pending" && (
              <button
                className="btn btn-success py-1 px-2 ml-2"
                onClick={() => statusAdoptionHandler(animal._id)}
              >
                <i className="fa fa-thumbs-up"></i>
              </button>
            )}

            {animal && animal.adoption.status === "Approved" && (
              <button
                className="btn btn-warning py-1 px-2 ml-2"
                onClick={() => statusAdoptionHandler(animal._id)}
              >
                <i className="	fa fa-thumbs-down"></i>
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
          <MetaData title={"Adoptions Information"} />
          <p className="heading">Adoptions Table</p>
          <hr></hr>
          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
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

export default AdoptionList;
