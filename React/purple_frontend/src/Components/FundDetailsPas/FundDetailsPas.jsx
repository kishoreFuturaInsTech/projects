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
import FundDetailsPasAdd from "./FundDetailsPasAdd";
import FundDetailsPasEdit from "./FundDetailsPasEdit";
import FundDetailsPasInfo from "./FundDetailsPasInfo";

var initialValues = {
  companyId: "",
  chdrNum: "",
  fundCode: "",
  fundName: "",
  navDate: "",
  units: "",
  rateApp: "",
  value: "",
};

function FundDetailsPas() {
  const access = JSON.parse(sessionStorage.getItem("specialaccess"));
  const userId = sessionStorage.getItem("userId");
  const [data, setData] = useState([]);
  const [fundDetailsPasData, setFundDetailsPasData] = useState(initialValues);
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
    setFundDetailsPasData({ ...fundDetailsPasData, [name]: value });
  };

  const onChangeNavDate = (date) => {
    setFundDetailsPasData({ ...fundDetailsPasData, navDate: date });
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

  // Customer Details Edit Change

  const editChangeNavDate = (date) => {
    setRecord({ ...record, navDate: date });
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

  // Get All Fund details Pas Data
  const getData = () => {
    axios
      .get(`http://localhost:8080/funddetails/getall/${userId}`, {
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

  const [policyData, setpolicyData] = useState([]);
  const getpolicyData = () => {
    axios
      .get(`http://localhost:8080/policyDetailsPas/getAll/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setpolicyData(resp.data);
      })
      .catch((err) => console.log(err));
  };

  const handleFormSubmit = () => {
    axios
      .post(
        `http://localhost:8080/funddetails/add/${userId}`,
        {
          companyId: fundDetailsPasData.companyId,
          chdrNum: fundDetailsPasData.chdrNum,
          fundCode: fundDetailsPasData.fundCode,
          fundName: fundDetailsPasData.fundName,
          navDate: moment(fundDetailsPasData.navDate)
            .format("YYYYMMDD")
            .toString(),
          units: fundDetailsPasData.units,
          rateApp: fundDetailsPasData.rateApp,
          value: fundDetailsPasData.value,
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
        setFundDetailsPasData(initialValues);
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
        `http://localhost:8080/funddetails/update/${record.id}/${userId}`,
        {
          companyId: record.companyId,
          chdrNum: record.chdrNum,
          fundCode: record.fundCode,
          fundName: record.fundName,
          navDate: moment(record.navDate).format("YYYYMMDD").toString(),
          units: record.units,
          rateApp: record.rateApp,
          value: record.value,
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
        `http://localhost:8080/funddetails/softdelete/${id}/${userId}`,
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
          .get(`http://localhost:8080/funddetails/search/${val}`, {
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
      .get(`http://localhost:8080/param/${rule2}`, {
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

  useEffect(() => {
    getData();
    getcompanyData();
    getfundCodeData();
    getfundNameData();
    getpolicyData();
    return () => {};
  }, []);

  return (
    <>
      <div className="classTitle">
        <h2>
          {" "}
          <b>Fund Details PAS</b>{" "}
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
              {/* <th>Id </th>
              <th>Company Id</th> */}
              <th>Policy No</th>
              <th>Fund Code</th>
              <th>Fund Name</th>
              <th>Nav Date</th>
              <th>Units</th>
              <th>Rate</th>
              <th>Actions</th>
              {/* <th>Info</th> */}
            </tr>
          </thead>
          <tbody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((value, index) => (
                <tr>
                  {/* <td>{value.id}</td>
                  <td>{value.companyId}</td> */}
                  <td>{value?.chdrNum}</td>
                  <td>{value?.fundCode}</td>
                  <td>{value?.fundName}</td>
                  <td>{moment(value?.navDate).format("DD-MM-YYYY")}</td>
                  <td>{value?.units}</td>
                  <td>{value?.rateApp}</td>
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
                  {/* <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <InfoIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => handleInfoOpen(value)}
                      />
                    </div>
                  </td> */}
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
      <FundDetailsPasAdd
        open={open}
        handleClose={handleClickClose}
        data={fundDetailsPasData}
        companyData={companyData}
        policyData={policyData}
        onChange={onChange}
        fundCodeData={fundCodeData}
        fundNameData={fundNameData}
        onChangeNavDate={onChangeNavDate}
        handleFormSubmit={() => handleFormSubmit()}
      />
      <FundDetailsPasEdit
        open={editOpen}
        handleClose={editClose}
        data={record}
        companyData={companyData}
        policyData={policyData}
        onChange={editChange}
        fundCodeData={fundCodeData}
        fundNameData={fundNameData}
        onChangeNavDate={editChangeNavDate}
        handleFormSubmit={() => editFormSubmit()}
      />
      <FundDetailsPasInfo
        open={infoOpen}
        companyData={companyData}
        policyData={policyData}
        fundCodeData={fundCodeData}
        fundNameData={fundNameData}
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
    </>
  );
}

export default FundDetailsPas;
