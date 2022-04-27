import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Loader from "../layouts/Loader";
import ListAdoptions from "../adoption/ListAdoptions";
import { Container } from "react-bootstrap";
const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="prof ">
            <Container fluid>
              {/* <!-- Profile widget --> */}
              <div className="bg-white shadow rounded overflow-hidden">
                <div className="px-4 pt-0 pb-4 cover" style={{ height: 300 }}>
                  <div className="media align-items-end profile-head">
                    <div className="profile mr-3">
                      <img
                        src={user.avatar.url}
                        alt={user.name}
                        width="130"
                        className="rounded mb-2 img-thumbnail"
                      />
                      <Link
                        to="/me/update"
                        className="btn btn-outline-dark btn-sm btn-block"
                      >
                        Edit profile
                      </Link>
                    </div>
                    <div className="media-body mb-5 text-white">
                      <h4 className="mt-0 mb-0">{user.name}</h4>
                      <p className="small mb-4">
                        <i className="fas fa-map-marker-alt mr-2"></i>
                        {user.role}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-4 py-3">
                  <h5 className="mb-0">About</h5>
                  <div className="p-4 rounded shadow-sm bg-light">
                    <p className="font-italic mb-0"> {user.email}</p>
                    <p className="font-italic mb-0">{user.status}</p>
                    <p className="font-italic mb-0">UserId:{user._id}</p>
                  </div>
                </div>
                <div className="py-4 px-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h5 className="mb-0">Recent photos</h5>
                    Show all
                  </div>
                  <div className="row">
                    <div className="col-lg-6 mb-2 pr-lg-1">
                      <img
                        src="https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                        alt=""
                        className="img-fluid rounded shadow-sm"
                      />
                    </div>
                    <div className="col-lg-6 mb-2 pl-lg-1">
                      <img
                        src="https://images.unsplash.com/photo-1493571716545-b559a19edd14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                        alt=""
                        className="img-fluid rounded shadow-sm"
                      />
                    </div>
                  </div>
                  <ListAdoptions />
                </div>
              </div>
            </Container>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
