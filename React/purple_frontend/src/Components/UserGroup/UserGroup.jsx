import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { TablePagination } from "@material-ui/core";
import Paper from "@mui/material/Paper";
import moment from "moment";
import UserGroupAdd from "./UserGroupAdd";
import UserGroupEdit from "./UserGroupEdit";
import "../Css/Content.css";

import ConfirmDialog from "../Dialogs/ConfirmDialog";
import Notification from "../Dialogs/Notification";
import UserGroupInfo from "./UserGroupInfo";
import InfoIcon from "@mui/icons-material/Info";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

var initialValues = {
  companyId: "",
  userGroupName: "",
};

function UserGroup() {
  const access = JSON.parse(sessionStorage.getItem("specialaccess"));

  const [data, setData] = useState([]);
  const [userGroupData, setUserGroupData] = useState(initialValues);
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

    setUserGroupData({ ...userGroupData, [name]: value });
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
        `http://localhost:8080/userGroup/getAll/` +
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

  useEffect(() => {
    getData();
    getcompanyData();
    return () => {};
  }, []);

  const userId = sessionStorage.getItem("userId");

  const handleFormSubmit = () => {
    axios
      .post(
        `http://localhost:8080/userGroup/add/${userId}`,
        {
          companyId: userGroupData.companyId,
          userGroupName: userGroupData.userGroupName,
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
        setUserGroupData(initialValues);
        getData();
        setNotify({
          isOpen: true,
          message: "Created Successfully",
          type: "success",
        });
      })
      .catch((err) => console.log(err));
  };
  const editFormSubmit = () => {
    axios
      .patch(
        `http://localhost:8080/userGroup/update/${record.id}/${userId}`,
        {
          companyId: record.companyId,
          userGroupName: record.userGroupName,
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
        `http://localhost:8080/userGroup/softdelete/${id}/${sessionStorage.getItem(
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
          .get(`http://localhost:8080/userGroup/search/${val}`, {
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
    <div>
      <div className="container">
        <div className="classTitle">
          <h2>
            {" "}
            <b>User Group</b>{" "}
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
                <th>Company</th>
                <th>UserGroup Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((value, index) => (
                  <tr>
                    <td>{value?.companyName}</td>
                    <td>{value.userGroupName}</td>
                    <td>
                      <div
                        style={{
                          display: "flex",
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
          <br />
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
          <br />
        </Paper>
      </div>
      <div className="footerdescription">
        <h6 className="footerContent">
          Copyright © www.futurainstech.com @{moment().format("YYYY")}
        </h6>
      </div>

      <UserGroupAdd
        open={open}
        handleClose={handleClickClose}
        data={userGroupData}
        companyData={companyData}
        onChange={onChange}
        handleFormSubmit={() => handleFormSubmit()}
      />
      <UserGroupEdit
        open={editOpen}
        handleClose={editClose}
        companyData={companyData}
        data={record}
        onChange={editChange}
        handleFormSubmit={() => editFormSubmit()}
      />
      <UserGroupInfo
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
    </div>
  );
}

export default UserGroup;
