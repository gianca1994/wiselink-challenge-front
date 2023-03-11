import React from "react";
import Nav from "react-bootstrap/Nav";

import { cookies } from "./Utilities";

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
          <Nav.Link href="/events" style={navbarItemsLink}>
            Events
          </Nav.Link>
        </Nav.Item>
        <Nav.Item style={navbarItems}>
          <Nav.Link href="/registered" style={navbarItemsLink}>
            Events Registered
          </Nav.Link>
        </Nav.Item>
        {cookies.get("admin") === "true" && (
          <Nav.Item style={navbarItems}>
            <Nav.Link href="/create" style={navbarItemsLink}>
              Register Event
            </Nav.Link>
          </Nav.Item>
        )}

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
  backgroundColor: "black",
  display: "flex",
  alignItems: "center",
  height: "70px",
  fontSize: "20px",
  fontWeight: "bold",
};

const navbarItems = {
  marginLeft: "20px",
};

const navbarItemsLink = {
  textDecoration: "none",
  color: "#f5f5f5",
};

const navbarItemsLogout = {
  position: "absolute",
  right: "0",
  marginRight: "40px",
};
