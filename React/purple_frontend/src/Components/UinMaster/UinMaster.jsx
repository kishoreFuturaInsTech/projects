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
import { InputAdornment, TextField } from "@mui/material";
import moment from "moment";
import "../Css/Content.css";
import ConfirmDialog from "../Dialogs/ConfirmDialog";
import Notification from "../Dialogs/Notification";
import UinMasterAdd from "./UinMasterAdd";
import UinMasterEdit from "./UinMasterEdit";
import UinMasterInfo from "./UinMasterInfo";

var initialValues = {
  companyId: "",
  uinNumber: "",
  planName: "",
  planCode: "",
  productType: "",
  gsvFactor: "",
  gsvCashValue: "",
  ssvFactor: "",
  startDate: "",
  endDate: "",
};

function UinMaster() {
  const access = JSON.parse(sessionStorage.getItem("specialaccess"));
  const userId = sessionStorage.getItem("userId");
  const [data, setData] = useState([]);
  const [uinMasterData, setUinMasterData] = useState(initialValues);
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

  const onChange = (e) => {
    const { value, name } = e.target;
    setUinMasterData({ ...uinMasterData, [name]: value });
  };

  const onChangestartDate = (date) => {
    setUinMasterData({ ...uinMasterData, startDate: date });
  };
  const onChangeendDate = (date) => {
    setUinMasterData({ ...uinMasterData, endDate: date });
  };

  const editChange = (e) => {
    let { value, name } = e.target;
    setRecord((prev) => ({ ...prev, [name]: value }));
  };

  const editChangestartDate = (date) => {
    setRecord({ ...record, startDate: date });
  };

  const editChangeendDate = (date) => {
    setRecord({ ...record, endDate: date });
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

  // Get All Mortality  Details Pas Data
  const getData = () => {
    axios
      .get(`http://localhost:8080/uinMaster/getall/${userId}`, {
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
        `http://localhost:8080/uinMaster/add/${userId}`,
        {
          companyId: uinMasterData.companyId,
          uinNumber: uinMasterData.uinNumber,
          planName: uinMasterData.planName,
          planCode: uinMasterData.planCode,
          productType: uinMasterData.productType,
          gsvFactor: uinMasterData.gsvFactor,
          gsvCashValue: uinMasterData.gsvCashValue,
          ssvFactor: uinMasterData.ssvFactor,
          startDate: moment(uinMasterData.startDate)
            .format("YYYYMMDD")
            .toString(),
          endDate: moment(uinMasterData.endDate)
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
        setUinMasterData(initialValues);
        getData();
        setNotify({
          isOpen: true,
          message: resp.data,
          type: "success",
        });
      })
      .catch((err) => console.log(err));
  };

  const editFormSubmit = () => {
    axios
      .patch(
        `http://localhost:8080/uinMaster/update/${record.id}/${userId}`,
        {
          companyId: record.companyId,
          uinNumber: record.uinNumber,
          planName: record.planName,
          planCode: record.planCode,
          productType: record.productType,
          gsvFactor: record.gsvFactor,
          gsvCashValue: record.gsvCashValue,
          ssvFactor: record.ssvFactor,
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
        `http://localhost:8080/uinMaster/softdelete/${id}/${userId}`,
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
          .get(`http://localhost:8080/uinMaster/search/${val}`, {
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
    <div>
      <div className="classTitle">
        <h2>
          {" "}
          <b>UIN Master</b>{" "}
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
              <th>Plan Code </th>
              <th>Prodect Type</th>
              <th>GSV Factor</th>
              <th>GSV Cash Value</th>
              <th>SSV Factor</th>
              <th>Action</th>
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
                  <td>{value.productType}</td>
                  <td>{value.gsvFactor}</td>
                  <td>{value.gsvCashValue}</td>
                  <td>{value.ssvFactor}</td>
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
      <UinMasterAdd
        open={open}
        handleClose={handleClickClose}
        data={uinMasterData}
        companyData={companyData}
        onChange={onChange}
        onChangestartDate={onChangestartDate}
        onChangeendDate={onChangeendDate}
        handleFormSubmit={() => handleFormSubmit()}
      />
      <UinMasterEdit
        open={editOpen}
        handleClose={editClose}
        data={record}
        companyData={companyData}
        onChange={editChange}
        editChangestartDate={editChangestartDate}
        editChangeendDate={editChangeendDate}
        handleFormSubmit={() => editFormSubmit()}
      />
      <UinMasterInfo
        open={infoOpen}
        handleClose={handleInfoClose}
        data={info}
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
    </div>
  );
}

export default UinMaster;
