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
  getPersonnelHealths,
  deleteHealth,
  clearErrors,
} from "../../actions/healthActions";
import { DELETE_HEALTH_RESET } from "../../constants/healthConstants";

const HealthList = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, healths } = useSelector((state) => state.allHealth);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.health
  );

  useEffect(() => {
    dispatch(getPersonnelHealths());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Health deleted successfully");
      navigate("/personnel/healths");
      dispatch({ type: DELETE_HEALTH_RESET });
    }
  }, [dispatch, alert, deleteError, isDeleted, error, navigate]);

  const setHealth = () => {
    const data = {
      columns: [
        {
          label: "Health ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Description",
          field: "description",
          sort: "asc",
        },
        {
          label: "Category",
          field: "category",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };
    // console.log(healths);

    healths.forEach((sakit) => {
      //  console.log(sakit.name);
      data.rows.push({
        id: sakit._id,
        name: sakit.name,
        description: sakit.description,
        category: sakit.category,
        actions: (
          <Fragment>
            <Link
              to={`/personnel/health/${sakit._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteHealthHandler(sakit._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  const deleteHealthHandler = (id) => {
    dispatch(deleteHealth(id));
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10 mytable">
          <MetaData title={"Health Information"} />
          <p className="heading">Health Table</p>
          <hr></hr>
          <Link to="/personnel/health/create">
            <Button style={{ marginLeft: 9, marginBottom: 6 }}>
              Create new Health
            </Button>
          </Link>
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

export default HealthList;
