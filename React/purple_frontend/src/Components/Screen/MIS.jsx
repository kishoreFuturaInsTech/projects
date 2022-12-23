import React from "react";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Avatar, Button, Stack } from "@mui/material";
import { TablePagination } from "@material-ui/core";
import Paper from "@mui/material/Paper";
import moment from "moment";
import "../Css/Content.css";
import ConfirmDialog from "../Dialogs/ConfirmDialog";
import Notification from "../Dialogs/Notification";
import InfoIcon from "@mui/icons-material/Info";
import { InputAdornment } from "@mui/material";
import { TextField, FormControl, Grid, Box, Autocomplete } from "@mui/material";
import { MenuItem } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import { SiMicrosoftexcel } from "react-icons/si";

function MIS() {
  const userId = sessionStorage.getItem("userId");
  const [purpleData, setpurpleData] = useState([]);
  const [transPasData, settransPasData] = useState([]);

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

  const getInitiatedData = () => {
    axios
      .get(`http://localhost:8080/transaction/getAll/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setpurpleData(resp.data);
      })
      .catch((err) => console.log(err));
  };

  const getProcessedData = () => {
    axios
      .get(`http://localhost:8080/purpledetails/getAllQCPending/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setpurpleData(resp.data);
      })
      .catch((err) => console.log(err));
  };

  const getFailedData = () => {
    axios
      .get(`http://localhost:8080/purpledetails/getAllFailed/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setpurpleData(resp.data);
      })
      .catch((err) => console.log(err));
  };

  const getPassedData = () => {
    axios
      .get(`http://localhost:8080/purpledetails/getAllPassed/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setpurpleData(resp.data);
      })
      .catch((err) => console.log(err));
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

  const [search, setSearch] = useState("");
  const [down, setDown] = useState("");
  const searchFunction = () => {
    if (search === "Initiated") {
      getInitiatedData();
      setDown(search);
    } else if (search === "Processed") {
      getProcessedData();
      setDown(search);
    } else if (search === "Passed") {
      getPassedData();
      setDown(search);
    } else if (search === "Failed") {
      getFailedData();
      setDown(search);
    } else {
      setSearch(null);
      setDown("Default");
    }
  };

  function downloadExcel(down) {
    if (down === "Initiated") {
      axios({
        url: `http://localhost:8080/purpledetails/download/purple.xlsx/${down}`,
        method: "GET",
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "flc_initiated.xlsx");
        link.click();
      });
    }
    if (down === "Processed") {
      axios({
        url: `http://localhost:8080/purpledetails/download/purple.xlsx/${down}`,
        method: "GET",
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "ipca_processed.xlsx");
        link.click();
      });
    }
    if (down === "Passed") {
      axios({
        url: `http://localhost:8080/purpledetails/download/purple.xlsx/${down}`,
        method: "GET",
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "ipca_passed.xlsx");
        link.click();
      });
    }
    if (down === "Failed") {
      axios({
        url: `http://localhost:8080/purpledetails/download/purple.xlsx/${down}`,
        method: "GET",
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "ipca_failed.xlsx");
        link.click();
      });
    }
    if (down === "Default") {
      axios({
        url: `http://localhost:8080/purpledetails/download/purple.xlsx/${down}`,
        method: "GET",
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "ipca.xlsx");
        link.click();
      });
    }
  }

  console.log("search", search);
  useEffect(() => {
    // getProcessedData();
    // getFailedData();
    // getPassedData();
    return () => {};
  }, []);
  return (
    <>
      <div className="classTitle">
        <h2>
          {" "}
          <b>MIS Screen</b>{" "}
        </h2>
      </div>
      <div style={{ display: "flex" }}>
        <TextField
          select
          // autoComplete="off"
          style={{ marginLeft: "4.5rem", marginTop: "1rem", width: "15rem" }}
          label="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        >
          <MenuItem value={"Initiated"}>Initiated</MenuItem>
          <MenuItem value={"Processed"}>Processed</MenuItem>
          <MenuItem value={"Passed"}>Passed</MenuItem>
          <MenuItem value={"Failed"}>Failed</MenuItem>
        </TextField>
        <Button
          variant="contained"
          color="error"
          onClick={() => searchFunction()}
          style={{ marginTop: "1rem", marginLeft: "1rem" }}
        >
          <SearchIcon />
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={() => downloadExcel(down)}
          style={{ marginTop: "1rem", marginLeft: "50rem" }}
        >
          <SiMicrosoftexcel size={30} />
        </Button>
      </div>
      <Paper className="paperStyle">
        <Table striped bordered hover size="md">
          <thead className="tableheader">
            <tr>
              <th>Policy No</th>
              <th>Transaction No</th>
              <th>Gross Payable</th>
              <th>Recoveries</th>
              <th>Net Payable</th>
              <th>Total Premium</th>
            </tr>
          </thead>
          <tbody>
            {purpleData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((value, index) => (
                <tr>
                  <td>
                    {search === "Initiated"
                      ? value.flcPolicyNo
                      : value.policyNo}
                  </td>
                  <td>
                    {search === "Initiated" ? value.flcTransNo : value.tranNo}
                  </td>
                  <td>
                    {search === "Initiated"
                      ? value.grossFlcPay
                      : value.grossPayable}
                  </td>
                  <td>
                    {search === "Initiated"
                      ? value.totalRecov
                      : value.recoveries}
                  </td>
                  <td>
                    {search === "Initiated"
                      ? value.netFlcPay
                      : value.netPayable}
                  </td>
                  <td>
                    {search === "Initiated"
                      ? value.flcPremRefund
                      : value.totlPremium}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        <TablePagination
          className="contentPagination"
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={purpleData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
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

export default MIS;
