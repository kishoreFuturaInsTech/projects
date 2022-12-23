import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { TextField, FormControl, Grid, Box } from "@mui/material";
import { MenuItem } from "@material-ui/core";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DraggableComponent from "../Service/DraggableComponent";
import moment from "moment";

import "../Css/ContentAdd.css";

export default function CompanyAdd({
  open,
  handleClose,
  transNoError,
  data,
  companyData,
  policyDetails,
  medicalTestData,
  medicalCenterData,
  InterimStatusData,
  medicalTpaData,
  onChange,
  onChangeFlcReq,
  onChangeLogDate,
  onChangeAppDate,
  onChangeEffDate,
  onChangePAD,
  handleFormSubmit,
}) {
  let {
    companyId,
    flcPolicyNo,
    flcTransNo,
    flcReqDate,
    flcLogDate,
    uinNumber,
    flcPremRefund,
    flcTotalPrem,
    flcPolicyDop,
    penalIntrest,
    grossFlcPay,
    medicalFee,
    stamDuty,
    riskPremRecov,
    mortChargeRefund,
    totalRecov,
    netFlcPay,
    effDate,
    fundValue,
    flcApprovalDate,
    medicalCategory,
    medicalCenter,
    medicatTpaCode,
    makerFlag,
    checkerFlag,
    purpleApprovalFlag,
    purpleApprovalRemark,
    purpleApprovalDate,
    interimStatus,
    approvalQcUserId,
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
          <Modal.Title>Transaction Add</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form autoComplete="off">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Company Id"
                    className="formtext"
                    id="companyId"
                    value={companyId}
                    placeholder="company Id"
                    name="companyId"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {companyData.map((val, index) => (
                      <MenuItem value={val.id}>{val.companyName}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Policy No"
                    className="formtext"
                    id="flcPolicyNo"
                    value={flcPolicyNo}
                    placeholder="Policy No"
                    name="flcPolicyNo"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {policyDetails.map((val, index) => (
                      <MenuItem value={val.chdrNum}>{val.chdrNum}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    label="Trans No"
                    className="formtext"
                    id="flcTransNo"
                    value={flcTransNo}
                    placeholder="Trans No"
                    name="flcTransNo"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                  <p style={{ marginLeft: "0.5rem", color: "red" }}>
                    {transNoError}
                  </p>
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
                        label="Req Date"
                        id="flcReqDate"
                        value={flcReqDate}
                        placeholder="Req Date"
                        name="flcReqDate"
                        onChange={(e) => onChangeFlcReq(e)}
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
                        label="Log Date"
                        id="flcLogDate"
                        value={flcLogDate}
                        placeholder="Log Date"
                        name="flcLogDate"
                        onChange={(e) => onChangeLogDate(e)}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                        maxDate={moment().toDate()}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="UIN Number"
                    className="formtext"
                    id="uinNumber"
                    value={uinNumber}
                    placeholder="UIN Number"
                    name="uinNumber"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    label="Prem Refund"
                    className="formtext"
                    id="flcPremRefund"
                    value={flcPremRefund}
                    placeholder="Prem Refund"
                    name="flcPremRefund"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    label="Total Premium"
                    className="formtext"
                    id="flcTotalPrem"
                    value={flcTotalPrem}
                    placeholder="Total Premium"
                    name="flcTotalPrem"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
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

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    label="Policy Dep"
                    className="formtext"
                    id="flcPolicyDop"
                    value={flcPolicyDop}
                    placeholder="Policy Dep"
                    name="flcPolicyDop"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    label="Mort Charge Refund"
                    className="formtext"
                    id="mortChargeRefund"
                    value={mortChargeRefund}
                    placeholder="Mort Charge Refund"
                    name="mortChargeRefund"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    label="Penal Interest"
                    className="formtext"
                    id="penalIntrest"
                    value={penalIntrest}
                    placeholder="Penal Interest"
                    name="penalIntrest"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    label="Gross Pay"
                    className="formtext"
                    id="grossFlcPay"
                    value={grossFlcPay}
                    placeholder="Gross Pay"
                    name="grossFlcPay"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    label="Risk Prem Recov"
                    className="formtext"
                    id="riskPremRecov"
                    value={riskPremRecov}
                    placeholder="Risk Prem Recov"
                    name="riskPremRecov"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    label="Medical Fee"
                    className="formtext"
                    id="medicalFee"
                    value={medicalFee}
                    placeholder="Medical Fee"
                    name="medicalFee"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    label="Stam Duty"
                    className="formtext"
                    id="stamDuty"
                    value={stamDuty}
                    placeholder="Stam Duty"
                    name="stamDuty"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    label="Total Recov"
                    className="formtext"
                    id="totalRecov"
                    value={totalRecov}
                    placeholder="Total Recov"
                    name="totalRecov"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    label="Net Pay"
                    className="formtext"
                    id="netFlcPay"
                    value={netFlcPay}
                    placeholder="Net Pay"
                    name="netFlcPay"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
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
                        id="effDate"
                        value={effDate}
                        placeholder="Effective Date"
                        name="effDate"
                        onChange={(e) => onChangeEffDate(e)}
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
                        label="Approval Date"
                        id="flcApprovalDate"
                        value={flcApprovalDate}
                        placeholder="Approval Date"
                        name="flcApprovalDate"
                        onChange={(e) => onChangeAppDate(e)}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                        maxDate={moment().toDate()}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Medical Category"
                    className="formtext"
                    id="medicalCategory"
                    value={medicalCategory}
                    placeholder="Medical Category"
                    name="medicalCategory"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {medicalTestData.map((val, index) => (
                      <MenuItem value={val.shortDescription}>
                        {val.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Medical Center"
                    className="formtext"
                    id="medicalCenter"
                    value={medicalCenter}
                    placeholder="Medical Center"
                    name="medicalCenter"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {medicalCenterData.map((val, index) => (
                      <MenuItem value={val.shortDescription}>
                        {val.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Medical Tpa Code"
                    className="formtext"
                    id="medicatTpaCode"
                    value={medicatTpaCode}
                    placeholder="Medical Tpa Code"
                    name="medicatTpaCode"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {medicalTpaData.map((val, index) => (
                      <MenuItem value={val.shortDescription}>
                        {val.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
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
                <Grid item xs={8} md={6} lg={4}>
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

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Interim Status"
                    className="formtext"
                    id="interimStatus"
                    value={interimStatus}
                    placeholder="Interim Status"
                    name="interimStatus"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {InterimStatusData.map((val, index) => (
                      <MenuItem value={val.shortDescription}>
                        {val.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
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
