import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import moment from "moment";
import axios from "axios";
import "../Css/ContentEdit.css";
import { Box, FormControl, FormHelperText, Grid } from "@mui/material";
import MenuItem from "@material-ui/core/MenuItem";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Notification from "../Dialogs/Notification";
function CoverDetailPasEdit({
  data,
  open,
  setData,
  getData,
  notify,
  setNotify,
  handleClickClose,
}) {
  let {
    companyId,
    clntNum,
    chdrNum,
    cntType,
    crTable,
    uinNumber,
    riskComDate,
    docDate,
    sumAssured,
    riskCessTerm,
    premCessTerm,
    coverPremium,
    coverStatus,
    mortFlag,
    stampRate,
  } = data;

  const userId = sessionStorage.getItem("userId");

  const editChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  const editChangeDate = (date) => {
    setData({ ...data, riskComDate: date, docDate: date });
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

  const [clientdata, setclientdata] = useState([]);
  const getClientData = () => {
    axios
      .get(`http://localhost:8080/ClientDetailsPas/getAll/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setclientdata(resp.data);
      })
      .catch((err) => console.log(err));
  };

  // Dropdown tables

  const rule1 = "coverName";
  const [cntTypeData, setcntTypeData] = useState([]);
  const getcntTypeData = () => {
    axios
      .get(`http://localhost:8080/param/${rule1}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        setcntTypeData(resp.data);
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

  const rule3 = "statType";
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

  const rule4 = "yesNoFlag";
  const [mortFlagData, setmortFlagData] = useState([]);
  const getmortFlagData = () => {
    axios
      .get(`http://localhost:8080/param/${rule4}`, {
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
    const body = {
      companyId: data.companyId,
      clntNum: data.clntNum,
      chdrNum: data.chdrNum,
      cntType: data.cntType,
      crTable: data.crTable,
      uinNumber: data.uinNumber,
      riskComDate: moment(data.riskComDate).format("YYYYMMDD").toString(),
      docDate: moment(data.docDate).format("YYYYMMDD").toString(),
      sumAssured: data.sumAssured,
      riskCessTerm: data.riskCessTerm,
      premCessTerm: data.premCessTerm,
      coverPremium: data.coverPremium,
      coverStatus: data.coverStatus,
      mortFlag: data.mortFlag,
      stampRate: data.stampRate,
      createdBy: userId,
      modifiedBy: userId,
    };

    // const userid = sessionStorage.getItem("userid");

    axios
      .patch(
        `http://localhost:8080/coverdetailspas/update/${data.id}/${userId}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        handleClickClose();
        getData();
        setNotify({
          isOpen: true,
          message: "Updated Successfully",
          type: "success",
        });
      });
  };

  useEffect(() => {
    getcompanyData();
    getcntTypeData();
    getcoverCodeData();
    getcoverStatusData();
    getClientData();
    getmortFlagData();
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
                disabled
                fullWidth
                variant="outlined"
                margin="dense"
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
                disabled
                fullWidth
                variant="outlined"
                margin="dense"
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
                label="Policy No"
                className="formtext"
                id="chdrNum"
                value={chdrNum}
                placeholder="Policy No"
                name="chdrNum"
                disabled
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                select
                label="Plan Name"
                className="formtext"
                id="cntType"
                value={cntType}
                placeholder="Plan Name"
                name="cntType"
                onChange={(e) => editChange(e)}
                fullWidth
                variant="outlined"
                margin="dense"
              >
                {cntTypeData?.map((val) => (
                  <MenuItem key={val} value={val.shortDescription}>
                    {val.shortDescription}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                select
                label="Cover Code"
                className="formtext"
                id="crTable"
                value={crTable}
                placeholder="Cover Code"
                name="crTable"
                onChange={(e) => editChange(e)}
                fullWidth
                variant="outlined"
                margin="dense"
              >
                {coverCodeData?.map((val) => (
                  <MenuItem key={val} value={val.shortDescription}>
                    {val.shortDescription}
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
                disabled
                fullWidth
                variant="outlined"
                margin="dense"
              ></TextField>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                inputFormat="yyyy/MM/dd"
                label="Risk Com Date:"
                id="riskComDate"
                value={moment(riskComDate).format("DD/MM/YYYY")}
                placeholder="Risk Com Date:"
                name="riskComDate"
                disabled
                fullWidth
                variant="outlined"
                margin="dense"
              ></TextField>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                inputFormat="yyyy/MM/dd"
                label="Date Of Commencement Date:"
                id="docDate"
                value={moment(docDate).format("DD/MM/YYYY")}
                placeholder="Date Of Commencement Date:"
                name="docDate"
                disabled
                fullWidth
                variant="outlined"
                margin="dense"
              ></TextField>
            </Grid>
            {/* 
            <Grid item xs={8} md={6} lg={4}>
              <FormControl
                style={{ marginTop: "0.5rem" }}
                className="formtext"
                fullWidth
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    disabled
                  <DatePicker
                    inputFormat="yyyy/MM/dd"
                    label="Risk Com Date:"
                    id="riskComDate"
                    value={moment(riskComDate).format("YYYY/MM/DD")}
                    placeholder="Risk Com Date:"
                    name="riskComDate"
                    onChange={(date) => editChangeDate(date)}
                    renderInput={(params) => <TextField {...params} />}
                    fullWidth
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid> */}

            {/* <Grid item xs={8} md={6} lg={4}>
              <FormControl
                style={{ marginTop: "0.5rem" }}
                className="formtext"
                fullWidth
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    inputFormat="yyyy/MM/dd"
                    label="Date Of Commencement Date:"
                    id="docDate"
                    value={moment(docDate).format("YYYY/MM/DD")}
                    placeholder="Date Of Commencement Date:"
                    name="docDate"
                    onChange={(date) => editChangeDate(date)}
                    renderInput={(params) => <TextField {...params} />}
                    fullWidth
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid> */}

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                label="Sun Assured"
                className="formtext"
                id="sumAssured"
                value={sumAssured}
                placeholder="Sun Assured"
                name="sumAssured"
                disabled
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                label="Risk Cess Term"
                className="formtext"
                id="riskCessTerm"
                value={riskCessTerm}
                placeholder="Risk Cess Term"
                name="riskCessTerm"
                disabled
                fullWidth
                variant="outlined"
                margin="dense"
              ></TextField>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                label="Prem Cess Term"
                className="formtext"
                id="premCessTerm"
                value={premCessTerm}
                placeholder="Prem Cess Term"
                name="premCessTerm"
                disabled
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
                disabled
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
                onChange={(e) => editChange(e)}
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
            {/* <Grid item xs={8} md={6} lg={4}>
              <TextField
                select
                label="Mort Flag"
                className="formtext"
                id="mortFlag"
                value={mortFlag}
                placeholder="Mort Flag"
                name="mortFlag"
                onChange={(e) => editChange(e)}
                fullWidth
                variant="outlined"
                margin="dense"
              >
                {mortFlagData?.map((val) => (
                  <MenuItem key={val} value={val.shortDescription}>
                    {val.shortDescription}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={8} md={6} lg={4}>
              <TextField
                label="Stam Duty Rate"
                className="formtext"
                id="stampRate"
                value={stampRate}
                placeholder="Stam Duty Rate"
                name="stampRate"
                onChange={(e) => editChange(e)}
                fullWidth
                variant="outlined"
                margin="dense"
              ></TextField>
            </Grid> */}
          </Grid>
        </Box>
      </form>
      <br />

      <Button
        color="primary"
        variant="contained"
        style={{ marginRight: 10 }}
        onClick={() => editFormSubmit()}
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

export default CoverDetailPasEdit;
