import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@mui/material/TableRow";
import "../../css/Content.css";
import FormDate from "form-data";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import ConfirmDialog from "../Dialogs/ConfirmDialog";
import Notification from "../Dialogs/Notification";
import { InputAdornment, TextField, Button } from "@mui/material";
import moment from "moment";
import axios from "axios";

import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";

var initialValues = {
  companyId: "",
  uinNumber: "",
  coverName: "",
  mortFlag: "",
  gstRate: "",
  startDate: "",
  endDate: "",
};

export default function MortalityFlagMaster() {
  const [data, setData] = useState([]);
  const [mortFlagMasterData, setmortFlagMasterData] = useState(initialValues);
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
    setmortFlagMasterData({ ...mortFlagMasterData, [name]: value });
  };

  const onChangestartDate = (date) => {
    setmortFlagMasterData({ ...mortFlagMasterData, startDate: date });
  };
  const onChangeendDate = (date) => {
    setmortFlagMasterData({ ...mortFlagMasterData, endDate: date });
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
      .get(`http://localhost:8080/mortflagmaster/getall/${1}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setData(resp.data);
      })
      .catch((err) => console.log(err));
  };

  const handleFormSubmit = () => {
    axios
      .post(
        `http://localhost:8080/mortflagmaster/add/${1}`,
        {
          companyId: mortFlagMasterData.companyId,
          uinNumber: mortFlagMasterData.uinNumber,
          coverName: mortFlagMasterData.coverName,
          mortFlag: mortFlagMasterData.mortFlag,
          gstRate: mortFlagMasterData.gstRate,
          rates: mortFlagMasterData.rates,
          startDate: moment(mortFlagMasterData.startDate)
            .format("YYYYMMDD")
            .toString(),
          endDate: moment(mortFlagMasterData.endDate)
            .format("YYYYMMDD")
            .toString(),
          createdBy: 1,
          modifiedBy: 1,
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
        setmortFlagMasterData(initialValues);
        getData();
        setNotify({
          isOpen: true,
          message: resp.data,
          type: "success",
        });
      })
      .catch((err) => console.log(err));
  };

  const [companyData, setcompanyData] = useState([]);
  const getcompanyData = () => {
    axios
      .get(`http://localhost:8080/company/getAll/${1}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setcompanyData(resp.data);
      })
      .catch((err) => console.log(err));
  };

  console.log("data", companyData);

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

  const rule2 = "yesNoFlag";
  const [mortFlagData, setmortFlagData] = useState([]);
  const getmortFlagData = () => {
    axios
      .get(`http://localhost:8080/param/${rule2}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        setmortFlagData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const editFormSubmit = () => {
    axios
      .patch(
        `http://localhost:8080/mortflagmaster/update/${record.id}/${1}`,
        {
          companyId: record.companyId,
          uinNumber: record.uinNumber,
          coverName: record.coverName,
          mortFlag: record.mortFlag,
          gstRate: record.gstRate,
          rates: record.rates,
          startDate: moment(record.startDate).format("YYYYMMDD").toString(),
          endDate: moment(record.endDate).format("YYYYMMDD").toString(),
          createdBy: 1,
          modifiedBy: 1,
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
        `http://localhost:8080/mortflagmaster/softdelete/${id}/${1}`,
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

  const [file, setFile] = useState(null);
  const upload = (e) => {
    e.preventDefault();
    let formData = new FormDate();
    formData.append("file", file);
    axios.post(`http://localhost:8080/mortflagmaster/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  };

  const [search, setSearch] = useState("");
  const globalsearch = (val) => {
    val === ""
      ? getData()
      : axios
          .get(`http://localhost:8080/mortflagmaster/search/${val}`, {
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
    getcoverNameData();
    getmortFlagData();
    return () => {};
  }, []);

  return (
    <>
      <title className="title-parent">
        <h2 className="table-title">Mortality Flag Master</h2>
      </title>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
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
        <div style={{ margin: "auto" }}>
          <input
            type="file"
            name="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />

          <Button
            onClick={(e) => upload(e)}
            variant="contained"
            style={{
              maxWidth: "40px",
              maxHeight: "40px",
              minWidth: "40px",
              minHeight: "40px",
            }}
          >
            <DriveFolderUploadIcon />
          </Button>
        </div>
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

      <Paper className="paperstyle">
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead className="tableheader">
              <TableRow>
                <td className="tblhd">UIN Number</td>
                <td className="tblhd">Cover Name </td>
                <td className="tblhd">Mortality Flag </td>
                <td className="tblhd">GST Rate</td>
                <td className="tblhd" align="center">
                  Action
                </td>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((value, index) => (
                  <TableRow className={index % 2 ? "classEven" : "classOdd"}>
                    <td className="tblcell">{value.uinNumber}</td>
                    <td className="tblcell">{value.coverName}</td>
                    <td className="tblcell">{value.mortFlag}</td>
                    <td className="tblcell">{value.gstRate}</td>
                    <td className="tblcell">
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
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          className="table-pagination"
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
