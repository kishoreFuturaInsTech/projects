import { Box, FormControl, Grid, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../Css/ContentEdit.css";
import DraggableComponent from "../Service/DraggableComponent";

function IPCASurrenderEdit({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
  policyData,
  passFail,
  onChangeAppDate,
  onChangeReqDate,
  onChangeLogDate,
  onChangeEffDate,
}) {
  let {
    companyId,
    policyNo,
    transNo,
    uinNumber,
    reqDate,
    logDate,
    noOfDues,
    totalPremium,
    valueOfbonus,
    cvbFactor,
    gsvFactor,
    gsvGross,
    sbPaid,
    gsvNet,
    paidUpValue,
    reversionaryBonus,
    guaranteedBonus,
    terminalBonus,
    ssvGrossAmount,
    ssvFactor,
    ssvNet,
    ssvOrGsv,
    fundValue,
    effDate,
    approvDate,
    policyDeposite,
    penalIntrest,
    grossPay,
    cdaCharge,
    otherRecovery,
    tds,
    totalRecovery,
    netPayable,
    makerFlag,
    checkerFlag,
    pfFlag,
    pfRemarks,
    purpleApprovalFlag,
    purpleApprovalRemark,
    purpleApprovalDate,
    approvalQcUserId,
    interimStatus,
  } = data;

  return (
    <div>
      <Modal
        show={open}
        dialogAs={DraggableComponent}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="xl"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>IPCA Surrender Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form autoComplete="off">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Company"
                    className="formtext"
                    id="companyId"
                    value={companyId}
                    placeholder="Company"
                    name="companyId"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    disabled
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>
                {/* <Grid item xs={8} md={6} lg={2}>
                  <FormControl
                    style={{ marginTop: "0.5rem" }}
                    className="formtext"
                    fullWidth
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputFormat="dd/MM/yyyy"
                        label="Transaction Date:"
                        id="trandata"
                        value={trandata}
                        placeholder="Transaction Date:"
                        name="trandata"
                        onChange={(e) => onChangeTranDate(e)}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid> */}
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Policy No."
                    className="formtext"
                    id="policyNo"
                    value={policyNo}
                    placeholder="Company"
                    name="policyNo"
                    disabled
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Transaction No."
                    className="formtext"
                    id="transNo"
                    value={transNo}
                    placeholder="Transaction No."
                    name="transNo"
                    disabled
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="UIN Number"
                    className="formtext"
                    id="uinNumber"
                    value={uinNumber}
                    placeholder="UIN Number"
                    name="uinNumber"
                    disabled
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
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
                        value={moment(reqDate).format("YYYY-MM-DD")}
                        placeholder="Req Date:"
                        name="reqDate"
                        onChange={(e) => onChangeReqDate(e)}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
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
                        value={moment(logDate).format("YYYY-MM-DD")}
                        placeholder="Log Date:"
                        name="logDate"
                        onChange={(e) => onChangeLogDate(e)}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="No Of Dues"
                    className="formtext"
                    id="noOfDues"
                    value={noOfDues}
                    placeholder="No Of Dues"
                    name="noOfDues"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Total Premium"
                    className="formtext"
                    id="totalPremium"
                    value={totalPremium}
                    placeholder="Total Premium"
                    name="totalPremium"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Value Of Bonus"
                    className="formtext"
                    id="valueOfbonus"
                    value={valueOfbonus}
                    placeholder="Value Of Bonus"
                    name="valueOfbonus"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="CVB Factor"
                    className="formtext"
                    id="cvbFactor"
                    value={cvbFactor}
                    placeholder="CVB Factor"
                    name="cvbFactor"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="GSV Factor"
                    className="formtext"
                    id="gsvFactor"
                    value={gsvFactor}
                    placeholder="GSV Factor"
                    name="gsvFactor"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="GSV Gross"
                    className="formtext"
                    id="gsvGross"
                    value={gsvGross}
                    placeholder="GSV Gross"
                    name="gsvGross"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="SB Paid"
                    className="formtext"
                    id="sbPaid"
                    value={sbPaid}
                    placeholder="SB Paid"
                    name="sbPaid"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="GSV Net"
                    className="formtext"
                    id="gsvNet"
                    value={gsvNet}
                    placeholder="GSV Net"
                    name="gsvNet"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Paid Up Value"
                    className="formtext"
                    id="paidUpValue"
                    value={paidUpValue}
                    placeholder="Paid Up Value"
                    name="paidUpValue"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Reversionary Bonus"
                    className="formtext"
                    id="reversionaryBonus"
                    value={reversionaryBonus}
                    placeholder="Reversionary Bonus"
                    name="reversionaryBonus"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Guaranteed Bonus"
                    className="formtext"
                    id="guaranteedBonus"
                    value={guaranteedBonus}
                    placeholder="Guaranteed Bonus"
                    name="guaranteedBonus"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Terminal Bonus"
                    className="formtext"
                    id="terminalBonus"
                    value={terminalBonus}
                    placeholder="Terminal Bonus"
                    name="terminalBonus"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="SSV Gross Amount"
                    className="formtext"
                    id="ssvGrossAmount"
                    value={ssvGrossAmount}
                    placeholder="SSV Gross Amount"
                    name="ssvGrossAmount"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="SSV Factor"
                    className="formtext"
                    id="ssvFactor"
                    value={ssvFactor}
                    placeholder="SSV Factor"
                    name="ssvFactor"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="SSV Net"
                    className="formtext"
                    id="ssvNet"
                    value={ssvNet}
                    placeholder="SSV Net"
                    name="ssvNet"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="SSV Or GSV"
                    className="formtext"
                    id="ssvOrGsv"
                    value={ssvOrGsv}
                    placeholder="SSV Or GSV"
                    name="ssvOrGsv"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Fund Value"
                    className="formtext"
                    id="fundValue"
                    value={fundValue}
                    placeholder="Fund Value"
                    name="fundValue"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
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
                        value={moment(effDate).format("YYYY-MM-DD")}
                        placeholder="Effective Date:"
                        name="effDate"
                        onChange={(e) => onChangeEffDate(e)}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
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
                        value={moment(approvDate).format("YYYY-MM-DD")}
                        placeholder="Approval Date:"
                        name="approvDate"
                        onChange={(e) => onChangeAppDate(e)}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Policy Deposite"
                    className="formtext"
                    id="policyDeposite"
                    value={policyDeposite}
                    placeholder="Policy Deposite"
                    name="policyDeposite"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Penal Intrest"
                    className="formtext"
                    id="penalIntrest"
                    value={penalIntrest}
                    placeholder="Penal Intrest"
                    name="penalIntrest"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Gross Pay"
                    className="formtext"
                    id="grossPay"
                    value={grossPay}
                    placeholder="Gross Pay"
                    name="grossPay"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="CDA Charge"
                    className="formtext"
                    id="cdaCharge"
                    value={cdaCharge}
                    placeholder="CDA Charge"
                    name="cdaCharge"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Other Recovery"
                    className="formtext"
                    id="otherRecovery"
                    value={otherRecovery}
                    placeholder="Other Recovery"
                    name="otherRecovery"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="TDS"
                    className="formtext"
                    id="tds"
                    value={tds}
                    placeholder="TDS"
                    name="tds"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Total Recovery"
                    className="formtext"
                    id="totalRecovery"
                    value={totalRecovery}
                    placeholder="Total Recovery"
                    name="totalRecovery"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Net Payable"
                    className="formtext"
                    id="netPayable"
                    value={netPayable}
                    placeholder="Net Payable"
                    name="netPayable"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Maker Flag"
                    className="formtext"
                    id="makerFlag"
                    value={makerFlag}
                    placeholder="Maker Flag"
                    name="makerFlag"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Checker Flag"
                    className="formtext"
                    id="checkerFlag"
                    value={checkerFlag}
                    placeholder="Checker Flag"
                    name="checkerFlag"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Purple Remarks"
                    className="formtext"
                    id="pfRemarks"
                    value={pfRemarks}
                    placeholder="Purple Remarks"
                    name="pfRemarks"
                    onChange={(e) => onChange(e)}
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
          <Button variant="primary" onClick={() => handleFormSubmit()}>
            {"Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default IPCASurrenderEdit;
