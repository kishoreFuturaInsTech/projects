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

import SurrenderQC from "../Screen/SurrenderQC";
import IPCASurrenderEdit from "./IPCASurrenderEdit";
import IPCASurrenderInfo from "./IPCASurrenderInfo";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

var initialValues = {
  companyId: "",
  policyNo: "",
  transNo: "",
  uinNumber: "",
  reqDate: "",
  logDate: "",
  noOfDues: "",
  totalPremium: "",
  valueOfbonus: "",
  cvbFactor: "",
  gsvFactor: "",
  gsvGross: "",
  sbPaid: "",
  gsvNet: "",
  paidUpValue: "",
  reversionaryBonus: "",
  guaranteedBonus: "",
  terminalBonus: "",
  ssvGrossAmount: "",
  ssvFactor: "",
  ssvNet: "",
  ssvOrGsv: "",
  fundValue: "",
  effDate: "",
  policyDeposite: "",
  penalIntrest: "",
  grossPay: "",
  cdaCharge: "",
  otherRecovery: "",
  tds: "",
  totalRecovery: "",
  netPayable: "",
  makerFlag: "",
  checkerFlag: "",
  pfFlag: "",
  pfRemarks: "",
  purpleApprovalFlag: "",
  purpleApprovalRemark: "",
  purpleApprovalDate: "",
  approvalQcUserId: "",
  interimStatus: "",
  approvDate: "",
};

function IPCASurrender() {
  const userId = sessionStorage.getItem("userId");

  const [data, setData] = useState([]);
  const [ipcaSurrenderData, setipcaSurrenderData] = useState(initialValues);
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

  const editChangeReqDate = (date) => {
    setRecord({ ...record, reqDate: date });
  };
  const editChangeLogDate = (date) => {
    setRecord({ ...record, logDate: date });
  };
  const editChangeEffDate = (date) => {
    setRecord({ ...record, effDate: date });
  };
  const editChangeAppDate = (date) => {
    setRecord({ ...record, approvDate: date });
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

  // Get All IPCA Surrender Data
  const getData = () => {
    axios
      .get(
        `http://localhost:8080/ipcaSurrender/getAllQCPending/` +
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

  const [passFail, setpassFail] = useState([]);
  const rule1 = "passFailFlag";
  const getpassFail = () => {
    axios
      .get(`http://localhost:8080/param/${rule1}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setpassFail(resp.data);
      })
      .catch((err) => console.log(err));
  };

  const editFormSubmit = () => {
    axios
      .patch(
        `http://localhost:8080/ipcaSurrender/update/${record.id}/${userId}`,
        {
          companyId: record.companyId,
          policyNo: record.policyNo,
          tranNo: record.tranNo,
          uinNumber: record.uinNumber,
          reqDate: moment(record.reqDate)
            .format("YYYYMMDD")
            .toString(),
          logDate: moment(record.logDate)
            .format("YYYYMMDD")
            .toString(),
          noOfDues: record.noOfDues,
          totalPremium: record.totalPremium,
          valueOfbonus: record.valueOfbonus,
          cvbFactor: record.cvbFactor,
          gsvFactor: record.gsvFactor,
          gsvGross: record.gsvGross,
          sbPaid: record.sbPaid,
          gsvNet: record.gsvNet,
          paidUpValue: record.paidUpValue,
          reversionaryBonus: record.reversionaryBonus,
          guaranteedBonus: record.guaranteedBonus,
          terminalBonus: record.terminalBonus,
          ssvGrossAmount: record.ssvGrossAmount,
          ssvFactor: record.ssvFactor,
          ssvNet: record.ssvNet,
          ssvOrGsv: record.ssvOrGsv,
          fundValue: record.fundValue,
          effDate: moment(record.effDate)
            .format("YYYYMMDD")
            .toString(),
          policyDeposite: record.policyDeposite,
          penalIntrest: record.penalIntrest,
          grossPay: record.grossPay,
          cdaCharge: record.cdaCharge,
          otherRecovery: record.otherRecovery,
          tds: record.tds,
          totalRecovery: record.totalRecovery,
          netPayable: record.netPayable,
          makerFlag: record.makerFlag,
          checkerFlag: record.checkerFlag,
          pfFlag: record.pfFlag,
          pfRemarks: record.pfRemarks,
          purpleApprovalFlag: record.purpleApprovalFlag,
          purpleApprovalRemark: record.purpleApprovalRemark,
          approvFlag: record.approvFlag,
          approvRemarks: record.approvRemarks,
          purpleApprovalDate: moment(record.purpleApprovalDate)
            .format("YYYYMMDD")
            .toString(),
          approvDate: moment(record.approvDate)
            .format("YYYYMMDD")
            .toString(),
          interimStatus: record.interimStatus,
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
        `http://localhost:8080/ipcaSurrender/softdelete/${id}/${sessionStorage.getItem(
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
          .get(`http://localhost:8080/ipcaSurrender/search/${val}`, {
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
    getpassFail();
    return () => {};
  }, []);

  return (
    <>
      {qcOpen === true ? (
        <SurrenderQC
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
              <b>Surrender Payout Result</b>{" "}
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
                  <th>Policy No</th>
                  <th>Transaction No</th>
                  <th>UIN Number</th>
                  <th>Req Date</th>
                  <th>Log Date</th>
                  <th>No Of Dues</th>
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
                      <td>{value.transNo}</td>
                      <td>{value.uinNumber}</td>
                      <td>{moment(value.reqDate).format("DD-MM-yyyy")}</td>
                      <td>{moment(value.logDate).format("DD-MM-yyyy")}</td>
                      <td>{value.noOfDues}</td>
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

          <IPCASurrenderEdit
            open={editOpen}
            handleClose={editClose}
            data={record}
            passFail={passFail}
            onChange={editChange}
            onChangeReqDate={editChangeReqDate}
            onChangeLogDate={editChangeLogDate}
            onChangeEffDate={editChangeEffDate}
            onChangeAppDate={editChangeAppDate}
            handleFormSubmit={() => editFormSubmit()}
          />
          <IPCASurrenderInfo
            open={infoOpen}
            handleClose={handleInfoClose}
            data={info}
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

export default IPCASurrender;
