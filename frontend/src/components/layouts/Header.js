import React, { Fragment } from "react";

import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

import { logout } from "../../actions/userActions";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";

import Search from "./Search";
import { Link } from "react-router-dom";

const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Logged out successfully.");
  };

  return (
    <Fragment>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container fluid>
          <Navbar.Brand>
            <Link to="/">
              <img
                src="/images/logotry.png"
                alt="logotry"
                style={{ height: 40 }}
              />
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="m-auto my-2 my-lg-0">
              {/* {userInfo && ( */}
              {/* <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form> */}
              <Search />
              {/* )} */}
            </Nav>
            {user ? (
              <Nav className="">
                {user && user.role !== "Adopter" && (
                  <NavDropdown
                    title={user && user.email}
                    id="collasible-nav-dropdown"
                    className="dropdown"
                  >
                    <NavDropdown.Item href="/me">My Profile</NavDropdown.Item>
                    <NavDropdown.Item href="/personnel/dashboard">
                      Dashboard
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/" onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
                {user && user.role === "Adopter" && (
                  <>
                    <Nav.Link href="/adoptions/me">Adoptions</Nav.Link>
                    <Nav.Link href="/me">My Profile</Nav.Link>
                    <Nav.Link h href="/" onClick={logoutHandler}>
                      Logout
                    </Nav.Link>
                  </>
                )}
              </Nav>
            ) : (
              !loading && (
                <>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/register">Register</Nav.Link>
                </>
              )
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default Header;
