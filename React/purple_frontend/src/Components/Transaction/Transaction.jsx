import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import moment from "moment";

import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import SaveIcon from "@mui/icons-material/Save";
import CalculateIcon from "@mui/icons-material/Calculate";
import {
  Button,
  Paper,
  InputAdornment,
  TextField,
  IconButton,
  Tooltip,
} from "@mui/material";
import { TablePagination } from "@material-ui/core";

import ConfirmDialog from "../Dialogs/ConfirmDialog";
import Notification from "../Dialogs/Notification";
import TransactionAdd from "./TransactionAdd";
import TransactionEdit from "./TransactionEdit";
import TransactionInfo from "./TransactionInfo";
import "../Css/Content.css";
import { ca } from "date-fns/locale";

var initialValues = {
  companyId: "",
  flcPolicyNo: "",
  flcTransNo: "",
  flcReqDate: "",
  flcLogDate: "",
  uinNumber: "",
  flcPremRefund: "",
  flcTotalPrem: "",
  flcPolicyDop: "",
  penalIntrest: "",
  grossFlcPay: "",
  medicalFee: "",
  stamDuty: "",
  riskPremRecov: "",
  mortChargeRefund: "",
  totalRecov: "",
  netFlcPay: "",
  effDate: "",
  fundValue: "",
  flcApprovalDate: "",
  medicalCategory: "",
  medicalCenter: "",
  medicatTpaCode: "",
  makerFlag: "",
  checkerFlag: "",
  purpleApprovalFlag: "",
  purpleApprovalRemark: "",
  purpleApprovalDate: "",
  approvalQcUserId: "",
  interimStatus: "",
};

