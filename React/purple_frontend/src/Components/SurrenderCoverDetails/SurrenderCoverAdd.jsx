import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import axios from "axios";
import { Box, FormControl, FormHelperText, Grid } from "@mui/material";
import MenuItem from "@material-ui/core/MenuItem";
import Notification from "../Dialogs/Notification";

function SurrenderCoverAdd({
  open,
  handleClickClose,
  close,
  getdata,
  notify,
  setNotify,
  setpolicyCovers,
  setcoverDetails,
  coverDetails,
  policyCovers,
  open1,
  close1,
  chdrId,
  cmpId,
  clientId,
  uniqueNo,
}) {
  console.log(chdrId, "policy Id");

  const access = JSON.parse(sessionStorage.getItem("specialaccess"));
  const userId = sessionStorage.getItem("userId");

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

  // Get All Client details Pas Data
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

  // Get All Policy details Pas Data
  const [policyData, setpolicyData] = useState([]);
  const getPolicyData = () => {
    axios
      .get(`http://localhost:8080/surrenderpolicydetails/getall/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setpolicyData(resp.data);

        setpolicyDetails(resp.data);
      })
      .catch((err) => console.log(err));
  };

  console.log(policyData, "Policy data");

  // Dropdown tables
  const rule1 = "coverName";
  const [coverNameData, setcoverNameData] = useState([]);
  const getCoverNameData = () => {
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
        setcoverCodeData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const rule3 = "statusType";
  const [coverStatusData, setcoverStatusData] = useState([]);
  const getcoverStatusData = () => {
    axios
      .get(`http://localhost:8080/param/${rule3}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        setcoverStatusData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [companyId, setcompanyId] = useState(open1 === true ? cmpId : "");
  const [clntNum, setclntNum] = useState(open1 === true ? clientId : "");
  const [policyNo, setpolicyNo] = useState(open1 === true ? chdrId : "");
  const [planName, setplanName] = useState("");
  const [planCode, setplanCode] = useState("");
  const [uinNumber, setuinNumber] = useState("");
  const [riskComDate, setriskComDate] = useState("");
  const [docDate, setdocDate] = useState("");
  const [sumAssured, setsumAssured] = useState("");
  const [premiumTerm, setpremiumTerm] = useState("");
  const [policyTerm, setpolicyTerm] = useState();
  const [coverPremium, setcoverPremium] = useState("");
  const [coverStatus, setcoverStatus] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [modifiedBy, setModifiedBy] = useState("");

  const handleFormSubmit = () => {
    let data = {
      companyId,
      clntNum,
      policyNo,
      planName,
      planCode,
      uinNumber,
      riskComDate: moment(riskComDate).format("YYYYMMDD").toString(),
      docDate: moment(docDate).format("YYYYMMDD").toString(),
      sumAssured,
      premiumTerm,
      policyTerm,
      coverPremium,
      coverStatus,
      createdBy: userId,
      modifiedBy: userId,
    };

    axios
      .post(`http://localhost:8080/surrenderCoverPas/add/${userId}`, data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        if (open1 === true) {
          // close1();
          // setcoverDetails(coverDetails);
          window.location = "surrenderPolicy";
        } else {
          handleClickClose();
          getdata();
          setNotify({
            isOpen: true,
            message: "Created Successfully",
            type: "success",
          });
        }
      });
  };

  useEffect(() => {
    getcompanyData();
    getCoverNameData();
    getPolicyData();
    getcoverCodeData();
    getcoverStatusData();
    getClientData();
    return () => {};
  }, []);

  return (
    <div>
      <form autoComplete="off">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={8} md={6} lg={4}>
              <TextField
                select
                label="Company"
                className="formtext"
                id="companyId"
                value={companyId}
                placeholder="Company"
                name="companyId"
                onChange={(e) => setcompanyId(e.target.value)}
                fullWidth
                variant="outlined"
                margin="dense"
                // inputProps={{ readOnly: open1 }}
                disabled={open1}
              >
                {companyData?.map((val) => (
                  <MenuItem key={val.id} value={val.id}>
                    {val.companyCode}-{val.companyName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                select
                label="Client Num"
                className="formtext"
                id="clntNum"
                value={clntNum}
                placeholder="Client Num"
                name="clntNum"
                onChange={(e) => setclntNum(e.target.value)}
                fullWidth
                variant="outlined"
                margin="dense"
                // inputProps={{ readOnly: open1 }}
                disabled={open1}
              >
                {clientdata?.map((val) => (
                  <MenuItem key={val.clntNum} value={val.clntNum}>
                    {val.clntNum}-{val.laName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                select
                label="Policy No"
                className="formtext"
                id="policyNo"
                value={policyNo}
                placeholder="Policy No"
                name="policyNo"
                onChange={(e) => setpolicyNo(e.target.value)}
                fullWidth
                variant="outlined"
                margin="dense"
                // inputProps={{ readOnly: open1 }}
                disabled={open1}
              >
                {policyData?.map((val) => (
                  <MenuItem key={val.chdrNum} value={val.chdrNum}>
                    {val.chdrNum}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                label="UIN Number"
                className="formtext"
                id="uinNumber"
                value={uinNumber}
                placeholder="UIN Number"
                name="uinNumber"
                onChange={(e) => setuinNumber(e.target.value)}
                fullWidth
                // disabled={open1}
                variant="outlined"
                margin="dense"
              ></TextField>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                select
                label="Plan Name"
                className="formtext"
                id="planName"
                value={planName}
                placeholder="Plan Name"
                name="planName"
                onChange={(e) => setplanName(e.target.value)}
                fullWidth
                variant="outlined"
                margin="dense"
              >
                {coverNameData?.map((val) => (
                  <MenuItem key={val} value={val.shortDescription}>
                    {val.shortDescription}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                select
                label="Plan Code"
                className="formtext"
                id="planCode"
                value={planCode}
                placeholder="Plan Code"
                name="planCode"
                onChange={(e) => setplanCode(e.target.value)}
                fullWidth
                variant="outlined"
                margin="dense"
              >
                {coverCodeData?.map((val) => (
                  <MenuItem key={val} value={val.shortDescription}>
                    {val.shortDescription}-{val.longDescription}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <FormControl
                style={{ marginTop: "0.5rem" }}
                className="formtext"
                fullWidth
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    inputFormat="dd/MM/yyyy"
                    label="Risk Com Date:"
                    id="riskComDate"
                    value={riskComDate}
                    placeholder="Risk Com Date:"
                    name="riskComDate"
                    onChange={(date) => setriskComDate(date)}
                    renderInput={(params) => <TextField {...params} />}
                    fullWidth
                    maxDate={moment().toDate()}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <FormControl
                style={{ marginTop: "0.5rem" }}
                className="formtext"
                fullWidth
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    inputFormat="dd/MM/yyyy"
                    label="Date Of Commencement Date:"
                    id="docDate"
                    value={docDate}
                    placeholder="Date Of Commencement Date:"
                    name="docDate"
                    onChange={(date) => setdocDate(date)}
                    renderInput={(params) => <TextField {...params} />}
                    fullWidth
                    maxDate={moment().toDate()}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                label="Sum Assured"
                className="formtext"
                id="sumAssured"
                value={sumAssured}
                placeholder="Sum Assured"
                name="sumAssured"
                onChange={(e) => setsumAssured(e.target.value)}
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                label="Policy Term"
                className="formtext"
                id="policyTerm"
                value={policyTerm}
                placeholder="Policy Term"
                name="policyTerm"
                onChange={(e) => setpolicyTerm(e.target.value)}
                fullWidth
                variant="outlined"
                margin="dense"
              ></TextField>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                label="Premium Term"
                className="formtext"
                id="premiumTerm"
                value={premiumTerm}
                placeholder="Premium Term"
                name="premiumTerm"
                onChange={(e) => setpremiumTerm(e.target.value)}
                fullWidth
                variant="outlined"
                margin="dense"
              ></TextField>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                label="Cover Premium"
                className="formtext"
                id="coverPremium"
                value={coverPremium}
                placeholder="Cover Premium"
                name="coverPremium"
                onChange={(e) => setcoverPremium(e.target.value)}
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                select
                label="Cover Status"
                className="formtext"
                id="coverStatus"
                value={coverStatus}
                placeholder="Cover Status"
                name="coverStatus"
                onChange={(e) => setcoverStatus(e.target.value)}
                fullWidth
                variant="outlined"
                margin="dense"
              >
                {coverStatusData?.map((val) => (
                  <MenuItem key={val} value={val.shortDescription}>
                    {val.shortDescription}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Box>
      </form>
      <br />

      <Button
        color="primary"
        variant="contained"
        style={{ marginRight: 10 }}
        onClick={() => handleFormSubmit()}
      >
        Submit
      </Button>

      {open === true ? (
        <Button onClick={handleClickClose} color="error" variant="contained">
          Cancel
        </Button>
      ) : null}
      {/* <Notification notify={notify} setNotify={setNotify} /> */}
    </div>
  );
}

export default SurrenderCoverAdd;
