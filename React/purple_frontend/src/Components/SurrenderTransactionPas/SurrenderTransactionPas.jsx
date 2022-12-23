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
import SurrenderTransactionPasAdd from "./SurrenderTransactionPasAdd";
import SurrenderTransactionPasEdit from "./SurrenderTransactionPasEdit";
import SurrenderTransactionPasInfo from "./SurrenderTransactionPasInfo";
import FormDate from "form-data";
import CalculateIcon from "@mui/icons-material/Calculate";

var initialValues = {
  companyId: "",
  policyNo: "",
  transNo: "",
  svReqDate: "",
  logDate: "",
  uinNumber: "",
  gsv: "",
  ssv: "",
  policyDeposit: "",
  penalInterest: "",
  grossPay: "",
  cdaCharges: "",
  tds: "",
  //***** */
  cashValueBonus: "",
  paidUpValue: "",
  reversionaryBonus: "",
  interimBonus: "",
  otherRecovery: "",
  approvedDate: "",

  totalRecovery: "",
  netPayable: "",
  effectiveDate: "",
  fundValue: "",
  //****** */

  policyLoan: "",
  loanInterest: "",

  makerFlag: "",
  checkerFlag: "",
  ipcaApprovalFlag: "",
  ipcaApprovalRemarks: "",
  ipcaApprovalDate: "",
  qcUserId: "",
  interimStatus: "",
};

