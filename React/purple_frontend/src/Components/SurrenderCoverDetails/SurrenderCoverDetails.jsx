import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Css/Content.css";
import Table from "react-bootstrap/Table";
import { TablePagination } from "@material-ui/core";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DraggableComponent from "../Service/DraggableComponent";
import moment from "moment";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { Button, Paper } from "@mui/material";
import { Modal } from "react-bootstrap";
import ConfirmDialog from "../Dialogs/ConfirmDialog";

import SurrenderCoverInfo from "./SurrenderCoverInfo";
import SurrenderCoverEdit from "./SurrenderCoverEdit";

function SurrenderCoverDetails() {
  const access = JSON.parse(sessionStorage.getItem("specialaccess"));
  const userId = sessionStorage.getItem("userId");

  const [data, setData] = useState([]);
  const [editSurrenderCover, seteditSurrenderCover] = useState("");
  const [info, setinfo] = useState("");

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };

  const editClickOpen = (item) => {
    seteditSurrenderCover(item);
    setEditOpen(true);
  };
  const editClickClose = () => {
    setEditOpen(false);
  };

  const infoClickOpen = (item) => {
    setInfoOpen(true);
    setinfo(item);
  };

  const infoClickClose = () => {
    setInfoOpen(false);
  };

  //Pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Get All Surrender Cover Details Pas Data
  const getData = () => {
    axios
      .get(`http://localhost:8080/surrenderCoverPas/getAll/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setData(resp.data);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    axios
      .patch(
        `http://localhost:8080/surrenderCoverPas/softdelete/${id}/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        getData();
        setNotify({
          isOpen: true,
          message: "Deleted Successfully",
          type: "error",
        });
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="classTitle">
        <h2>
          {" "}
          <b>Surrender Cover Details PAS </b>{" "}
        </h2>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* <TextField
          style={{ marginLeft: 80 }}
          label="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            globalsearch(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          fullwidth
        /> */}
        {/* <Button
          variant="contained"
          style={{
            marginRight: 80,
            maxWidth: "40px",
            maxHeight: "40px",
            minWidth: "40px",
            minHeight: "40px",
            backgroundColor: "#0a3161",
          }}
        >
          <AddBoxIcon fontSize="large" onClick={() => handleClickOpen()} />
        </Button> */}
      </div>
      <Paper className="paperStyle">
        <Table striped bordered hover size="md">
          <thead className="tableheader">
            <tr>
              {/* <th>Id </th> */}
              <th>Client No</th>
              <th>Policy NO</th>
              <th>Plan Name</th>
              <th>Plan Code</th>
              <th>Cover Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((value, index) => (
                <tr>
                  {/* <td>{value.id}</td> */}
                  <td>{value.clntNum}</td>
                  <td>{value.policyNo}</td>
                  <td>{value.planName}</td>
                  <td>{value.planCode}</td>
                  <td>{value.coverStatus}</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <EditIcon
                        color="primary"
                        style={{ cursor: "pointer" }}
                        onClick={() => editClickOpen(value)}
                      />
                      <DeleteIcon
                        style={{ cursor: "pointer" }}
                        className="deleteClass"
                        color="error"
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: "Are you sure to delete this record?",
                            subTitle: "You can't undo this operation",
                            onConfirm: () => {
                              handleDelete(value.id);
                            },
                          });
                        }}
                      />
                      <InfoIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => infoClickOpen(value)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <TablePagination
          className="contentPagination"
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <Modal
        dialogAs={DraggableComponent}
        show={open}
        onHide={handleClickClose}
        centered
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title> Surrender Cover Detail PAS </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            <CoverDetailPasAdd
              open={open}
              handleClickClose={handleClickClose}
              getdata={getData}
            />
          </div>
        </Modal.Body>
      </Modal> */}

      <Modal
        dialogAs={DraggableComponent}
        show={editOpen}
        onHide={editClickClose}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title> Surrender Cover Detail Pas </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            <SurrenderCoverEdit
              open={editOpen}
              handleClickClose={editClickClose}
              data={editSurrenderCover}
              getData={getData}
              setData={seteditSurrenderCover}
              notify={notify}
              setNotify={setNotify}
            />
          </div>
        </Modal.Body>
      </Modal>
      <SurrenderCoverInfo
        open={infoOpen}
        handleClose={infoClickClose}
        data={info}
      />
      {/* <Notification notify={notify} setNotify={setNotify} /> */}
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <br />

      <div className="footerdescription">
        <h6 className="footerContent">
          Copyright © www.futurainstech.com @{moment().format("YYYY")}
        </h6>
      </div>
    </>
  );
}

export default SurrenderCoverDetails;
