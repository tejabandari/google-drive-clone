import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavbarElement() {
  return (
    <>
      <Navbar bg="light" expand="xxl" className="px-3">
        <Navbar.Brand as={Link} to="/">
          My Drive
        </Navbar.Brand>
        <Nav>
          <Nav.Link as={Link} to="/profile">
            Profile
          </Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
}

export default NavbarElement;
