import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import InfoIcon from "@mui/icons-material/Info";
import { makeStyles, TablePagination } from "@material-ui/core";
import { Modal } from "react-bootstrap";
import DraggableComponent from "../Service/DraggableComponent";
import "../Css/Content.css";
import moment from "moment";

import CoverDetailPasAdd from "../CoverDetailPas/CoverDetailPasAdd";
import CoverDetailPasInfo from "../CoverDetailPas/CoverDetailPasInfo";

const useStyles = makeStyles((theme) => ({
  BackGround: {
    backgroundColor: "#d50000",
    color: "white",
  },
}));

function PolicyCoverDetailsInfo({
  open,
  close,
  coverDetails,
  setcoverDetails,
  policyCovers,
  setpolicyCovers,
  getAll,
  chdrId,
  cmpId,
  clientId,
  uniqueNo,
}) {
  const classes = useStyles();
  const userId = sessionStorage.getItem("userId");

  console.log("Policy Covers ", coverDetails);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [coveraddmodel, setcoverAddmodel] = useState(false);
  const coverAddOpen = () => {
    setcoverAddmodel(true);
  };

  const coverAddClose = () => {
    setcoverAddmodel(false);
    getpolicyCovers();
    getAll();
  };
  const [info, setinfo] = useState("");
  const [infoOpen, setInfoOpen] = useState(false);

  const infoClickOpen = (item) => {
    setInfoOpen(true);
    setinfo(item);
  };

  const infoClickClose = () => {
    setInfoOpen(false);
  };

  const getpolicyCovers = () => {
    axios
      .get(`http://localhost:8090/coverdetailspas/get/${id}/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setpolicyCovers(resp.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Modal
        dialogAs={DraggableComponent}
        show={open}
        onHide={close}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title> Policy Pas Cover Details </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ minWidth: "100%" }}>
          <div className="container">
            <Button>
              <AddBoxIcon
                fontSize="large"
                className={classes.BackGround}
                onClick={() => coverAddOpen()}
              />
            </Button>
            <Table striped bordered hover size="md">
              <thead className="tableheader">
                <tr>
                  <th>id</th>
                  <th>Policy Num</th>
                  <th>Plan Name</th>
                  <th>Cover Code</th>
                  <th>UIN Number</th>
                  <th>Info</th>
                  {/* <th>Risk Com Date</th>
                  <th>DOC Date</th> */}
                </tr>
              </thead>
              <tbody>
                {coverDetails?.map((value) => (
                  <>
                    {value.validFlag === 1 ? (
                      <tr>
                        <td>{value.id}</td>
                        <td>{value.chdrNum}</td>
                        <td>{value.cntType}</td>
                        <td>{value.crTable}</td>
                        <td>{value.uinNumber}</td>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-evenly",
                            }}
                          >
                            <InfoIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => infoClickOpen(value)}
                            />
                          </div>
                        </td>
                      </tr>
                    ) : null}
                  </>
                ))}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={coveraddmodel} onHide={coverAddClose} centered size="lg">
        <Modal.Header closeButton>
          {" "}
          <Modal.Title> Coverage Add </Modal.Title>{" "}
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <CoverDetailPasAdd
              open1={coveraddmodel}
              chdrId={chdrId}
              clientId={clientId}
              cmpId={cmpId}
              uniqueNo={uniqueNo}
              setcoverDetails={setcoverDetails}
              coverDetails={coverDetails}
              policyCovers={policyCovers}
              setpolicyCovers={setpolicyCovers}
              close1={coverAddClose}
              notify1={notify}
              setNotify1={setNotify}
            />
          </div>
        </Modal.Body>
      </Modal>
      <CoverDetailPasInfo
        open={infoOpen}
        handleClose={infoClickClose}
        data={info}
      />
    </div>
  );
}

export default PolicyCoverDetailsInfo;
