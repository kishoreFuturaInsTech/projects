import React from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar, Button, Stack } from "@mui/material";
import { TablePagination } from "@material-ui/core";
import Paper from "@mui/material/Paper";
import moment from "moment";
import CompanyAdd from "./CompanyAdd";
import CompanyEdit from "./CompanyEdit";
import CompanyInfo from "./CompanyInfo";
import "../Css/Content.css";
import ConfirmDialog from "../Dialogs/ConfirmDialog";
import Notification from "../Dialogs/Notification";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";

var initialValues = {
  companyCode: "",
  companyName: "",
  companyShortName: "",
  companyLongName: "",
  addressId: "",
  gst: "",
  cin: "",
  cinDate: "",
  tin: "",
  pan: "",
  companyLogo: "",
  createdBy: "",
  modifiedBy: "",
};

function Company() {
  const access = JSON.parse(sessionStorage.getItem("specialaccess"));

  const [data, setData] = useState([]);
  const [companyData, setcompanyData] = useState(initialValues);
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
    setcompanyData({ ...companyData, [name]: value });
  };

  const onChangeCinDate = (date) => {
    setcompanyData({ ...companyData, cinDate: date });
  };
  const editChangeCinDate = (date) => {
    setRecord({ ...record, cinDate: date });
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
        `http://localhost:8080/company/getAll/` +
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

  const [addressData, setaddressData] = useState([]);
  const getAddressData = () => {
    axios
      .get(
        `http://localhost:8080/address/getAll/` +
          sessionStorage.getItem("userId"),
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        setaddressData(resp.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
    getAddressData();
    return () => {};
  }, []);

  const userId = sessionStorage.getItem("userId");

  const [companyLogo, setCompanyLogo] = useState(" ");

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setCompanyLogo(base64);
  };
  const editImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setRecord({ ...record, companyLogo: base64 });
    console.log(e.target.files.name, "wow");
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFormSubmit = () => {
    axios
      .post(
        `http://localhost:8080/company/add/${userId}`,
        {
          companyCode: companyData.companyCode,
          companyName: companyData.companyName,
          companyShortName: companyData.companyShortName,
          companyLongName: companyData.companyLongName,
          addressId: companyData.addressId,
          gst: companyData.gst,
          cin: companyData.cin,
          cinDate: moment(companyData.cinDate).format("YYYYMMDD").toString(),
          tin: companyData.tin,
          pan: companyData.pan,
          companyLogo,
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
        setcompanyData(initialValues);
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
        `http://localhost:8080/company/update/${record.id}/${userId}`,
        {
          companyCode: record.companyCode,
          companyName: record.companyName,
          companyShortName: record.companyShortName,
          companyLongName: record.companyLongName,
          addressId: record.addressId,
          gst: record.gst,
          cin: record.cin,
          cinDate: moment(record.cinDate).format("YYYYMMDD").toString(),
          tin: record.tin,
          pan: record.pan,
          companyLogo: record.companyLogo,
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

  console.log(record.cinDate, "date");

  const handleDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    axios
      .patch(
        `http://localhost:8080/company/softdelete/${id}/${sessionStorage.getItem(
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

  const [search, setSearch] = useState("");
  const globalsearch = (val) => {
    val === ""
      ? getData()
      : axios
          .get(`http://localhost:8080/company/search/${val}`, {
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
      <div className="classTitle">
        <h2>
          {" "}
          <b>Company</b>{" "}
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
              <th>Company Code</th>
              <th>Company Name</th>
              <th>Company Short Name</th>
              <th>Company Long Name</th>
              <th>GST</th>
              <th>Company Logo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((value, index) => (
                <tr>
                  <td>{value.companyCode}</td>
                  <td>{value.companyName}</td>
                  <td>{value.companyShortName}</td>
                  <td>{value.companyLongName}</td>
                  <td>{value.gst}</td>
                  <td>
                    <Stack direction="row" spacing={2}>
                      <Avatar>
                        {" "}
                        <img
                          style={{ height: "40px", width: "40px" }}
                          src={value.companyLogo}
                        />
                      </Avatar>
                    </Stack>
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
      <CompanyAdd
        open={open}
        handleClose={handleClickClose}
        data={companyData}
        addressData={addressData}
        onChange={onChange}
        onChangeCinDate={onChangeCinDate}
        uploadImage={uploadImage}
        handleFormSubmit={() => handleFormSubmit()}
      />
      <CompanyEdit
        open={editOpen}
        handleClose={editClose}
        addressData={addressData}
        data={record}
        uploadImage={editImage}
        onChange={editChange}
        onChangeCinDate={editChangeCinDate}
        handleFormSubmit={() => editFormSubmit()}
      />
      <CompanyInfo
        open={infoOpen}
        handleClose={handleInfoClose}
        data={info}
        addressData={addressData}
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

export default Company;