function Transaction() {
  const userId = sessionStorage.getItem("userId");

  const [data, setData] = useState([]);
  const [transData, settransData] = useState(initialValues);
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
    settransData({ ...transData, [name]: value });
  };

  const onChangeFlcReq = (date) => {
    settransData({ ...transData, flcReqDate: date });
  };
  const editChangeFlcReq = (date) => {
    setRecord({ ...record, flcReqDate: date });
  };
  const onChangeLogDate = (date) => {
    settransData({ ...transData, flcLogDate: date });
  };
  const onChangeEffDate = (date) => {
    settransData({ ...transData, effDate: date });
  };
  const editChangeLogDate = (date) => {
    setRecord({ ...record, flcLogDate: date });
  };
  const onChangeAppDate = (date) => {
    settransData({ ...transData, flcApprovalDate: date });
  };
  const editChangeAppDate = (date) => {
    setRecord({ ...record, flcApprovalDate: date });
  };
  const editChangeEffDate = (date) => {
    setRecord({ ...record, effDate: date });
  };
  const onChangePAD = (date) => {
    settransData({ ...transData, purpleApprovalDate: date });
  };
  const editChangePAD = (date) => {
    setRecord({ ...record, purpleApprovalDate: date });
  };

  const editClickOpen = (item) => {
    setRecord(item);
    setEditOpen(true);
  };

  const editClose = () => {
    setEditOpen(false);
  };

  const editChange = (e) => {
    let { value, name } = e.target;
    setRecord((prev) => ({ ...prev, [name]: value }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };

  const handleInfoOpen = (value) => {
    setInfo(value);
    setInfoOpen(true);
  };
  const handleInfoClose = () => {
    setInfoOpen(false);
  };

  //Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getData = () => {
    axios
      .get(`http://localhost:8080/transaction/getAll/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setData(resp.data);
      })
      .catch((err) => console.log(err));
  };

  console.log("Transaction Data ", data);

  const [companyData, setcompanyData] = useState([]);
  const getcompanyData = () => {
    axios
      .get(
        `http://localhost:8080/company/getAll/` +
          sessionStorage.getItem("userId"),
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        setcompanyData(resp.data);
      })
      .catch((err) => console.log(err));
  };
  const [policyDetails, setpolicyDetails] = useState([]);
  const getpolicyDetails = () => {
    axios
      .get(`http://localhost:8080/policyDetailsPas/getAll/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setpolicyDetails(resp.data);
      })
      .catch((err) => console.log(err));
  };

  // dropdown Tables
  const rule1 = "medicalCategory";
  const [medicalTestData, setmedicalTestData] = useState([]);
  const getmedicalTest = () => {
    axios
      .get(`http://localhost:8080/param/${rule1}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        setmedicalTestData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const rule2 = "medicalCenter";
  const [medicalCenterData, setmedicalCenterData] = useState([]);
  const getmedicalCenter = () => {
    axios
      .get(`http://localhost:8080/param/${rule2}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        setmedicalCenterData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const rule3 = "medicalTPA";
  const [medicalTpaData, setmedicalTpaData] = useState([]);
  const getmedicalTpa = () => {
    axios
      .get(`http://localhost:8080/param/${rule3}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        setmedicalTpaData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const rule4 = "afu";
  // const [afuData, setafuData] = useState([]);
  // const getAfu = () => {
  //   axios
  //     .get(`http://localhost:8080/param/${rule4}`, {
  //       headers: {
  //         Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  //       },
  //     })
  //     .then((resp) => {
  //       console.log(resp);
  //       setafuData(resp.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const rule5 = "approvalRemark";
  // const [approvalRemarkData, setapprovalRemarkData] = useState([]);
  // const getapprovalRemarkData = () => {
  //   axios
  //     .get(`http://localhost:8080/param/${rule5}`, {
  //       headers: {
  //         Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  //       },
  //     })
  //     .then((resp) => {
  //       console.log(resp);
  //       setapprovalRemarkData(resp.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const rule6 = "interimstatus";
  const [InterimStatusData, setInterimStatusData] = useState([]);
  const getInterimStatusData = () => {
    axios
      .get(`http://localhost:8080/param/${rule6}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        setInterimStatusData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
    getcompanyData();
    getpolicyDetails();
    getmedicalTest();
    getmedicalCenter();
    getmedicalTpa();
    getInterimStatusData();
    return () => {};
  }, []);

  const [transNoError, settransNoError] = useState("");

  const handleFormSubmit = () => {
    axios
      .post(
        `http://localhost:8080/transaction/add/${userId}`,
        {
          companyId: transData.companyId,
          flcPolicyNo: transData.flcPolicyNo,
          flcTransNo: transData.flcTransNo,
          flcReqDate: moment(transData.flcReqDate)
            .format("YYYYMMDD")
            .toString(),
          flcLogDate: moment(transData.flcLogDate)
            .format("YYYYMMDD")
            .toString(),
          uinNumber: transData.uinNumber,
          flcPremRefund: transData.flcPremRefund,
          flcTotalPrem: transData.flcTotalPrem,
          flcPolicyDop: transData.flcPolicyDop,
          penalIntrest: transData.penalIntrest,

          grossFlcPay: transData.grossFlcPay,
          medicalFee: transData.medicalFee,
          stamDuty: transData.stamDuty,
          riskPremRecov: transData.riskPremRecov,
          mortChargeRefund: transData.mortChargeRefund,
          totalRecov: transData.totalRecov,
          netFlcPay: transData.netFlcPay,
          fundValue: transData.fundValue,
          effDate: moment(transData.effDate).format("YYYYMMDD").toString(),
          flcApprovalDate: moment(transData.flcApprovalDate)
            .format("YYYYMMDD")
            .toString(),
          medicalCategory: transData.medicalCategory,
          medicalCenter: transData.medicalCenter,
          medicatTpaCode: transData.medicatTpaCode,
          makerFlag: transData.makerFlag,
          checkerFlag: transData.checkerFlag,
          purpleApprovalFlag: transData.purpleApprovalFlag,
          purpleApprovalRemark: transData.purpleApprovalRemark,
          interimStatus: transData.interimStatus,
          purpleApprovalDate: moment(transData.purpleApprovalDate)
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
        settransData(initialValues);
        getData();
        setNotify({
          isOpen: true,
          message: resp.data,
          type: "success",
        });
        settransNoError("");
      })
      .catch((err) => {
        console.log(err);
        settransNoError(err.response.data.message);
      });
  };
  const editFormSubmit = () => {
    axios
      .patch(
        `http://localhost:8080/transaction/update/${record.id}/${userId}`,
        {
          companyId: record.companyId,
          flcPolicyNo: record.flcPolicyNo,
          flcTransNo: record.flcTransNo,
          flcReqDate: moment(record.flcReqDate).format("YYYYMMDD").toString(),
          flcLogDate: moment(record.flcLogDate).format("YYYYMMDD").toString(),
          uinNumber: record.uinNumber,
          flcPremRefund: record.flcPremRefund,
          flcTotalPrem: record.flcTotalPrem,
          flcPolicyDop: record.flcPolicyDop,
          penalIntrest: record.penalIntrest,
          grossFlcPay: record.grossFlcPay,
          medicalFee: record.medicalFee,
          stamDuty: record.stamDuty,
          riskPremRecov: record.riskPremRecov,
          mortChargeRefund: record.mortChargeRefund,
          totalRecov: record.totalRecov,
          netFlcPay: record.netFlcPay,
          fundValue: record.fundValue,
          effDate: moment(record.effDate).format("YYYYMMDD").toString(),
          flcApprovalDate: moment(record.flcApprovalDate)
            .format("YYYYMMDD")
            .toString(),
          medicalCategory: record.medicalCategory,
          medicalCenter: record.medicalCenter,
          medicatTpaCode: record.medicatTpaCode,
          makerFlag: record.makerFlag,
          checkerFlag: record.checkerFlag,
          purpleApprovalFlag: record.purpleApprovalFlag,
          purpleApprovalRemark: record.purpleApprovalRemark,
          interimStatus: record.interimStatus,
          purpleApprovalDate: moment(record.purpleApprovalDate)
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
          message: resp.data,
          type: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        setClientNumError(err.response.data.message);
      });
  };

  const handleDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    axios
      .patch(
        `http://localhost:8080/transaction/softdelete/${id}/${userId}`,
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
          message: resp.data,
          type: "error",
        });
      });
  };

  const calculateDetails = (val) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    axios
      .post(
        `http://localhost:8080/purpledetails/add/${val}/${userId}`,
        {
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
        getData();
        setNotify({
          isOpen: true,
          message: resp.data,
          type: "error",
        });
        window.location = "purpleDetails";
      });
  };

  const [search, setSearch] = useState("");
  const globalsearch = (val) => {
    val === ""
      ? getData()
      : axios
          .get(`http://localhost:8080/transaction/search/${val}`, {
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

  const bulkApproval = () => {
    let policyNoData = [];
    data
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((value, index) => {
        if (value.selected) {
          console.log(
            "id:" + value.id,
            "selected:" + value.selected + "policynum:" + value.flcPolicyNo
          );
          policyNoData.push(value.flcPolicyNo);
        }
      });
    console.log(policyNoData, "policyNo");
    axios
      .post(
        `http://localhost:8080/purpledetails/assignMultipleTrans/${userId}`,

        policyNoData,

        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        getData();
        setNotify({
          isOpen: true,
          message: resp.data,
          type: "error",
        });
        window.location = "purpleDetails";
      });
  };

  const [calculationCheck, setcalculationCheck] = useState(true);

  const handleCheckAll = (e) => {
    const { value, checked } = e.target;

    setData((prevdata) =>
      prevdata.map((val, index) => {
        if (
          index >= page * rowsPerPage &&
          index < page * rowsPerPage + rowsPerPage
        ) {
          if (checked) {
            setcalculationCheck(false);
            return { ...val, selected: true };
          } else {
            setcalculationCheck(true);
            return { ...val, selected: false };
          }
        } else {
          return val;
        }
      })
    );
  };

  const handleCheck = (e, id) => {
    const { value, checked } = e.target;
    setData((prevdata) =>
      prevdata.map((val, index) => {
        if (
          index >= page * rowsPerPage &&
          index < page * rowsPerPage + rowsPerPage &&
          val.id === id
        ) {
          if (checked) {
            setcalculationCheck(false);
            return { ...val, selected: true };
          } else {
            setcalculationCheck(true);
            return { ...val, selected: false };
          }
        } else {
          return val;
        }
      })
    );
  };

  return (
    <>
      <div className="classTitle">
        <h2>
          {" "}
          <b>Transaction PAS</b>{" "}
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
        <Tooltip title="Proceed For Calculation">
          <Button
            onClick={() => bulkApproval()}
            disabled={calculationCheck}
            variant="contained"
            color="primary"
            style={{
              marginRight: "52rem",
              marginTop: "0.5rem",
              maxWidth: "40px",
              maxHeight: "40px",
              minWidth: "40px",
              minHeight: "40px",
            }}
          >
            <SaveIcon />
          </Button>
        </Tooltip>
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
              <th>
                Select
                <br />
                <input
                  style={{ width: "1rem", height: "1rem" }}
                  type="checkbox"
                  name="selectAll"
                  onChange={handleCheckAll}
                />
              </th>
              <th>Trans No</th>
              <th>Policy No</th>
              <th>Gross Payable</th>
              <th>Total Recovery</th>
              <th>Net Payble</th>
              <th>Req date</th>
              <th>Log Date</th>
              {/* <th>Interim Status</th> */}
              {/* <th>Calculate</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((value, index) => (
                <tr>
                  <td>
                    <input
                      style={{ width: "20px", height: "20px" }}
                      type="checkbox"
                      name={value.flcPolicyNo}
                      value={value.flcPolicyNo}
                      checked={!!value.selected}
                      onChange={(e) => {
                        handleCheck(e, value.id);
                      }}
                    />
                  </td>
                  <td>{value.flcTransNo}</td>
                  <td>{value.flcPolicyNo}</td>
                  <td>{value.grossFlcPay}</td>
                  <td>{value.totalRecov}</td>
                  <td>{value.netFlcPay}</td>
                  <td>{moment(value?.flcReqDate).format("DD-MM-YYYY")}</td>
                  <td>{moment(value?.flcLogDate).format("DD-MM-YYYY")}</td>
                  {/* <td>{value?.interimStatus}</td> */}

                  {/* <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <CalculateIcon
                        style={{ cursor: "pointer" }}
                        className="deleteClass"
                        color="success"
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title:
                              "Are you sure to process this record for calculation ?",
                            subTitle: "You can't undo this operation",
                            onConfirm: () => {
                              calculateDetails(value.flcPolicyNo);
                            },
                          });
                        }}
                      />
                    </div>
                  </td> */}

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
      <TransactionAdd
        open={open}
        handleClose={handleClickClose}
        transNoError={transNoError}
        data={transData}
        companyData={companyData}
        policyDetails={policyDetails}
        medicalTestData={medicalTestData}
        medicalCenterData={medicalCenterData}
        medicalTpaData={medicalTpaData}
        InterimStatusData={InterimStatusData}
        onChange={onChange}
        onChangeFlcReq={onChangeFlcReq}
        onChangeLogDate={onChangeLogDate}
        onChangeAppDate={onChangeAppDate}
        onChangeEffDate={onChangeEffDate}
        handleFormSubmit={() => handleFormSubmit()}
        onChangePAD={onChangePAD}
      />
      <TransactionEdit
        open={editOpen}
        handleClose={editClose}
        data={record}
        companyData={companyData}
        policyDetails={policyDetails}
        medicalTestData={medicalTestData}
        medicalCenterData={medicalCenterData}
        medicalTpaData={medicalTpaData}
        InterimStatusData={InterimStatusData}
        onChange={editChange}
        onChangeFlcReq={editChangeFlcReq}
        onChangeLogDate={editChangeLogDate}
        onChangeAppDate={editChangeAppDate}
        onChangeEffDate={editChangeEffDate}
        onChangePAD={editChangePAD}
        handleFormSubmit={() => editFormSubmit()}
      />
      <TransactionInfo
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

export default Transaction;