function SurrenderTransactionPas() {
  const userId = sessionStorage.getItem("userId");

  const [data, setData] = useState([]);
  const [surrenderTransData, setsurrenderTransData] = useState(initialValues);
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
    setsurrenderTransData({ ...surrenderTransData, [name]: value });
  };

  // Customer Details On Change Date

  const onChangeSvReqDate = (date) => {
    setsurrenderTransData({ ...surrenderTransData, svReqDate: date });
  };
  const onChangeEffectiveDate = (date) => {
    setsurrenderTransData({ ...surrenderTransData, effectiveDate: date });
  };
  const onChangeIpcaApprovalDate = (date) => {
    setsurrenderTransData({ ...surrenderTransData, ipcaApprovalDate: date });
  };

  const onChangeLogDate = (date) => {
    setsurrenderTransData({ ...surrenderTransData, logDate: date });
  };
  const onChangeAppate = (date) => {
    setsurrenderTransData({ ...surrenderTransData, approvedDate: date });
  };
  const editChangeAppate = (date) => {
    setsurrenderTransData({ ...record, approvedDate: date });
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

  const editChangeSvReqDate = (date) => {
    setRecord({ ...record, svReqDate: date });
  };
  const editChangeEffectiveDate = (date) => {
    setRecord({ ...record, effectiveDate: date });
  };

  const editChangeIpcaApprovalDate = (date) => {
    setRecord({ ...record, ipcaApprovalDate: date });
  };
  const editChangeLogDate = (date) => {
    setRecord({ ...record, logDate: date });
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

  // Get All Client details Pas Data
  const getData = () => {
    axios
      .get(`http://localhost:8080/surrenderTransactionPas/getAll/${userId}`, {
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
        `http://localhost:8080/surrenderTransactionPas/add/${userId}`,
        {
          companyId: surrenderTransData.companyId,
          policyNo: surrenderTransData.policyNo,
          transNo: surrenderTransData.transNo,
          logDate: moment(surrenderTransData.logDate)
            .format("YYYYMMDD")
            .toString(),
          uinNumber: surrenderTransData.uinNumber,
          gsv: surrenderTransData.gsv,
          ssv: surrenderTransData.ssv,
          policyDeposit: surrenderTransData.policyDeposit,
          penalInterest: surrenderTransData.penalInterest,
          grossPay: surrenderTransData.grossPay,
          cdaCharges: surrenderTransData.cdaCharges,
          tds: surrenderTransData.tds,
          totalRecovery: surrenderTransData.totalRecovery,
          netPayable: surrenderTransData.netPayable,
          fundValue: surrenderTransData.fundValue,
          makerFlag: surrenderTransData.makerFlag,
          checkerFlag: surrenderTransData.checkerFlag,
          ipcaApprovalFlag: surrenderTransData.ipcaApprovalFlag,
          ipcaApprovalRemarks: surrenderTransData.ipcaApprovalRemarks,
          cashValueBonus: surrenderTransData.cashValueBonus,
          paidUpValue: surrenderTransData.paidUpValue,
          reversionaryBonus: surrenderTransData.reversionaryBonus,
          interimBonus: surrenderTransData.interimBonus,
          otherRecovery: surrenderTransData.otherRecovery,
          policyLoan: surrenderTransData.policyLoan,
          loanInterest: surrenderTransData.loanInterest,
          approvedDate: moment(surrenderTransData.approvedDate)
            .format("YYYYMMDD")
            .toString(),
          ipcaApprovalDate: moment(surrenderTransData.ipcaApprovalDate)
            .format("YYYYMMDD")
            .toString(),
          qcUserId: surrenderTransData.qcUserId,
          interimStatus: surrenderTransData.interimStatus,
          svReqDate: moment(surrenderTransData.svReqDate)
            .format("YYYYMMDD")
            .toString(),
          effectiveDate: moment(surrenderTransData.effectiveDate)
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
        setsurrenderTransData(initialValues);
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
        `http://localhost:8080/surrenderTransactionPas/update/${record.id}/${userId}`,
        {
          companyId: record.companyId,
          policyNo: record.policyNo,
          transNo: record.transNo,
          logDate: moment(record.logDate).format("YYYYMMDD"),
          uinNumber: record.uinNumber,
          gsv: record.gsv,
          ssv: record.ssv,
          policyDeposit: record.policyDeposit,
          penalInterest: record.penalInterest,
          grossPay: record.grossPay,
          cdaCharges: record.cdaCharges,
          tds: record.tds,
          totalRecovery: record.totalRecovery,
          netPayable: record.netPayable,
          fundValue: record.fundValue,
          makerFlag: record.makerFlag,

          checkerFlag: record.checkerFlag,
          ipcaApprovalFlag: record.ipcaApprovalFlag,
          ipcaApprovalRemarks: record.ipcaApprovalRemarks,
          cashValueBonus: record.cashValueBonus,
          paidUpValue: record.paidUpValue,
          reversionaryBonus: record.reversionaryBonus,
          interimBonus: record.interimBonus,
          otherRecovery: record.otherRecovery,
          policyLoan: record.policyLoan,
          loanInterest: record.loanInterest,
          approvedDate: moment(record.approvedDate)
            .format("YYYYMMDD")
            .toString(),
          ipcaApprovalDate: moment(record.ipcaApprovalDate).format("YYYYMMDD"),
          qcUserId: record.qcUserId,
          interimStatus: record.interimStatus,
          svReqDate: moment(record.svReqDate)
            .format("YYYYMMDD")
            .toString(),
          effectiveDate: moment(record.effectiveDate)
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
        `http://localhost:8080/surrenderTransactionPas/softdelete/${id}/${userId}`,
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
          .get(`http://localhost:8080/surrenderTransactionPas/search/${val}`, {
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

  const singleApproval = (policyNo) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    axios
      .post(
        `http://localhost:8080/ipcaSurrender/assignSingleTrans/${policyNo}/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        setNotify({
          isOpen: true,
          message: "Calculated Successfully",
          type: "success",
        });
        location = "IPCASurrender";
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
          <b>Surrender Transaction PAS</b>{" "}
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
              <th>Trans No</th>
              <th>Sv Req Date</th>
              <th>Log Date</th>
              <th>UIN Number</th>
              <th>GSV</th>
              <th>SSV</th>
              <th>Calculate</th>
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
                  <td>{value.policyNo}</td>
                  <td>{value.transNo}</td>
                  <td>{moment(value.svReqDate).format("DD-MM-YYYY")}</td>
                  <td>{moment(value.logDate).format("DD-MM-YYYY")}</td>
                  <td>{value.uinNumber}</td>
                  <td>{value.gsv}</td>
                  <td>{value.ssv}</td>
                  <td>
                    <CalculateIcon
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title: "Are you sure to Calculate this record?",
                          subTitle: "You can't undo this operation",
                          onConfirm: () => {
                            singleApproval(value.policyNo);
                          },
                        });
                      }}
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
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <SurrenderTransactionPasAdd
        open={open}
        handleClose={handleClickClose}
        data={surrenderTransData}
        companyData={companyData}
        onChange={onChange}
        onChangeAppate={onChangeAppate}
        onChangeSvReqDate={onChangeSvReqDate}
        onChangeEffectiveDate={onChangeEffectiveDate}
        onChangeIpcaApprovalDate={onChangeIpcaApprovalDate}
        onChangeLogDate={onChangeLogDate}
        handleFormSubmit={() => handleFormSubmit()}
      />
      <SurrenderTransactionPasEdit
        open={editOpen}
        handleClose={editClose}
        companyData={companyData}
        data={record}
        onChange={editChange}
        onChangeAppate={editChangeAppate}
        onChangeLogDate={editChangeLogDate}
        onChangeSvReqDate={editChangeSvReqDate}
        onChangeEffectiveDate={editChangeEffectiveDate}
        onChangeIpcaApprovalDate={editChangeIpcaApprovalDate}
        handleFormSubmit={() => editFormSubmit()}
      />
      <SurrenderTransactionPasInfo
        open={infoOpen}
        companyData={companyData}
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

export default SurrenderTransactionPas;
