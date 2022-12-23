import React from "react";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import PeopleIcon from "@mui/icons-material/People";
import ListIcon from "@mui/icons-material/List";
import { Avatar, Button, Stack } from "@mui/material";
import { TablePagination } from "@material-ui/core";
import Paper from "@mui/material/Paper";
import "../Css/Content.css";
import ConfirmDialog from "../Dialogs/ConfirmDialog";
import Notification from "../Dialogs/Notification";
import { InputAdornment, TextField } from "@mui/material";
import moment from "moment";

import SurrenderPolicyDetailsAdd from "./SurrenderPolicyDetailsAdd";
import SurrenderPolicyDetailsEdit from "./SurrenderPolicyDetailsEdit";
import SurrenderPolicyDetailsInfo from "./SurrenderPolicyDetailsInfo";
import SurrenderPolicyCoverDetails from "./SurrenderPolicyCoverDetails";

var initialValues = {
  companyId: "",
  clntNum: "",
  chdrNum: "",
  billFreq: "",
  installmentPremium: "",
  extraPremium: "",
  uinNumber: "",
  fup: "",
  docDate: "",
  laAge: "",
  phAge: "",
  statusCode: "",
  smokerFlag: "",
  createdBy: "",
  modifiedBy: "",
};

function SurrenderPolicyDetails() {
  const access = JSON.parse(sessionStorage.getItem("specialaccess"));
  const userId = sessionStorage.getItem("userId");

  const [data, setData] = useState([]);
  const [surrenderpolicyDetails, setsurrenderpolicyDetails] = useState([]);
  const [surrenderPolicyDetailsData, setsurrenderPolicyDetailsData] =
    useState(initialValues);
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
    setsurrenderPolicyDetailsData({
      ...surrenderPolicyDetailsData,
      [name]: value,
    });
  };

  // On Change Date For Add

  // const onChangeFupDate = (date) => {
  //   setsurrenderPolicyDetailsData({ ...surrenderPolicyDetailsData, fup: date });
  //   console.log(date, "Fup Date");
  // };

  const onChangeFupDate = (date) => {
    setsurrenderPolicyDetailsData({ ...surrenderPolicyDetailsData, fup: date });
  };

  const onChangedocDate = (date) => {
    setsurrenderPolicyDetailsData({
      ...surrenderPolicyDetailsData,
      docDate: date,
    });
  };

  const editChange = (e) => {
    let { value, name } = e.target;
    setRecord((prev) => ({ ...prev, [name]: value }));
  };

  // Customer Details Edit Change

  const editChangeFup = (date) => {
    setRecord({ ...record, premToDate: date });
  };

  const editChangedocDate = (date) => {
    setRecord({ ...record, docDate: date });
  };

  // Surrender Policy Covers Details
  const [coverOpen, setCoverOpen] = useState(false);
  const [policyCovers, setpolicyCovers] = useState([]);
  const [chdrId, setChdrId] = useState("");
  const [cmpId, setcmpId] = useState("");
  const [clientId, setclientId] = useState("");
  const [uniqueNo, setuniqueNo] = useState("");

  const coveropen = (value, policyId, id, client, cmp, uinNo) => {
    setCoverOpen(true);
    setChdrId(policyId);
    setclientId(client);
    setcmpId(cmp);
    getCoverDetails(policyId);
    setpolicyCovers(value);
    setuniqueNo(uinNo);
  };

  const coverclose = () => {
    setCoverOpen(false);
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

  // Get All Client details  Data
  const getData = () => {
    axios
      .get(`http://localhost:8080/surrenderpolicydetails/getall/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setData(resp.data);

        setsurrenderpolicyDetails(resp.data);
      })
      .catch((err) => console.log(err));
  };

  // Get All Client details  Data
  const [clientdata, setclientdata] = useState([]);
  const getClientData = () => {
    axios
      .get(`http://localhost:8080/SurrenderClientDetails/getAll/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setclientdata(resp.data);
      })
      .catch((err) => console.log(err));
  };

  console.log("clientData", clientdata);

  // Get All Surrender Cover details  Data By Plicy No
  const [coverDetails, setcoverDetails] = useState([]);
  const getCoverDetails = (policyId) => {
    axios
      .get(
        `http://localhost:8080/surrenderCoverPas/getByPolicyNo/${policyId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        setcoverDetails(resp.data);
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

  const [policyNoError, setpolicyNoError] = useState("");

  const handleFormSubmit = () => {
    axios
      .post(
        `http://localhost:8080/surrenderpolicydetails/add/${userId}`,
        {
          companyId: surrenderPolicyDetailsData.companyId,
          clntNum: surrenderPolicyDetailsData.clntNum,
          chdrNum: surrenderPolicyDetailsData.chdrNum,
          billFreq: surrenderPolicyDetailsData.billFreq,
          installmentPremium: surrenderPolicyDetailsData.installmentPremium,
          extraPremium: surrenderPolicyDetailsData.extraPremium,
          uinNumber: surrenderPolicyDetailsData.uinNumber,
          fup: moment(surrenderPolicyDetailsData.fup)
            .format("YYYYMMDD")
            .toString(),
          docDate: moment(surrenderPolicyDetailsData.docDate)
            .format("YYYYMMDD")
            .toString(),
          laAge: surrenderPolicyDetailsData.laAge,
          phAge: surrenderPolicyDetailsData.phAge,
          statusCode: surrenderPolicyDetailsData.statusCode,
          smokerFlag: surrenderPolicyDetailsData.smokerFlag,
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
        setsurrenderPolicyDetailsData(initialValues);
        getData();
        setNotify({
          isOpen: true,
          message: resp.data,
          type: "success",
        });
        setpolicyNoError("");
      })
      .catch((err) => {
        console.log(err);
        setpolicyNoError(err.response.data.message);
      });
  };

  const editFormSubmit = () => {
    axios
      .patch(
        `http://localhost:8080/surrenderpolicydetails/update/${record.id}/${userId}`,
        {
          companyId: record.companyId,
          clntNum: record.clntNum,
          chdrNum: record.chdrNum,
          billFreq: record.billFreq,
          installmentPremium: record.installmentPremium,
          extraPremium: record.extraPremium,
          uinNumber: record.uinNumber,
          fup: moment(record.fup).format("YYYYMMDD").toString(),
          docDate: moment(record.docDate).format("YYYYMMDD").toString(),
          laAge: record.laAge,
          phAge: record.phAge,
          statusCode: record.statusCode,
          smokerFlag: record.smokerFlag,
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
        `http://localhost:8080/surrenderpolicydetails/softdelete/${id}/${userId}`,
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
          .get(`http://localhost:8080/surrenderpolicydetails/search/${val}`, {
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

  // Dropdown tables

  const rule1 = "billFrequency";
  const [billFrequencyData, setbillFrequencyData] = useState([]);
  const getBillFrequencyData = () => {
    axios
      .get(`http://localhost:8080/param/${rule1}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        setbillFrequencyData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const rule2 = "statusType";
  const [statusCodeData, setstatusCodeData] = useState([]);
  const getStatusTypeData = () => {
    axios
      .get(`http://localhost:8080/param/${rule2}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        setstatusCodeData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const rule3 = "yesNoFlag";
  const [medicalFlagData, setmedicalFlagData] = useState([]);
  const getmedicalFlagData = () => {
    axios
      .get(`http://localhost:8080/param/${rule3}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        setmedicalFlagData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const rule4 = "yesNoFlag";
  const [smokerFlagData, setsmokerFlagData] = useState([]);
  const getsmokerFlagData = () => {
    axios
      .get(`http://localhost:8080/param/${rule4}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        setsmokerFlagData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
    getcompanyData();
    getBillFrequencyData();
    getStatusTypeData();
    getmedicalFlagData();
    getsmokerFlagData();
    getClientData();
    return () => {};
  }, []);

  return (
    <>
      <div className="classTitle">
        <h2>
          {" "}
          <b>Surrender Policy Details</b>{" "}
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
              {/* <th>Id</th> */}
              <th>Client No</th>
              <th>Policy Number</th>
              <th>Policy Status</th>
              <th>Policy Covers</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((value, index) => (
                <tr>
                  <td>{value.clntNum}</td>
                  <td>{value.chdrNum}</td>
                  <td>{value.statusCode}</td>
                  <td>
                    <ListIcon
                      color="primary"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        coveropen(
                          value.covers,
                          value.chdrNum,
                          value.id,
                          value.clntNum,
                          value.companyId
                        )
                      }
                    />
                  </td>
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
      <SurrenderPolicyDetailsAdd
        open={open}
        handleClose={handleClickClose}
        data={surrenderPolicyDetailsData}
        clientdata={clientdata}
        policyNoError={policyNoError}
        companyData={companyData}
        billFrequencyData={billFrequencyData}
        statusCodeData={statusCodeData}
        smokerFlagData={smokerFlagData}
        onChange={onChange}
        onChangeFupDate={onChangeFupDate}
        onChangedocDate={onChangedocDate}
        handleFormSubmit={() => handleFormSubmit()}
      />
      <SurrenderPolicyDetailsEdit
        open={editOpen}
        handleClose={editClose}
        data={record}
        clientdata={clientdata}
        policyNoError={policyNoError}
        companyData={companyData}
        billFrequencyData={billFrequencyData}
        statusCodeData={statusCodeData}
        smokerFlagData={smokerFlagData}
        onChange={editChange}
        onChangeFup={editChangeFup}
        onChangedocDate={editChangeFup}
        handleFormSubmit={() => editFormSubmit()}
      />
      <SurrenderPolicyDetailsInfo
        open={infoOpen}
        handleClose={handleInfoClose}
        data={info}
      />

      <SurrenderPolicyCoverDetails
        open={coverOpen}
        close={coverclose}
        policyCovers={policyCovers}
        coverDetails={coverDetails}
        setpolicyCovers={setpolicyCovers}
        policyDetails={surrenderpolicyDetails}
        setpolicyDetails={setsurrenderpolicyDetails}
        getAll={getData}
        chdrId={chdrId}
        cmpId={cmpId}
        clientId={clientId}
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

export default SurrenderPolicyDetails;
