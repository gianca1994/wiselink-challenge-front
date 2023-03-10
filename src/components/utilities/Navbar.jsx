import React from "react";
import Nav from "react-bootstrap/Nav";

const Navbar = () => {
  return (
    <div>
      <Nav style={navbar}>
        <Nav.Item style={navbarItems}>
          <Nav.Link href="/profile" style={navbarItemsLink}>
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item style={navbarItems}>
          <Nav.Link href="/taskbuilder" style={navbarItemsLink}>
            Events
          </Nav.Link>
        </Nav.Item>

        <Nav.Item style={navbarItemsLogout}>
          <Nav.Link href="/" style={navbarItemsLink}>
            Log out
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Navbar;

const navbar = {
  backgroundColor: "lightblue",
  display: "flex",
  alignItems: "center",
  height: "70px",
  fontSize: "30px",
  fontWeight: "bold",
  color: "#000",
};

const navbarItems = {
  marginLeft: "40px",
};

const navbarItemsLink = {
  textDecoration: "none",
};

const navbarItemsLogout = {
  position: "absolute",
  right: "0",
  marginRight: "40px",
};
