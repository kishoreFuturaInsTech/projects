import React from "react";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Button, Stack } from "@mui/material";
import { TablePagination } from "@material-ui/core";
import Paper from "@mui/material/Paper";
import "../Css/Content.css";
import ConfirmDialog from "../Dialogs/ConfirmDialog";
import Notification from "../Dialogs/Notification";
import { InputAdornment, TextField } from "@mui/material";
import moment from "moment";
import GsvAdd from "./GsvAdd";
import GsvEdit from "./GsvEdit";
import GsvInfo from "./GsvInfo";

var initialValues = {
  companyId: "",
  uinNumber: "",
  planName: "",
  planCode: "",
  policyDuration: "",
  rate: "",
  policyTerm: "",
  premiumTerm: "",
  premiumType: "",
  startDate: "",
  endDate: "",
};

function Gsv() {
  const userId = sessionStorage.getItem("userId");

  const [data, setData] = useState([]);
  const [gsvData, setGsvData] = useState(initialValues);
  const [record, setRecord] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [info, setInfo] = useState("");
  const [open, setOpen] = useState(false);
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

  const onChange = (e) => {
    const { value, name } = e.target;
    setGsvData({ ...gsvData, [name]: value });
  };

  // Customer Details On Change Date

  const onChangeStartDate = (date) => {
    setGsvData({ ...gsvData, startDate: date });
  };

  const onChangeEndDate = (date) => {
    setGsvData({ ...gsvData, endDate: date });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };

  const editClickOpen = (item) => {
    setRecord(item);
    setEditOpen(true);
  };

  const editClose = () => {
    setEditOpen(false);
  };

  const handleInfoOpen = (value) => {
    setInfo(value);
    setInfoOpen(true);
  };
  const handleInfoClose = () => {
    setInfoOpen(false);
  };

  const editChange = (e) => {
    let { value, name } = e.target;
    setRecord((prev) => ({ ...prev, [name]: value }));
  };

  const editChangeStartDate = (date) => {
    setRecord({ ...record, startDate: date });
  };
  const editChangeEndDate = (date) => {
    setRecord({ ...record, endDate: date });
  };

  // Customer Details Edit Change

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

  // Get All Client details Pas Data
  const getData = () => {
    axios
      .get(`http://localhost:8080/gsv/getAll/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setData(resp.data);
      })
      .catch((err) => console.log(err));
  };

  const [companyData, setcompanyData] = useState([]);
  const getcompanyData = () => {
    axios
      .get(`http://localhost:8080/company/getAll/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setcompanyData(resp.data);
      })
      .catch((err) => console.log(err));
  };

  const handleFormSubmit = () => {
    axios
      .post(
        `http://localhost:8080/gsv/add/${userId}`,
        {
          companyId: gsvData.companyId,
          uinNumber: gsvData.uinNumber,
          planName: gsvData.planName,
          planCode: gsvData.planCode,
          policyDuration: gsvData.policyDuration,
          rate: gsvData.rate,
          policyTerm: gsvData.policyTerm,
          premiumTerm: gsvData.premiumTerm,
          premiumType: gsvData.premiumType,
          startDate: moment(gsvData.startDate)
            .format("YYYYMMDD")
            .toString(),
          endDate: moment(gsvData.endDate)
            .format("YYYYMMDD")
            .toString(),
          createdBy: userId,
          modifiedBy: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        handleClickClose();
        setGsvData(initialValues);
        getData();
        setNotify({
          isOpen: true,
          message: resp.data,
          type: "success",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editFormSubmit = () => {
    axios
      .patch(
        `http://localhost:8080/gsv/update/${record.id}/${userId}`,
        {
          companyId: record.companyId,
          uinNumber: record.uinNumber,
          planName: record.planName,
          planCode: record.planCode,
          policyDuration: record.policyDuration,
          rate: record.rate,
          policyTerm: record.policyTerm,
          premiumTerm: record.premiumTerm,
          premiumType: record.premiumType,
          startDate: moment(record.startDate)
            .format("YYYYMMDD")
            .toString(),
          endDate: moment(record.endDate)
            .format("YYYYMMDD")
            .toString(),
          createdBy: userId,
          modifiedBy: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        editClose();
        getData();
        setNotify({
          isOpen: true,
          message: "Updated Successfully",
          type: "success",
        });
        setRecord(record);
      })
      .catch((err) => {
        console.log(err);
        getData();
      });
  };

  const handleDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    axios
      .patch(
        `http://localhost:8080/gsv/softdelete/${id}/${userId}`,
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

  const [search, setSearch] = useState("");
  const globalsearch = (val) => {
    val === ""
      ? getData()
      : axios
          .get(`http://localhost:8080/gsv/search/${val}`, {
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

  useEffect(() => {
    getData();
    getcompanyData();
    return () => {};
  }, []);

  return (
    <>
      <div className="classTitle">
        <h2>
          {" "}
          <b>GSV Factor</b>{" "}
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
              <th>UIN Number</th>
              <th>Plan Name</th>
              <th>Plan Code</th>
              <th>Years To Maturity</th>
              <th>CVB Rate</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((value, index) => (
                <tr>
                  <td>{value.uinNumber}</td>
                  <td>{value.planName}</td>
                  <td>{value.planCode}</td>
                  <td>{value.policyDuration}</td>
                  <td>{value.rate}</td>
                  <td>{moment(value.startDate).format("DD-MM-YYYY")}</td>
                  <td>{moment(value.endDate).format("DD-MM-YYYY")}</td>
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
                        onClick={() => handleInfoOpen(value)}
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
      <GsvAdd
        companyData={companyData}
        open={open}
        handleClose={handleClickClose}
        data={gsvData}
        onChange={onChange}
        onChangeStartDate={onChangeStartDate}
        onChangeEndDate={onChangeEndDate}
        handleFormSubmit={() => handleFormSubmit()}
      />
      <GsvEdit
        companyData={companyData}
        open={editOpen}
        handleClose={editClose}
        data={record}
        onChange={editChange}
        onChangeStartDate={editChangeStartDate}
        onChangeEndDate={editChangeEndDate}
        handleFormSubmit={() => editFormSubmit()}
      />
      <GsvInfo
        open={infoOpen}
        handleClose={handleInfoClose}
        data={info}
        companyData={companyData}
      />
      <Notification notify={notify} setNotify={setNotify} />
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

export default Gsv;
