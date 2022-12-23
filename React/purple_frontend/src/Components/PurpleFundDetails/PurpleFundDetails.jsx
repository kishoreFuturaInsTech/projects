import React from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar, Button, Stack } from "@mui/material";
import { TablePagination } from "@material-ui/core";
import Paper from "@mui/material/Paper";
import moment from "moment";
import "../Css/Content.css";
import { Modal } from "react-bootstrap";
import ConfirmDialog from "../Dialogs/ConfirmDialog";
import Notification from "../Dialogs/Notification";
import InfoIcon from "@mui/icons-material/Info";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { useEffect, useState } from "react";
import QualityChecking from "../Screen/QualityChecking";
import PurpleFundDetailsEdit from "./PurpleFundDetailsEdit";
import PurpleFundDetailsInfo from "./PurpleFundDetailsInfo";

var initialValues = {
  companyId: "",
  policyNo: "",
  purpleFundCode: "",
  purpleFundName: "",
  purpleNavDate: "",
  purpleUnits: "",
  purpleRateApp: "",
  purpleFundValue: "",
  remark: "",
};

function PurpleFundDetails() {
  const access = JSON.parse(sessionStorage.getItem("specialaccess"));
  const userId = sessionStorage.getItem("userId");

  const [data, setData] = useState([]);
  const [purpleFundDetailsData, setpurpleFundDetailsData] =
    useState(initialValues);
  const [record, setRecord] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [info, setInfo] = useState("");
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

  const editChangenavDate = (date) => {
    setRecord({ ...record, purpleNavDate: date });
  };

  const editChange = (e) => {
    let { value, name } = e.target;
    setRecord((prev) => ({ ...prev, [name]: value }));
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

  const getData = () => {
    axios
      .get(`http://localhost:8080/purplefunddetails/getall/${userId}`, {
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

  const editChangeendDate = (date) => {
    setRecord({ ...record, endDate: date });
  };

  const [chdrData, setchdrData] = useState([]);
  const getchdrData = () => {
    axios
      .get(`http://localhost:8080/chdr/getAll/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setchdrData(resp.data);
      })
      .catch((err) => console.log(err));
  };

  const rule1 = "fundCode";
  const [fundCodeData, setfundCodeData] = useState([]);
  const getfundCodeData = () => {
    axios
      .get(`http://localhost:8080/param/${rule1}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        setfundCodeData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const rule2 = "fundName";
  const [fundNameData, setfundNameData] = useState([]);
  const getfundNameData = () => {
    axios
      .get(`http://localhost:8080/param/${rule1}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        setfundNameData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [search, setSearch] = useState("");
  const globalsearch = (val) => {
    val === ""
      ? getData()
      : axios
          .get(`http://localhost:8080/purplefunddetails/search/${val}`, {
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

  const editFormSubmit = () => {
    axios
      .patch(
        `http://localhost:8080/purplefunddetails/update/${record.id}/${userId}`,
        {
          companyId: record.companyId,
          policyNo: record.policyNo,
          purpleFundCode: record.purpleFundCode,
          purpleFundName: record.purpleFundName,
          purpleNavDate: moment(record.purpleNavDate)
            .format("YYYYMMDD")
            .toString(),
          purpleUnits: record.purpleUnits,
          purpleRateApp: record.purpleRateApp,
          purpleFundValue: record.purpleFundValue,
          remark: record.remark,
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
        `http://localhost:8080/purplefunddetails/softdelete/${id}/${userId}`,
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
    getcompanyData();
    getchdrData();
    getfundCodeData();
    getfundNameData();
    return () => {};
  }, []);

  return (
    <div>
      <div className="classTitle">
        <h2>
          {" "}
          <b>IPCA Fund Details</b>{" "}
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
              <th>Policy Number</th>
              <th>Fund Code</th>
              <th>Fund Name </th>
              <th>Units</th>
              <th>Rate App</th>
              <th>Fund Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((value, index) => (
                <tr>
                  {/* <td>{value.id}</td> */}
                  <td>{value.policyNo}</td>
                  <td>{value.purpleFundCode}</td>
                  <td>{value.purpleFundName}</td>
                  <td>{value.purpleUnits}</td>
                  <td>{value.purpleRateApp}</td>
                  <td>{value.purpleFundValue}</td>
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

      <PurpleFundDetailsEdit
        open={editOpen}
        handleClose={editClose}
        companyData={companyData}
        chdrData={chdrData}
        fundCodeData={fundCodeData}
        fundNameData={fundNameData}
        data={record}
        editChangenavDate={editChangenavDate}
        onChange={editChange}
        handleFormSubmit={() => editFormSubmit()}
      />
      <PurpleFundDetailsInfo
        open={infoOpen}
        handleClose={handleInfoClose}
        data={info}
      />

      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  );
}

export default PurpleFundDetails;
