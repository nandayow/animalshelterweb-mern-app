import React from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <nav id="sidebar">
        <div className="prof"></div>

        <ul className="list-unstyled components">
          <li>
            <Link to="/personnel/dashboard">
              <i className="fa fa-tachometer"></i> Dashboard
            </Link>
          </li>

          <li>
            <a
              href="#animalSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-paw"></i> Animals
            </a>
            <ul className="collapse list-unstyled" id="animalSubmenu">
              <li>
                <Link to="/personnel/animals">
                  <i className="fa fa-clipboard"></i> All
                </Link>
              </li>
              <li>
                <Link to="/personnel/animal/create">
                  <i className="fa fa-plus"></i> Create
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/personnel/adoptions">
              <i className="fa fa-heart"></i> Adoptions
            </Link>
          </li>

          <li>
            <a
              href="#healthSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-heartbeat"></i> Health
            </a>
            <ul className="collapse list-unstyled" id="healthSubmenu">
              <li>
                <Link to="/personnel/healths">
                  <i className="fa fa-clipboard"></i> All
                </Link>
              </li>
              <li>
                <Link to="/personnel/health/create">
                  <i className="fa fa-plus"></i> Create
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <a
              href="#userSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-users"></i> Users
            </a>
            <ul className="collapse list-unstyled" id="userSubmenu">
              <li>
                <Link to="/personnel/users">
                  <i className="fa fa-clipboard"></i> All Users
                </Link>
              </li>
              <li>
                <Link to="/personnel/user/create">
                  <i className="fa fa-plus"></i> Create Personnel
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
