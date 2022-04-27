import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import Loader from "../layouts/Loader";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { myAdoptions, clearErrors } from "../../actions/adoptionActions";
import { trashAdoptionStatus } from "../../actions/animalActions";
import { TRASH_ADOPTION_RESET } from "../../constants/animalConstant";
const ListAdoptions = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, adoptions } = useSelector(
    (state) => state.myAdoptions
  );

  const { isTrashed } = useSelector((state) => state.animal);

  useEffect(() => {
    dispatch(myAdoptions());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isTrashed) {
      alert.success("Cancelled Adoption Request");
      navigate("/adoptions/me");
      dispatch({ type: TRASH_ADOPTION_RESET });
    }
  }, [dispatch, alert, error, isTrashed, navigate]);

  const trashAdoptionHandler = (id) => {
    dispatch(trashAdoptionStatus(id));
  };

  const setAdoptions = () => {
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

    adoptions.forEach((adoption) => {
      data.rows.push({
        id: adoption._id,
        name: adoption.name,
        adopter_id: adoption.adoption.user,
        adopter: adoption.adoption.name,
        status: adoption.adoption.status,
        actions: (
          <Fragment>
            <Link to={`/animal/${adoption._id}`} className="btn btn-primary">
              <i className="fa fa-eye"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => trashAdoptionHandler(adoption._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <div className="Homepage">
        <div className="mytable ">
          <h1 className="heading">My Adoptions Request</h1>
          <hr />
          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setAdoptions()}
              // className="px-3"
              bordered
              striped
              hover
              // scrollX
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ListAdoptions;
