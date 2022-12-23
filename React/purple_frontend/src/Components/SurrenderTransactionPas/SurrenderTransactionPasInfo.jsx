import React from "react";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { TextField, FormControl, Grid, Box } from "@mui/material";
import { MenuItem } from "@material-ui/core";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DraggableComponent from "../Service/DraggableComponent";
import moment from "moment";
import "../Css/ContentInfo.css";
// import validator from "validator";

function SurrenderTransactionInfo({
  open,
  data,
  handleClose,
  companyData,
  onChange,
  onChangeIpcaApprovalDate,
  onChangeAppate,
  onChangeSvReqDate,
  onChangeEffectiveDate,
  onChangeLogDate,
  handleFormSubmit,
}) {
  let {
    companyId,
    policyNo,
    transNo,
    svReqDate,
    logDate,
    uinNumber,
    gsv,
    ssv,
    policyDeposit,
    penalInterest,
    grossPay,
    cdaCharges,
    tds,
    totalRecovery,
    netPayable,
    effectiveDate,
    fundValue,
    makerFlag,
    checkerFlag,
    ipcaApprovalFlag,
    ipcaApprovalRemarks,
    ipcaApprovalDate,
    qcUserId,
    interimStatus,

    cashValueBonus,
    paidUpValue,
    reversionaryBonus,
    interimBonus,
    otherRecovery,
    policyLoan,
    loanInterest,
    approvedDate,
  } = data;

  return (
    <div>
      <Modal
        show={open}
        dialogAs={DraggableComponent}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Surrender Transaction Pas Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form autoComplete="off">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    select
                    label="Company"
                    className="formtext"
                    id="companyId"
                    value={companyId}
                    placeholder="Company"
                    name="companyId"
                    inputProps={{ readOnly: true }}
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
                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Policy No"
                    className="formtext"
                    id="policyNo"
                    value={policyNo}
                    placeholder="Policy No"
                    name="policyNo"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    label="Trans No"
                    className="formtext"
                    id="transNo"
                    value={transNo}
                    placeholder="Trans No"
                    name="transNo"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
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
                        value={moment(svReqDate).format("YYYY-MM-DD")}
                        placeholder="Sv Req Date"
                        name="svReqDate"
                        maxDate={moment().toDate()}
                        onChange={(e) => onChangeSvReqDate(e)}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                        readOnly
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
                <Grid item xs={8} md={6} lg={3}>
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
                        value={moment(logDate).format("YYYY-MM-DD")}
                        placeholder="Log Date"
                        name="logDate"
                        onChange={(e) => onChangeLogDate(e)}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                        readOnly
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    label="UIN Num"
                    className="formtext"
                    id="uinNumber"
                    value={uinNumber}
                    placeholder="UIN Num"
                    name="uinNumber"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="GSV"
                    className="formtext"
                    id="gsv"
                    value={gsv}
                    placeholder="GSV"
                    name="gsv"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="SSV"
                    className="formtext"
                    id="ssv"
                    value={ssv}
                    placeholder="SSV"
                    name="ssv"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Policy Deposit"
                    className="formtext"
                    id="policyDeposit"
                    value={policyDeposit}
                    placeholder="Policy Deposit"
                    name="policyDeposit"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Penal Interest"
                    className="formtext"
                    id="penalInterest"
                    value={penalInterest}
                    placeholder="Penal Interest"
                    name="penalInterest"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Gross Pay"
                    className="formtext"
                    id="grossPay"
                    value={grossPay}
                    placeholder="Gross Pay"
                    name="grossPay"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="CDA Charges"
                    className="formtext"
                    id="cdaCharges"
                    value={cdaCharges}
                    placeholder="CDA Charges"
                    name="cdaCharges"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="TDS"
                    className="formtext"
                    id="tds"
                    value={tds}
                    placeholder="TDS"
                    name="tds"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Total Recovery"
                    className="formtext"
                    id="totalRecovery"
                    value={totalRecovery}
                    placeholder="Total Recovery"
                    name="totalRecovery"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Net Payable"
                    className="formtext"
                    id="netPayable"
                    value={netPayable}
                    placeholder="Net Payable"
                    name="netPayable"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Cash Value Bonus"
                    className="formtext"
                    id="cashValueBonus"
                    value={cashValueBonus}
                    placeholder="Cash Value Bonus"
                    name="cashValueBonus"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Paid Up Value"
                    className="formtext"
                    id="paidUpValue"
                    value={paidUpValue}
                    placeholder="Paid Up Value"
                    name="paidUpValue"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Reversionary Bonus"
                    className="formtext"
                    id="reversionaryBonus"
                    value={reversionaryBonus}
                    placeholder="Reversionary Bonus"
                    name="reversionaryBonus"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Interim Bonus"
                    className="formtext"
                    id="interimBonus"
                    value={interimBonus}
                    placeholder="Interim Bonus"
                    name="interimBonus"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Other Recovery"
                    className="formtext"
                    id="otherRecovery"
                    value={otherRecovery}
                    placeholder="Other Recovery"
                    name="otherRecovery"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={3}>
                  <FormControl
                    style={{ marginTop: "0.5rem" }}
                    className="formtext"
                    fullWidth
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputFormat="dd/MM/yyyy"
                        label="Approved Date"
                        id="approvedDate"
                        value={moment(approvedDate).format("YYYY-MM-DD")}
                        placeholder="Approved Date"
                        name="approvedDate"
                        onChange={(e) => onChangeAppate(e)}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                        readOnly
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
                <Grid item xs={8} md={6} lg={3}>
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
                        value={moment(effectiveDate).format("YYYY-MM-DD")}
                        placeholder="Effective Date"
                        name="effectiveDate"
                        onChange={(e) => onChangeEffectiveDate(e)}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                        readOnly
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Fund Value"
                    className="formtext"
                    id="fundValue"
                    value={fundValue}
                    placeholder="Fund Value"
                    name="fundValue"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Policy Loan"
                    className="formtext"
                    id="policyLoan"
                    value={policyLoan}
                    placeholder="Policy Loan"
                    name="policyLoan"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Loan Interest"
                    className="formtext"
                    id="loanInterest"
                    value={loanInterest}
                    placeholder="Loan Interest"
                    name="loanInterest"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    label="Maker Flag"
                    className="formtext"
                    id="makerFlag"
                    value={makerFlag}
                    placeholder="Maker Flag"
                    name="makerFlag"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    label="Checker Flag"
                    className="formtext"
                    id="checkerFlag"
                    value={checkerFlag}
                    placeholder="Checker Flag"
                    name="checkerFlag"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                {/* <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    label="IPCA Approval Flag"
                    className="formtext"
                    id="ipcaApprovalFlag"
                    value={ipcaApprovalFlag}
                    placeholder="IPCA Approval Flag"
                    name="ipcaApprovalFlag"
                    inputProps={{readOnly:true}}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    label="IPCA Approval Remarks"
                    className="formtext"
                    id="ipcaApprovalRemarks"
                    value={ipcaApprovalRemarks}
                    placeholder="IPCA Approval Remarks"
                    name="ipcaApprovalRemarks"
                    inputProps={{readOnly:true}}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={3}>
                  <FormControl
                    style={{ marginTop: "0.5rem" }}
                    className="formtext"
                    fullWidth
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputFormat="dd/MM/yyyy"
                        label="IPCA Approval Date"
                        id="ipcaApprovalDate"
                        value={ipcaApprovalDate}
                        placeholder="IPCA Approval Date"
                        name="ipcaApprovalDate"
                        onChange={(e) => onChangeIpcaApprovalDate(e)}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid> */}
                {/* <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="QC User Id"
                    className="formtext"
                    id="qcUserId"
                    value={qcUserId}
                    placeholder="QC User Id"
                    name="qcUserId"
                    inputProps={{readOnly:true}}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid> */}
                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    label="Interim Status"
                    className="formtext"
                    id="interimStatus"
                    value={interimStatus}
                    placeholder="Interim Status"
                    name="interimStatus"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
              </Grid>
            </Box>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} variant="danger">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SurrenderTransactionInfo;
