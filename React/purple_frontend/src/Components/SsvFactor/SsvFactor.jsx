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
import { Upload } from "@mui/icons-material";
import FormDate from "form-data";
import SsvFactorAdd from "./SsvFactorAdd";
import SsvFactorEdit from "./SsvFactorEdit";
import SsvFactorInfo from "./SsvFactorInfo";

var initialValues = {
    companyId: "",
    uinNumber: "",
    planName: "",
    planCode: "",
    premiumFrequency: "",
    premiumTerm: "",
    policyTerm: "",
    policyDuration: "",
    rate: "",
    startDate: "",
    endDate: "",

}

function SsvFactor() {

    const access = JSON.parse(sessionStorage.getItem("specialaccess"));
  const userId = sessionStorage.getItem("userId");

  const [data, setData] = useState([]);
  const [ssvFactorData, setssvFactorData] =
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

  const onChange = (e) => {
    const { value, name } = e.target;
    setssvFactorData({ ...ssvFactorData, [name]: value });
  };

  // Customer Details On Change Date

  const onChangeStartDate = (date) => {
    setssvFactorData({ ...ssvFactorData, startDate: date });
  };
  const onChangeEndDate = (date) => {
    setssvFactorData({ ...ssvFactorData, endDate: date });
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

  const editChangeStartDate = (date) => {
    setRecord({ ...record, startDate: date });
  };
  const editChangeEndDate = (date) => {
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

  // Get All SSVFactor details Data
  const getData = () => {
    axios
      .get(`http://localhost:8080/ssvfactor/getall/${userId}`, {
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

  const [emailError, setemailError] = useState("");
  const [clientNumError, setClientNumError] = useState("");
  const handleFormSubmit = () => {
    axios
      .post(
        `http://localhost:8080/ssvfactor/add/${userId}`,
        {
            companyId: ssvFactorData.companyId,
            uinNumber: ssvFactorData.uinNumber,
            planName: ssvFactorData.planName,
            planCode: ssvFactorData.planCode,
            premiumFrequency: ssvFactorData.premiumFrequency,
            premiumTerm: ssvFactorData.premiumTerm,
            policyTerm: ssvFactorData.policyTerm,
            policyDuration: ssvFactorData.policyDuration,
            rate: ssvFactorData.rate,
          startDate: moment(ssvFactorData.startDate)
            .format("YYYYMMDD")
            .toString(),
          endDate: moment(ssvFactorData.endDate)
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
        setssvFactorData(initialValues);
        getData();
        setNotify({
          isOpen: true,
          message: resp.data,
          type: "success",
        });
        setemailError("");
        setClientNumError("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editFormSubmit = () => {
    axios
      .patch(
        `http://localhost:8080/ssvfactor/update/${record.id}/${userId}`,
        {
            companyId: record.companyId,
            uinNumber: record.uinNumber,
            planName: record.planName,
            planCode: record.planCode,
            premiumFrequency: record.premiumFrequency,
            premiumTerm: record.premiumTerm,
            policyTerm: record.policyTerm,
            policyDuration: record.policyDuration,
            rate: record.rate,
          startDate: moment(record.startDate).format("YYYYMMDD").toString(),
          endDate: moment(record.endDate).format("YYYYMMDD").toString(),
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
        setemailError("");
        setClientNumError("");
      })
      .catch((err) => {
        console.log(err);
        setemailError(err.response.data.emailId);
        setClientNumError(err.response.data.message);
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
        `http://localhost:8080/ssvfactor/softdelete/${id}/${userId}`,
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
          .get(`http://localhost:8080/ssvfactor/search/${val}`, {
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

  const rule1 = "coverName";
  const [coverNameData, setcoverNameData] = useState([]);
  const getcoverNameData = () => {
    axios
      .get(`http://localhost:8080/param/${rule1}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        setcoverNameData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const rule2 = "coverCode";
  const [coverCodeData, setcoverCodeData] = useState([]);
  const getcoverCodeData = () => {
    axios
      .get(`http://localhost:8080/param/${rule2}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        setcoverNameData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const[file, setFile] = useState(null)
  const upload =(e) =>{
    e.preventDefault()
    let formData = new FormDate();
    formData.append("file",file);
    axios.post(`http://localhost:8080/ssvfactor/upload`,formData,{
      headers:{
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
  }

  useEffect(() => {
    getData();
    getcompanyData();
    getcoverNameData();
    getcoverCodeData();
    return () => {};
  }, []);

  return (
    <>
      <div className="classTitle">
        <h2>
          {" "}
          <b>SSV Factor</b>{" "}
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
      {/* <input
          type="file"
          name="file"
          onChange={(e) =>{
            setFile(e.target.files[0]);
          }}
          />
          <button onClick={(e)=>upload(e)}>Submit</button> */}
      <Paper className="paperStyle">
        <Table striped bordered hover size="md">
          <thead className="tableheader">
            <tr>
              <th>UIN Number</th>
              <th>Plan Name</th>
              <th>Plan Code</th>
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
      <SsvFactorAdd
        open={open}
        handleClose={handleClickClose}
        data={ssvFactorData}
        companyData={companyData}
        coverNameData={coverNameData}
        coverCodeData={coverCodeData}
        onChange={onChange}
        onChangeStartDate={onChangeStartDate}
        onChangeEndDate={onChangeEndDate}
        handleFormSubmit={() => handleFormSubmit()}
      />
      <SsvFactorEdit
        open={editOpen}
        emailError={emailError}
        handleClose={editClose}
        companyData={companyData}
        coverNameData={coverNameData}
        coverCodeData={coverCodeData}
        data={record}
        onChange={editChange}
        onChangeStartDate={editChangeStartDate}
        onChangeEndDate={editChangeEndDate}
        handleFormSubmit={() => editFormSubmit()}
      />
      <SsvFactorInfo
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
  )
}

export default SsvFactor