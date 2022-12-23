import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { InputAdornment, TablePagination } from "@material-ui/core";
import { Button, Paper, TextField } from "@mui/material";
import "../Css/Content.css";
import moment from "moment";

import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InfoIcon from "@mui/icons-material/Info";
import Notification from "../Dialogs/Notification";
import ConfirmDialog from "../Dialogs/ConfirmDialog";
import SearchIcon from "@mui/icons-material/Search";
import { Modal } from "react-bootstrap";
import AddressAdd from "./AddressAdd";
import AddressEdit from "./AddressEdit";
import AddrerssInfo from "./AddressInfo";
import DraggableComponent from "../Service/DraggableComponent";

import AddressApi from "../Service/AddressApi";

function Address() {
  const access = JSON.parse(sessionStorage.getItem("specialaccess"));
  const userId = sessionStorage.getItem("userId");

  const [data, setData] = useState([]);
  const [addressType, setAddressType] = useState([]);
  const [info, setInfo] = useState("");
  const [editAddress, setEditAddress] = useState("");

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  console.log(access, "access");

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
    setEditAddress(item);
    setEditOpen(true);
  };
  const editClickClose = () => {
    setEditOpen(false);
  };

  const infoClickOpen = (item) => {
    setInfoOpen(true);
    setInfo(item);
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

  // get all Address
  const getData = () => {
    axios
      .get(`http://localhost:8080/address/getAll/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setData(resp.data);
      })
      .catch((err) => console.log(err));
  };

  // const getData = () => {
  //   AddressApi.getAllAddress()
  //     .then((res) => {
  //       setData(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  console.log("data ", data);
  //Delete
  const handleDelete = (oldData) => {
    console.log(oldData);
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    axios
      .patch(
        `http://localhost:8080/address/softdelete/${oldData}/${userId}`,
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
    return () => {};
  }, []);

  const rule = "addressType";

  const [addtype, setAddtype] = useState([]);

  const getaddresstype = () => {
    axios
      .get(`http://localhost:8080/param/${rule}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        setAddtype(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getaddresstype();
    return () => {};
  }, []);

  const [search, setSearch] = useState("");
  const globalsearch = (val) => {
    val === ""
      ? getData()
      : axios
          .get(`http://localhost:8080/address/search/${val}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            setData(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
  };

  return (
    <>
      <div className="classTitle">
        <h2>
          {" "}
          <b>Address</b>{" "}
        </h2>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
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
        />
        <Button
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
        </Button>
      </div>
      <Paper className="paperStyle">
        <Table striped bordered hover size="md">
          <thead className="tableheader">
            <tr>
              <th>Address Type</th>
              <th>District</th>
              <th>State</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((value, index) => (
                <tr>
                  <td>{value?.addressType}</td>
                  <td>{value?.district}</td>
                  <td>{value?.state}</td>
                  <td>{value?.country}</td>
                  <td>
                    <div style={{ display: "flex" }}>
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
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <br />
      <Modal show={infoOpen} onHide={infoClickClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title> Address Info </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            <AddrerssInfo
              dialogAs={DraggableComponent}
              open={infoOpen}
              infoClickClose={infoClickClose}
              info={info}
            />
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={open} onHide={handleClickClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title> Add Address </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            <AddressAdd
              open={open}
              dialogAs={DraggableComponent}
              handleClickClose={handleClickClose}
              getdata={getData}
              notify={notify}
              addtype={addtype}
              setNotify={setNotify}
              addressType={addressType}
            />
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={editOpen} onHide={editClickClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title> Update Address </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            <AddressEdit
              dialogAs={DraggableComponent}
              open={editOpen}
              handleClickClose={editClickClose}
              data={editAddress}
              notify={notify}
              addtype={addtype}
              setNotify={setNotify}
              getData={getData}
              setData={setEditAddress}
              addressType={addressType}
            />
          </div>
        </Modal.Body>
      </Modal>

      <div className="footerdescription">
        <h6 className="footerContent">
          Copyright © www.futurainstech.com @{moment().format("YYYY")}
        </h6>
      </div>
    </>
  );
}

export default Address;
