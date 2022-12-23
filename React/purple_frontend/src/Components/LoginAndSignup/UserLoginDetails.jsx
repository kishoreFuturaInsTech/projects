import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Modal } from "react-bootstrap";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useCounter } from "../Contexts/StoreContext";
// import UserDetailsEdit from "./UserDetailsEdit";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Tooltip, Paper } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const UserLoginDetails = () => {
  let navigate = useNavigate();

  const btnstyle = { margin: "8px 0", marginLeft: "1.5rem" };
  const paperStyle = {
    padding: 20,
    height: "auto",
    width: "60%",
    margin: "1rem auto",
  };

  const { student, teacher } = useCounter();

  const agentid = sessionStorage.getItem("agent");
  const userId = sessionStorage.getItem("userId");

  const compId = sessionStorage.getItem("company");
  const refreshToken = sessionStorage.getItem("refreshtoken");

  const username = sessionStorage.getItem("username");
  const email = sessionStorage.getItem("email");

  const [company, setCompany] = useState([]);

  const formSubmit = () => {
    axios
      .post(`http://localhost:8080/api/auth/logout`, {
        userId,
        refreshToken,
      })
      .then((res) => {
        sessionStorage.clear();
        closeModal();
        navigate("/");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const [modal, setModal] = useState(false);
  const closeModal = () => {
    setModal(false);
  };

  const userGroup = sessionStorage.getItem("userGroup");

  return (
    <div>
      <br />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Tooltip title="Back">
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/homepage"
          >
            <ArrowBackIcon />
          </Button>
        </Tooltip>
        <Button
          style={{ marginLeft: "10rem" }}
          color="error"
          variant="contained"
          onClick={() => setModal(true)}
        >
          <Tooltip title="Logout">
            <LogoutIcon style={{ cursor: "pointer" }} />
          </Tooltip>
        </Button>
      </div>
      <Paper elevation={10} style={paperStyle}>
        <span
          style={{
            display: "flex",
            textAlign: "center",
            fontFamily: "BerkshireSwash-Regular",
            justifyContent: "center",
          }}
        >
          <h3>
            <b> Personal Details</b>{" "}
          </h3>
          <EditIcon
            color="primary"
            onClick={() => navigate("/edituser")}
            style={{ marginLeft: 10, cursor: "pointer" }}
          />
        </span>

        <div
          style={{
            fontFamily: "BerkshireSwash-Regular",
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
          }}
        >
          <span>
            <h4>
              <b> User Details</b>{" "}
            </h4>
          </span>

          <Row>
            <Col>
              <h5> User Id : {userId}</h5>{" "}
            </Col>
            <Col>
              {" "}
              <h5>User Name : {username}</h5>{" "}
            </Col>
          </Row>
          <Row>
            <Col>
              <h5> User E-Mail : {email} </h5>{" "}
            </Col>
            <Col>
              {" "}
              <h5>User Group: {userGroup}</h5>{" "}
            </Col>
          </Row>

          <br />
        </div>
      </Paper>

      <Modal show={modal} onHide={closeModal} centered size="sm">
        <Modal.Header closeButton> </Modal.Header>

        <Modal.Body>
          Do you want to log out ?
          <br />
          <br />
          <Button
            color="primary"
            variant="contained"
            style={{ marginRight: 10 }}
            onClick={() => formSubmit()}
          >
            {" "}
            Yes{" "}
          </Button>
          <Button
            color="error"
            variant="contained"
            style={{ marginRight: 10 }}
            onClick={() => closeModal()}
          >
            {" "}
            No{" "}
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserLoginDetails;
