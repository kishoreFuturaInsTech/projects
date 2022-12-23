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
import PurpleDetailsInfo from "./PurpleDetailsInfo";
import PurpleDetailsAdd from "./PurpleDetailsAdd";
import PurpleDetailsEdit from "./PurpleDetailsEdit";
import PurpleDetailAdd from "./PurpleDetailAdd";
import QualityChecking from "../Screen/QualityChecking";

var initialValues = {
  companyId: "",
  company: "",
  trandate: "",
  policyNo: "",
  chdr: "",
  tranNo: "",
  totlPremium: "",
  avalSuspense: "",
  penalInterest: "",
  medicalFee: "",
  stampDuty: "",
  mortCharge: "",
  grossPayable: "",
  recoveries: "",
  netPayable: "",
  pfFlag: "",
  pfRemarks: "",
  approvFlag: "",
  approvRemarks: "",
  approvDate: "",
  pfFlagUpdate: "",
};

function PurpleDetails() {
  const [data, setData] = useState([]);
  const [purpleData, setpurpleData] = useState(initialValues);
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

    setpurpleData({ ...purpleData, [name]: value });
  };

  const onChangeTranDate = (date) => {
    setpurpleData({ ...purpleData, trandate: date });
  };
  const onChangeApprovDate = (date) => {
    setpurpleData({ ...purpleData, approvDate: date });
  };
  const editChangeTranDate = (date) => {
    setRecord({ ...record, trandata: date });
  };
  const editChangeApprovDate = (date) => {
    setRecord({ ...record, approvDate: date });
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
    console.log(value, "value");
    console.log(name);
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
      .get(
        `http://localhost:8080/purpledetails/getAllQCPending/` +
          sessionStorage.getItem("userId"),
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        setData(resp.data);
      })
      .catch((err) => console.log(err));
  };

  console.log("Data ", data);

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

  const [policyNoData, setpolicyNoData] = useState([]);
  const getpolicyNoData = () => {
    axios
      .get(`http://localhost:8080/transaction/getAllPOlicyNo/`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setpolicyNoData(resp.data);
      })
      .catch((err) => console.log(err));
  };

  const [policyData, setpolicyData] = useState([]);
  const getpolicyData = () => {
    axios
      .get(
        `http://localhost:8080/chdr/getAll/` + sessionStorage.getItem("userId"),
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        setpolicyData(resp.data);
      })
      .catch((err) => console.log(err));
  };

  const [pf, setpf] = useState([]);
  const rule1 = "passFailFlag";
  const getpf = () => {
    axios
      .get(`http://localhost:8080/param/${rule1}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setpf(resp.data);
      })
      .catch((err) => console.log(err));
  };

  const [yn, setyn] = useState([]);
  const rule2 = "approvFlag";
  const getyn = () => {
    axios
      .get(`http://localhost:8080/param/${rule2}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setyn(resp.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
    getcompanyData();
    getpolicyData();
    getpolicyNoData();
    getpf();
    getyn();
    return () => {};
  }, []);

  const userId = sessionStorage.getItem("userId");

  // const handleFormSubmit = () => {
  //   axios
  //     .post(
  //       `http://localhost:8080/purpledetails/add/${userId}`,
  //       {
  //         companyId: purpleData.companyId,
  //         trandata: moment(purpleData.trandata).format("YYYYMMDD").toString(),
  //         policyNo: purpleData.policyNo,
  //         tranNo: purpleData.tranNo,
  //         totlPremium: purpleData.totlPremium,
  //         avalSuspense: purpleData.avalSuspense,
  //         penalInterest: purpleData.penalInterest,
  //         medicalFee: purpleData.medicalFee,
  //         stampDuty: purpleData.stampDuty,
  //         mortCharge: purpleData.mortCharge,
  //         grossPayable: purpleData.grossPayable,
  //         recoveries: purpleData.recoveries,
  //         netPayable: purpleData.netPayable,
  //         pfFlag: purpleData.pfFlag,
  //         pfRemarks: purpleData.pfRemarks,
  //         approvFlag: purpleData.approvFlag,
  //         approvRemarks: purpleData.approvRemarks,
  //         approvDate: moment(purpleData.approvDate)
  //           .format("YYYYMMDD")
  //           .toString(),
  //         pfFlagUpdate: purpleData.pfFlagUpdate,
  //         createdBy: userId,
  //         modifiedBy: userId,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  //         },
  //       }
  //     )
  //     .then((resp) => {
  //       console.log(resp);
  //       handleClickClose();
  //       setpurpleData(initialValues);
  //       getData();
  //       setNotify({
  //         isOpen: true,
  //         message: resp.data,
  //         type: "success",
  //       });
  //     })
  //     .catch((err) => console.log(err));
  // };

  const handleFormSubmit = () => {
    axios
      .post(
        `http://localhost:8080/purpledetails/add/${purpleData.policyNo}/${userId}`,
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
        handleClickClose();
        setpurpleData(initialValues);
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
        `http://localhost:8080/purpledetails/update/${record.id}/${userId}`,
        {
          companyId: record.companyId,
          trandate: moment(record.trandate).format("YYYYMMDD").toString(),
          policyNo: record.policyNo,
          tranNo: record.tranNo,
          totlPremium: record.totlPremium,
          avalSuspense: record.avalSuspense,
          penalInterest: record.penalInterest,
          medicalFee: record.medicalFee,
          stampDuty: record.stampDuty,
          mortCharge: record.mortCharge,
          grossPayable: record.grossPayable,
          recoveries: record.recoveries,
          netPayable: record.netPayable,
          pfFlag: record.pfFlag,
          pfRemarks: record.pfRemarks,
          approvFlag: record.approvFlag,
          approvRemarks: record.approvRemarks,
          approvDate: moment(record.approvDate).format("YYYYMMDD").toString(),
          pfFlagUpdate: record.pfFlagUpdate,
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

  console.log(record.TranDate, "date");

  const handleDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    axios
      .patch(
        `http://localhost:8080/purpledetails/softdelete/${id}/${sessionStorage.getItem(
          "userId"
        )}`,
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

  const [qc, setqc] = useState([]);
  const [qcOpen, setqcOpen] = useState(false);
  const qualityCheckingOpen = (val) => {
    setqcOpen(true);
    setqc(val);
  };

  const qualityCheckingClose = () => {
    setqcOpen(false);
  };

  const [search, setSearch] = useState("");
  const globalsearch = (val) => {
    val === ""
      ? getData()
      : axios
          .get(`http://localhost:8080/purpledetails/search/${val}`, {
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
      {qcOpen === true ? (
        <QualityChecking
          open={qcOpen}
          close={() => qualityCheckingClose()}
          data={qc}
          getData={getData}
        />
      ) : (
        <>
          <div className="classTitle">
            <h2>
              {" "}
              <b>Payout Result</b>{" "}
            </h2>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              style={{ marginLeft: 80 }}
              label="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                second;
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
          <AddBoxIcon  fontSize="large" onClick={() => handleClickOpen()} />
        </Button> */}
          </div>
          <Paper className="paperStyle">
            <Table striped bordered hover size="md">
              <thead className="tableheader">
                <tr>
                  {/* <th>Id </th> */}
                  <th>Policy No.</th>
                  <th>Transaction No.</th>
                  <th>Gross Payable</th>
                  <th>Recoveries</th>
                  <th>Net Payable</th>
                  <th>Result</th>
                  <th>Quality Checking</th>
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
                      <td>{value.tranNo}</td>
                      <td>{value.grossPayable}</td>
                      <td>{value.recoveries}</td>
                      <td>{value.netPayable}</td>
                      <td>{value.pfFlag}</td>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <PendingActionsIcon
                            style={{ cursor: "pointer" }}
                            className="deleteClass"
                            color="primary"
                            onClick={() => {
                              qualityCheckingOpen(value);
                            }}
                          />
                        </div>
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
                          {/* <DeleteIcon
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
                      /> */}
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
          {/* <PurpleDetailsAdd
        open={open}
        handleClose={handleClickClose}
        data={purpleData}
        companyData={companyData}
        policyData={policyData}
        policyNoData={policyNoData}
        pf={pf}
        yn={yn}
        onChange={onChange}
        onChangeTranDate={onChangeTranDate}
        onChangeApprovDate={onChangeApprovDate}
        handleFormSubmit={() => handleFormSubmit()}
      /> */}
          <PurpleDetailAdd
            open={open}
            handleClose={handleClickClose}
            data={purpleData}
            policyNoData={policyNoData}
            onChange={onChange}
            handleFormSubmit={() => handleFormSubmit()}
          />
          <PurpleDetailsEdit
            open={editOpen}
            handleClose={editClose}
            data={record}
            companyData={companyData}
            policyData={policyData}
            pf={pf}
            yn={yn}
            onChange={editChange}
            onChangeTranDate={editChangeTranDate}
            onChangeApprovDate={editChangeApprovDate}
            handleFormSubmit={() => editFormSubmit()}
          />
          <PurpleDetailsInfo
            open={infoOpen}
            handleClose={handleInfoClose}
            data={info}
            companyData={companyData}
          />

          {/* <Modal show={qcOpen} onHide={qualityCheckingClose} centered size="xl">
        <QualityChecking open={qcOpen} close={qualityCheckingClose} data={qc} />
      </Modal> */}

          {/* <Modal show={qcOpen} onHide={qualityCheckingClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Quality Checking</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <QualityChecking
            open={qcOpen}
            close={qualityCheckingClose}
            data={qc}
          />
        </Modal.Body>
      </Modal> */}

          <Notification notify={notify} setNotify={setNotify} />
          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />
          <br />
        </>
      )}

      <div className="footerdescription">
        <h6 className="footerContent">
          Copyright © www.futurainstech.com @{moment().format("YYYY")}
        </h6>
      </div>
    </>
  );
}

export default PurpleDetails;
