import { Avatar, Button, Tooltip } from "@mui/material";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import HomeIcon from "@mui/icons-material/Home";
import { FaUserAlt } from "react-icons/fa";
import { HiOfficeBuilding } from "react-icons/hi";

function CollapsibleExample() {
  const companyLogo = sessionStorage.getItem("logo");

  return (
    <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: "#DA251C" }}>
      <Navbar.Brand href="#">
        <Tooltip title="Company Logo">
          <span>
            <img
              style={{
                height: "3rem",
                width: "8rem",
                marginLeft: "2rem",
              }}
              src={companyLogo}
              alt="LOGO"
            ></img>
            {/* <Avatar
                alt={companyLogo}
                src={companyLogo}
                sx={{ width: 56, height: 56 }}
              /> */}
          </span>
        </Tooltip>
      </Navbar.Brand>
      <Navbar.Brand href="homepage">
        <span style={{ color: "white" }}>
          <HomeIcon fontSize="large" />
        </span>
      </Navbar.Brand>
      <Navbar.Brand>
        {/* <span style={{ color: "white", marginLeft: "20rem" }}> */}
        <h3 style={{ color: "white", marginLeft: "30%" }}>
          Insurance Payment Checking Application(IPCA)
        </h3>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav>
          <NavDropdown
            title="Profile"
            id="collasible-nav-dropdown"
            style={{ marginLeft: "400px" }}
          >
            <NavDropdown.Item href="logindetails">User</NavDropdown.Item>
            <NavDropdown.Item href="company">Company</NavDropdown.Item>
            <NavDropdown.Item href="userGroup">User Group</NavDropdown.Item>
            <NavDropdown.Item href="address">Address</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CollapsibleExample;
