import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import Sidebar from "./Sidebar";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  allUsers,
  deleteUser,
  clearErrors,
  updateUserStatus,
} from "../../actions/userActions";
import {
  DELETE_USER_RESET,
  UPDATE_STATUS_RESET,
} from "../../constants/userConstants";

import { Button, Row } from "react-bootstrap";

const UsersList = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { loading, error, users } = useSelector((state) => state.allUsers);
  const { isDeleted, isUpdated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(allUsers());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("User deleted successfully");
      navigate("/personnel/users");
      dispatch({ type: DELETE_USER_RESET });
    }
    if (isUpdated) {
      alert.success("User status updated");
      navigate("/personnel/users");
      dispatch({ type: UPDATE_STATUS_RESET });
    }
  }, [dispatch, alert, error, isDeleted, isUpdated, navigate]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const statusUserHandler = (id) => {
    dispatch(updateUserStatus(id));
  };

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: "User ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
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

    users.forEach((user) => {
      data.rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        actions: (
          <Fragment>
            <Link
              to={`/personnel/user/${user._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteUserHandler(user._id)}
            >
              <i className="fa fa-trash"></i>
            </button>

            {user && user.status === "active" && (
              <button
                className="btn btn-success py-1 px-2 ml-2"
                onClick={() => statusUserHandler(user._id)}
              >
                <i className="fa fa-lock"></i>
              </button>
            )}

            {user && user.status === "inactive" && (
              <button
                className="btn btn-warning py-1 px-2 ml-2"
                onClick={() => statusUserHandler(user._id)}
              >
                <i className="fa fa-lock"></i>
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
      <Row>
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10 mytable">
          <MetaData title={"All Users"} />
          <p className="heading">Users Table</p>
          <hr></hr>
          <Link to="/personnel/user/create">
            <Button style={{ marginLeft: 9, marginBottom: 6 }}>
              Create Personnel
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
              data={setUsers()}
            />
          )}
        </div>
      </Row>
    </Fragment>
  );
};

export default UsersList;
