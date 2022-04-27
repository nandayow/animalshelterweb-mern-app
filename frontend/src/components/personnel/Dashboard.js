import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getPersonnelHealths } from "../../actions/healthActions";
import { allUsers } from "../../actions/userActions";
import {
  getPersonnelAnimals,
  getAdoptionAnimals,
} from "../../actions/animalActions";

import Charts from "./RescuedCharts";
import AdoptedCharts from "./AdoptedCharts";
const Dashboard = () => {
  const dispatch = useDispatch();
  const { healths } = useSelector((state) => state.allHealth);
  const { users } = useSelector((state) => state.allUsers);
  const { animals } = useSelector((state) => state.animals);
  const { adoptions } = useSelector((state) => state.adoptions);

  useEffect(() => {
    dispatch(getPersonnelHealths());
    dispatch(allUsers());
    dispatch(getPersonnelAnimals());
    dispatch(getAdoptionAnimals());
  }, [dispatch]);

  // console.log(adoptions);

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          {false ? (
            <Loader />
          ) : (
            <Fragment>
              <MetaData title={"Shelter's Dashboard"} />
              <p className="heading">Shelter's Dashboard</p>
              <hr></hr>
              <div className="row pr-4">
                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-danger o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Animals
                        <br /> <b>{animals && animals.length}</b>
                      </div>
                    </div>

                    <Link
                      href="/animals"
                      className="card-footer text-white clearfix small z-1"
                      to="/personnel/animals"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-warning o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Adoptions
                        <br /> <b>{adoptions && adoptions.length}</b>
                      </div>
                    </div>

                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="/personnel/adoptions"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-info o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Users
                        <br /> <b>{users && users.length}</b>
                      </div>
                    </div>

                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="/personnel/users"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-success o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Health
                        <br /> <b>{healths && healths.length}</b>
                      </div>
                    </div>

                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="/personnel/healths"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
                <Charts />
                <AdoptedCharts />
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
