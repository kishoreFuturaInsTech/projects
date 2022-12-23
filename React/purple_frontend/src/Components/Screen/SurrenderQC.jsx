import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DownloadIcon from "@mui/icons-material/Download";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TreeItem from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import {
  Grid,
  MenuItem,
  Paper,
  TextField,
  Tooltip,
  FormControl,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../Css/Content.css";
import Notification from "../Dialogs/Notification";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BsCardChecklist } from "react-icons/bs";
import FundCheck from "./FundCheck";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function SurrenderQC({ data, open, close, getData }) {
  const userId = sessionStorage.getItem("userId");

  const [policyData, setpolicyData] = useState({});
  const [coverData, setcoverData] = useState([]);
  const [purpleData, setpurpleData] = useState({});
  const [transData, settransData] = useState([]);

  const [fundCheck, setfundCheck] = useState(false);

  const fundCheckingOpen = () => {
    setfundCheck(true);
  };

  const fundCheckingClose = () => {
    setfundCheck(false);
  };

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [submitCheck, setsubmitCheck] = useState(true);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setpurpleData({ ...purpleData, [name]: value });
  };

  const getPolicyData = () => {
    axios
      .get(
        `http://localhost:8080/surrenderpolicydetails/getByPolicyNo/${data.policyNo}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        setpolicyData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCoverData = () => {
    axios
      .get(
        `http://localhost:8080/surrenderCoverPas/getByPolicyNo/${data.policyNo}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        setcoverData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTransData = () => {
    axios
      .get(
        `http://localhost:8080/surrenderTransactionPas/getProcessedByPolicyNo/${data.policyNo}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        settransData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getIpcaSurrender = () => {
    axios
      .get(
        `http://localhost:8080/ipcaSurrender/getByPolicyNo/${data.policyNo}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        setpurpleData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
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

  // const qcSubmit = () => {
  //   axios
  //     .patch(
  //       `http://localhost:8080/purpledetails/qcUpdate/${purpleData.policyNo}/${userId}`,
  //       {
  //         approvFlag: purpleData.approvFlag,
  //         approvRemarks: purpleData.approvRemarks,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  //         },
  //       }
  //     )
  //     .then((resp) => {
  //       console.log(resp);
  //       close();
  //       getData();
  //       setNotify({
  //         isOpen: true,
  //         message: "Updated Successfully",
  //         type: "success",
  //       });
  //     });
  // };

  // function downloadPdf() {
  //   axios({
  //     url: `http://localhost:8080/purpledetails/generatePdf/${purpleData.policyNo}`,
  //     method: "GET",
  //     responseType: "blob",
  //     headers: {
  //       Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  //     },
  //   }).then((response) => {
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", "purple.pdf");
  //     link.click();
  //   });
  // }

  useEffect(() => {
    getPolicyData();
    getCoverData();
    getTransData();
    getIpcaSurrender();
    return () => {};
  }, []);

  return (
    <div>
      <Paper elevation={12} className="paperContainer">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            onClick={close}
            variant="danger"
            style={{ marginLeft: "2rem", marginTop: "1.3rem" }}
          >
            <ArrowBackIcon />
          </Button>
          <h1>Surrender Quality Checking</h1>
          <div>
            {transData.interimStatus === "Processed" ? (
              <Tooltip title="Generate PDF">
                <DownloadIcon
                  color="primary"
                  style={{
                    cursor: "pointer",
                    marginRight: "2rem",
                    marginTop: "1.3rem",
                  }}
                  // onClick={() => downloadPdf()}
                />
              </Tooltip>
            ) : null}
          </div>
        </div>

        <Paper className="paperScreen" elevation={12}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1>Surrender Policy and Cover Details </h1>
            {policyData?.uinNumber?.includes("L") ? <h4>Ulip </h4> : null}
            {policyData?.uinNumber?.includes("N") ? <h4>Non-Ulip </h4> : null}
          </div>

          <div>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Company"
                    className="formtext"
                    id="companyId"
                    value={policyData?.company?.companyName}
                    placeholder="Company"
                    inputProps={{ readOnly: true }}
                    name="companyId"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Client Number"
                    className="formtext"
                    id="clntNum"
                    value={policyData?.clntNum}
                    placeholder="Client Num"
                    inputProps={{ readOnly: true }}
                    name="clntNum"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Policy Number"
                    className="formtext"
                    id="chdrNum"
                    value={policyData?.chdrNum}
                    placeholder="Policy Num"
                    inputProps={{ readOnly: true }}
                    name="chdrNum"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Bill Frequency"
                    className="formtext"
                    id="billFreq"
                    value={policyData?.billFreq}
                    placeholder="Bill Frequency"
                    inputProps={{ readOnly: true }}
                    name="billFreq"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Installment premium"
                    className="formtext"
                    id="installmentPremium"
                    value={policyData?.installmentPremium}
                    placeholder="Installment premium"
                    inputProps={{ readOnly: true }}
                    name="installmentPremium"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Extra premium"
                    className="formtext"
                    id="extraPremium"
                    value={policyData?.extraPremium}
                    placeholder="Extra premium"
                    inputProps={{ readOnly: true }}
                    name="extraPremium"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="UIN No."
                    className="formtext"
                    id="uinNumber"
                    value={policyData?.uinNumber}
                    placeholder="UIN No."
                    inputProps={{ readOnly: true }}
                    name="uinNumber"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="FUP:"
                    className="formtext"
                    id="fup"
                    value={moment(policyData?.fup).format("DD/MM/YYYY")}
                    placeholder="FUP:"
                    inputProps={{ readOnly: true }}
                    name="fup"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="DOC Date:"
                    className="formtext"
                    id="docDate"
                    value={moment(policyData?.docDate).format("DD/MM/YYYY")}
                    placeholder="DOC Date:"
                    inputProps={{ readOnly: true }}
                    name="docDate"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Life Assured Age"
                    className="formtext"
                    id="laAge"
                    value={policyData?.laAge}
                    placeholder="Life Assured Age"
                    inputProps={{ readOnly: true }}
                    name="laAge"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Policy Holder Age"
                    className="formtext"
                    id="phAge"
                    value={policyData?.phAge}
                    placeholder="Policy Holder Age"
                    inputProps={{ readOnly: true }}
                    name="phAge"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Status Code"
                    className="formtext"
                    id="statusCode"
                    value={policyData?.statusCode}
                    placeholder="Status Code"
                    inputProps={{ readOnly: true }}
                    name="statusCode"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Smoker Flag"
                    className="formtext"
                    id="smokerFlag"
                    value={policyData?.smokerFlag}
                    placeholder="Smoker Flag"
                    inputProps={{ readOnly: true }}
                    name="smokerFlag"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  ></TextField>
                </Grid>
              </Grid>
            </form>
            <hr />
            <>
              <h1>Coverages/Riders</h1>
              {coverData.map((val, index) => (
                <form>
                  <TreeView
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                  >
                    <TreeItem
                      nodeId={val.id}
                      label={`${val.planCode} ( ${val.planName} )`}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={8} md={6} lg={4}>
                          <TextField
                            label="Company"
                            className="formtext"
                            id="companyId"
                            value={val?.company?.companyName}
                            placeholder="Company"
                            name="companyId"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          ></TextField>
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                          <TextField
                            label="Client Number"
                            className="formtext"
                            id="clntNum"
                            value={val.clntNum}
                            placeholder="Client Number"
                            name="clntNum"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          ></TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                          <TextField
                            label="Policy No"
                            className="formtext"
                            id="policyNo"
                            value={val.policyNo}
                            placeholder="Policy No"
                            name="policyNo"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                          <TextField
                            label="Plan Name"
                            className="formtext"
                            id="planName"
                            value={val.planName}
                            placeholder="Plan Name"
                            name="planName"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          ></TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                          <TextField
                            label="Plan Code"
                            className="formtext"
                            id="planCode"
                            value={val.planCode}
                            placeholder="Plan Code"
                            name="planCode"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          ></TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                          <TextField
                            label="UIN Number"
                            className="formtext"
                            id="uinNumber"
                            value={val.uinNumber}
                            placeholder="UIN Number"
                            name="uinNumber"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          ></TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                          <TextField
                            label="Risk Com Date:"
                            id="riskComDate"
                            value={moment(val.riskComDate).format("DD/MM/YYYY")}
                            placeholder="Risk Com Date:"
                            name="riskComDate"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          ></TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                          <TextField
                            label="Date Of Commencement Date:"
                            id="docDate"
                            value={moment(val.docDate).format("DD/MM/YYYY")}
                            placeholder="Date Of Commencement Date:"
                            name="docDate"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          ></TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                          <TextField
                            label="Sum Assured"
                            className="formtext"
                            id="sumAssured"
                            value={val.sumAssured}
                            placeholder="Sum Assured"
                            name="sumAssured"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                          <TextField
                            label="Premium Term"
                            className="formtext"
                            id="policyTerm"
                            value={val.policyTerm}
                            placeholder="Premium Term"
                            name="policyTerm"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          ></TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                          <TextField
                            label="Premium Term"
                            className="formtext"
                            id="premiumTerm"
                            value={val.premiumTerm}
                            placeholder="Premium Term"
                            name="premiumTerm"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          ></TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                          <TextField
                            label="Cover Premium"
                            className="formtext"
                            id="coverPremium"
                            value={val.coverPremium}
                            placeholder="Cover Premium"
                            name="coverPremium"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                          <TextField
                            label="Cover Status"
                            className="formtext"
                            id="coverStatus"
                            value={val.coverStatus}
                            placeholder="Cover Status"
                            name="coverStatus"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          ></TextField>
                        </Grid>
                      </Grid>
                    </TreeItem>
                  </TreeView>
                </form>
              ))}
            </>
          </div>
        </Paper>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Paper elevation={12} className="paperTrans">
            <h1>Data From Surrender PAS</h1>

            <>
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={8} md={6} lg={4}>
                    <TextField
                      label="Company"
                      className="formtext"
                      id="companyId"
                      value={transData?.company?.companyName}
                      placeholder="Company"
                      name="companyId"
                      inputProps={{ readOnly: true }}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    ></TextField>
                  </Grid>
                  <Grid item xs={8} md={6} lg={4}>
                    <TextField
                      type="number"
                      label="Policy No"
                      className="formtext"
                      id="policyNo"
                      value={transData.policyNo}
                      placeholder="Policy No"
                      name="policyNo"
                      inputProps={{ readOnly: true }}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={8} md={6} lg={4}>
                    <TextField
                      label="Trans No"
                      className="formtext"
                      id="transNo"
                      value={transData.transNo}
                      placeholder="Trans No"
                      name="transNo"
                      inputProps={{ readOnly: true }}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    />
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
                          label="Sv Req Date"
                          id="svReqDate"
                          value={moment(transData.svReqDate).format(
                            "YYYY-MM-DD"
                          )}
                          placeholder="Sv Req Date"
                          name="svReqDate"
                          maxDate={moment().toDate()}
                          onChange={(e) => onChangeSvReqDate(e)}
                          renderInput={(params) => <TextField {...params} />}
                          fullWidth
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
                          label="Log Date"
                          id="logDate"
                          value={moment(transData.logDate).format("YYYY-MM-DD")}
                          placeholder="Log Date"
                          name="logDate"
                          onChange={(e) => onChangeLogDate(e)}
                          renderInput={(params) => <TextField {...params} />}
                          fullWidth
                        />{" "}
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>

                  <Grid item xs={8} md={6} lg={4}>
                    <TextField
                      label="UIN Num"
                      className="formtext"
                      id="uinNumber"
                      value={transData.uinNumber}
                      placeholder="UIN Num"
                      name="uinNumber"
                      inputProps={{ readOnly: true }}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={8} md={6} lg={4}>
                    <TextField
                      type="number"
                      label="GSV"
                      className="formtext"
                      id="gsv"
                      value={transData.gsv}
                      placeholder="GSV"
                      name="gsv"
                      inputProps={{ readOnly: true }}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={8} md={6} lg={4}>
                    <TextField
                      type="number"
                      label="SSV"
                      className="formtext"
                      id="ssv"
                      value={transData.ssv}
                      placeholder="SSV"
                      name="ssv"
                      inputProps={{ readOnly: true }}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={8} md={6} lg={4}>
                    <TextField
                      type="number"
                      label="Policy Deposit"
                      className="formtext"
                      id="policyDeposit"
                      value={transData.policyDeposit}
                      placeholder="Policy Deposit"
                      name="policyDeposit"
                      inputProps={{ readOnly: true }}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={8} md={6} lg={4}>
                    <TextField
                      type="number"
                      label="Penal Interest"
                      className="formtext"
                      id="penalInterest"
                      value={transData.penalInterest}
                      placeholder="Penal Interest"
                      name="penalInterest"
                      inputProps={{ readOnly: true }}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={8} md={6} lg={4}>
                    <TextField
                      type="number"
                      label="Gross Pay"
                      className="formtext"
                      id="grossPay"
                      value={transData.grossPay}
                      placeholder="Gross Pay"
                      name="grossPay"
                      inputProps={{ readOnly: true }}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={8} md={6} lg={4}>
                    <TextField
                      type="number"
                      label="CDA Charges"
                      className="formtext"
                      id="cdaCharges"
                      value={transData.cdaCharges}
                      placeholder="CDA Charges"
                      name="cdaCharges"
                      inputProps={{ readOnly: true }}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={8} md={6} lg={4}>
                    <TextField
                      type="number"
                      label="TDS"
                      className="formtext"
                      id="tds"
                      value={transData.tds}
                      placeholder="TDS"
                      name="tds"
                      inputProps={{ readOnly: true }}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={8} md={6} lg={4}>
                    <TextField
                      type="number"
                      label="Total Recovery"
                      className="formtext"
                      id="totalRecovery"
                      value={transData.totalRecovery}
                      placeholder="Total Recovery"
                      name="totalRecovery"
                      inputProps={{ readOnly: true }}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={8} md={6} lg={4}>
                    <TextField
                      type="number"
                      label="Net Payable"
                      className="formtext"
                      id="netPayable"
                      value={transData.netPayable}
                      placeholder="Net Payable"
                      name="netPayable"
                      inputProps={{ readOnly: true }}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    />
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
                          label="Effective Date"
                          id="effectiveDate"
                          value={moment(transData.effectiveDate).format(
                            "YYYY-MM-DD"
                          )}
                          placeholder="Effective Date"
                          name="effectiveDate"
                          onChange={(e) => onChangeEffectiveDate(e)}
                          renderInput={(params) => <TextField {...params} />}
                          fullWidth
                        />{" "}
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={8} md={6} lg={4}>
                    <TextField
                      type="number"
                      label="Fund Value"
                      className="formtext"
                      id="fundValue"
                      value={transData.fundValue}
                      placeholder="Fund Value"
                      name="fundValue"
                      inputProps={{ readOnly: true }}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={8} md={6} lg={4}>
                    <TextField
                      label="Maker Flag"
                      className="formtext"
                      id="makerFlag"
                      value={transData.makerFlag}
                      placeholder="Maker Flag"
                      name="makerFlag"
                      inputProps={{ readOnly: true }}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={8} md={6} lg={4}>
                    <TextField
                      label="Checker Flag"
                      className="formtext"
                      id="checkerFlag"
                      value={transData.checkerFlag}
                      placeholder="Checker Flag"
                      name="checkerFlag"
                      inputProps={{ readOnly: true }}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={8} md={6} lg={4}>
                    <TextField
                      label="Interim Status"
                      className="formtext"
                      id="interimStatus"
                      value={transData.interimStatus}
                      placeholder="Interim Status"
                      name="interimStatus"
                      inputProps={{ readOnly: true }}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>
              </form>
            </>
          </Paper>

          <Paper elevation={12} className="paperPurple">
            <h1>IPCA Surrender Details</h1>

            <form>
              <Grid container spacing={2}>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Company"
                    className="formtext"
                    id="companyId"
                    value={purpleData?.company?.companyName}
                    placeholder="Company"
                    name="companyId"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  ></TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Policy No."
                    className="formtext"
                    id="policyNo"
                    value={purpleData.policyNo}
                    placeholder="Company"
                    name="policyNo"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  ></TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Transaction No."
                    className="formtext"
                    id="transNo"
                    value={purpleData.transNo}
                    placeholder="Transaction No."
                    name="transNo"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="UIN Number"
                    className="formtext"
                    id="uinNumber"
                    value={purpleData.uinNumber}
                    placeholder="UIN Number"
                    name="uinNumber"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
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
                        label="Req Date:"
                        id="reqDate"
                        value={moment(purpleData.reqDate).format("YYYY-MM-DD")}
                        placeholder="Req Date:"
                        name="reqDate"
                        readOnly
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
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
                        label="Log Date:"
                        id="logDate"
                        value={moment(purpleData.logDate).format("YYYY-MM-DD")}
                        placeholder="Log Date:"
                        name="logDate"
                        readOnly
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="No Of Dues"
                    className="formtext"
                    id="noOfDues"
                    value={purpleData.noOfDues}
                    placeholder="No Of Dues"
                    name="noOfDues"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Total Premium"
                    className="formtext"
                    id="totalPremium"
                    value={purpleData.totalPremium}
                    placeholder="Total Premium"
                    name="totalPremium"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Value Of Bonus"
                    className="formtext"
                    id="valueOfbonus"
                    value={purpleData.valueOfbonus}
                    placeholder="Value Of Bonus"
                    name="valueOfbonus"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="CVB Factor"
                    className="formtext"
                    id="cvbFactor"
                    value={purpleData.cvbFactor}
                    placeholder="CVB Factor"
                    name="cvbFactor"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="GSV Factor"
                    className="formtext"
                    id="gsvFactor"
                    value={purpleData.gsvFactor}
                    placeholder="GSV Factor"
                    name="gsvFactor"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="GSV Gross"
                    className="formtext"
                    id="gsvGross"
                    value={purpleData.gsvGross}
                    placeholder="GSV Gross"
                    name="gsvGross"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="SB Paid"
                    className="formtext"
                    id="sbPaid"
                    value={purpleData.sbPaid}
                    placeholder="SB Paid"
                    name="sbPaid"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="GSV Net"
                    className="formtext"
                    id="gsvNet"
                    value={purpleData.gsvNet}
                    placeholder="GSV Net"
                    name="gsvNet"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Paid Up Value"
                    className="formtext"
                    id="paidUpValue"
                    value={purpleData.paidUpValue}
                    placeholder="Paid Up Value"
                    name="paidUpValue"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Reversionary Bonus"
                    className="formtext"
                    id="reversionaryBonus"
                    value={purpleData.reversionaryBonus}
                    placeholder="Reversionary Bonus"
                    name="reversionaryBonus"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Guaranteed Bonus"
                    className="formtext"
                    id="guaranteedBonus"
                    value={purpleData.guaranteedBonus}
                    placeholder="Guaranteed Bonus"
                    name="guaranteedBonus"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Terminal Bonus"
                    className="formtext"
                    id="terminalBonus"
                    value={purpleData.terminalBonus}
                    placeholder="Terminal Bonus"
                    name="terminalBonus"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="SSV Gross Amount"
                    className="formtext"
                    id="ssvGrossAmount"
                    value={purpleData.ssvGrossAmount}
                    placeholder="SSV Gross Amount"
                    name="ssvGrossAmount"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="SSV Factor"
                    className="formtext"
                    id="ssvFactor"
                    value={purpleData.ssvFactor}
                    placeholder="SSV Factor"
                    name="ssvFactor"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="SSV Net"
                    className="formtext"
                    id="ssvNet"
                    value={purpleData.ssvNet}
                    placeholder="SSV Net"
                    name="ssvNet"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="SSV Or GSV"
                    className="formtext"
                    id="ssvOrGsv"
                    value={purpleData.ssvOrGsv}
                    placeholder="SSV Or GSV"
                    name="ssvOrGsv"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Fund Value"
                    className="formtext"
                    id="fundValue"
                    value={purpleData.fundValue}
                    placeholder="Fund Value"
                    name="fundValue"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
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
                        label="Effective Date:"
                        id="effDate"
                        value={moment(purpleData.effDate).format("YYYY-MM-DD")}
                        placeholder="Effective Date:"
                        name="effDate"
                        readOnly
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
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
                        label="Approval Date:"
                        id="approvDate"
                        value={moment(purpleData.approvDate).format(
                          "YYYY-MM-DD"
                        )}
                        placeholder="Approval Date:"
                        name="approvDate"
                        readOnly
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Policy Deposite"
                    className="formtext"
                    id="policyDeposite"
                    value={purpleData.policyDeposite}
                    placeholder="Policy Deposite"
                    name="policyDeposite"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Penal Intrest"
                    className="formtext"
                    id="penalIntrest"
                    value={purpleData.penalIntrest}
                    placeholder="Penal Intrest"
                    name="penalIntrest"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Gross Pay"
                    className="formtext"
                    id="grossPay"
                    value={purpleData.grossPay}
                    placeholder="Gross Pay"
                    name="grossPay"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="CDA Charge"
                    className="formtext"
                    id="cdaCharge"
                    value={purpleData.cdaCharge}
                    placeholder="CDA Charge"
                    name="cdaCharge"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Other Recovery"
                    className="formtext"
                    id="otherRecovery"
                    value={purpleData.otherRecovery}
                    placeholder="Other Recovery"
                    name="otherRecovery"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="TDS"
                    className="formtext"
                    id="tds"
                    value={purpleData.tds}
                    placeholder="TDS"
                    name="tds"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Total Recovery"
                    className="formtext"
                    id="totalRecovery"
                    value={purpleData.totalRecovery}
                    placeholder="Total Recovery"
                    name="totalRecovery"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Net Payable"
                    className="formtext"
                    id="netPayable"
                    value={purpleData.netPayable}
                    placeholder="Net Payable"
                    name="netPayable"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Maker Flag"
                    className="formtext"
                    id="makerFlag"
                    value={purpleData.makerFlag}
                    placeholder="Maker Flag"
                    name="makerFlag"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Checker Flag"
                    className="formtext"
                    id="checkerFlag"
                    value={purpleData.checkerFlag}
                    placeholder="Checker Flag"
                    name="checkerFlag"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Purple Remarks"
                    className="formtext"
                    id="pfRemarks"
                    value={purpleData.pfRemarks}
                    placeholder="Purple Remarks"
                    name="pfRemarks"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </form>
          </Paper>
          <Paper
            elevation={12}
            className="paperFlag"
            // style={{
            //   backgroundColor:
            //     purpleData.pfFlag === "Pass" ? "#b5ffa6" : "#f593a3",
            // }}
          >
            <h1>IPCA Flag</h1>

            <>
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={8} md={6} lg={6}>
                    <TextField
                      label="Purple Pass or Fail"
                      className="formtext"
                      id="pfFlag"
                      value={purpleData.pfFlag}
                      placeholder="Purple Pass or Fail"
                      name="pfFlag"
                      inputProps={{ readOnly: true }}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={8} md={6} lg={6}>
                    <TextField
                      label="Purple Remarks"
                      className="formtext"
                      id="pfRemarks"
                      value={purpleData.pfRemarks}
                      placeholder="Purple Remarks"
                      name="pfRemarks"
                      inputProps={{ readOnly: true }}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>
              </form>
              <hr />
              <h3>QC Approval</h3>
              <Grid item xs={8} md={6} lg={6}>
                <TextField
                  select
                  required
                  label="QC Approval Flag"
                  className="formtext"
                  id="approvFlag"
                  value={purpleData.approvFlag}
                  placeholder="QC Approval Flag"
                  name="approvFlag"
                  onChange={(e) => handleChange(e)}
                  fullWidth
                  variant="outlined"
                  margin="dense"
                >
                  {pf.map((val, index) => (
                    <MenuItem value={val.shortDescription}>
                      {val.longDescription}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={8} md={6} lg={6}>
                <TextField
                  required
                  label="Approve Remarks"
                  className="formtext"
                  id="approvRemarks"
                  value={purpleData.approvRemarks}
                  placeholder="Approve Remarks"
                  name="approvRemarks"
                  onChange={(e) => handleChange(e)}
                  fullWidth
                  variant="outlined"
                  margin="dense"
                />
              </Grid>
              <Button
                style={{ margin: "1rem 0 0 35%" }}
                // onClick={() => qcSubmit()}
                // ={!(purpleData.approvFlag && purpleData.approvRemarks)}
              >
                Submit
              </Button>
            </>
          </Paper>
        </div>
      </Paper>

      {/* <FundCheck
        open={fundCheck}
        close={fundCheckingClose}
        policyNo={policyData?.chdrNum}
      /> */}

      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default SurrenderQC;
