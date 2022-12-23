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

export default function CompanyAdd({ open, handleClose, data, companyData }) {
  console.log("Data", data);
  let {
    companyId,
    flcPolicyNo,
    flcTransNo,
    flcReqDate,
    flcLogDate,
    flcPremRefund,
    flcPolicyDop,
    penalIntrest,
    uinNumber,
    flcTotalPrem,
    grossFlcPay,
    medicalFee,
    stamDuty,
    riskPremRecov,
    mortChargeRefund,
    fundValue,
    effDate,
    totalRecov,
    netFlcPay,
    flcApprovalDate,
    medicalCategory,
    medicalCenter,
    medicatTpaCode,
    makerFlag,
    checkerFlag,
    interimStatus,
    purpleApprovalFlag,
    purpleApprovalRemark,
    purpleApprovalDate,
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
          <Modal.Title>Transaction Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form autoComplete="off">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="company Id"
                    className="formtext"
                    id="companyId"
                    value={companyId}
                    placeholder="company Id"
                    name="companyId"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Policy No"
                    className="formtext"
                    id="flcPolicyNo"
                    value={data.flcPolicyNo}
                    placeholder="Policy No"
                    name="flcPolicyNo"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Trans No"
                    className="formtext"
                    id="flcTransNo"
                    value={flcTransNo}
                    placeholder="Trans No"
                    name="flcTransNo"
                    inputProps={{ readOnly: true }}
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
                        label="Req Date"
                        id="flcReqDate"
                        value={moment(flcReqDate).format("YYYY-MM-DD")}
                        placeholder="Req Date"
                        name="flcReqDate"
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
                        label="Log Date"
                        id="flcLogDate"
                        value={moment(flcLogDate).format("YYYY-MM-DD")}
                        placeholder="Log Date"
                        name="flcLogDate"
                        readOnly
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    disabled
                    label="UIN Number"
                    className="formtext"
                    id="uinNumber"
                    value={uinNumber}
                    placeholder="UIN Number"
                    name="uinNumber"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                {data?.uinNumber?.includes("N") ? (
                  <Grid item xs={8} md={6} lg={4}>
                    <TextField
                      type="number"
                      label="Prem Refund"
                      className="formtext"
                      id="flcPremRefund"
                      value={flcPremRefund}
                      placeholder="Prem Refund"
                      name="flcPremRefund"
                      inputProps={{ readOnly: true }}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                    />
                  </Grid>
                ) : null}

                {data?.uinNumber?.includes("L") ? (
                  <>
                    <Grid item xs={8} md={6} lg={4}>
                      <TextField
                        type="number"
                        label="Total Premium"
                        className="formtext"
                        id="flcTotalPrem"
                        value={flcTotalPrem}
                        placeholder="Total Premium"
                        name="flcTotalPrem"
                        inputProps={{ readOnly: true }}
                        fullWidth
                        variant="outlined"
                        margin="dense"
                      />
                    </Grid>
                  </>
                ) : null}

                {data?.uinNumber?.includes("L") ? (
                  <>
                    <Grid item xs={8} md={6} lg={4}>
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
                  </>
                ) : null}

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    label="Policy Dep"
                    className="formtext"
                    id="flcPolicyDop"
                    value={flcPolicyDop}
                    placeholder="Policy Dep"
                    name="flcPolicyDop"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                {data?.uinNumber?.includes("L") ? (
                  <Grid item xs={8} md={6} lg={4}>
                    <TextField
                      type="number"
                      label="Mort Charge Refund"
                      className="formtext"
                      id="mortChargeRefund"
                      value={mortChargeRefund}
                      placeholder="Mort Charge Refund"
                      name="mortChargeRefund"
                      inputProps={{ readOnly: true }}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                    />
                  </Grid>
                ) : null}

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    label="Penal Interest"
                    className="formtext"
                    id="penalIntrest"
                    value={penalIntrest}
                    placeholder="Penal Interest"
                    name="penalIntrest"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                {data?.uinNumber?.includes("N") ? (
                  <Grid item xs={8} md={6} lg={4}>
                    <TextField
                      type="number"
                      label="Risk Prem Recov"
                      className="formtext"
                      id="riskPremRecov"
                      value={riskPremRecov}
                      placeholder="Risk Prem Recov"
                      name="riskPremRecov"
                      inputProps={{ readOnly: true }}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                    />
                  </Grid>
                ) : null}

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    label="Gross Payable "
                    className="formtext"
                    id="grossFlcPay"
                    value={grossFlcPay}
                    placeholder="Gross Payable"
                    name="grossFlcPay"
                    inputProps={{ readOnly: true }}
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
                    inputProps={{ readOnly: true }}
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
                    inputProps={{ readOnly: true }}
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
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    label="Net Payable"
                    className="formtext"
                    id="netFlcPay"
                    value={netFlcPay}
                    placeholder="Net Payable"
                    name="netFlcPay"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                {data?.uinNumber?.includes("L") ? (
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
                          value={moment(effDate).format("YYYY-MM-DD")}
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
                ) : null}

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
                        value={moment(flcApprovalDate).format("YYYY-MM-DD")}
                        placeholder="Approval Date"
                        name="flcApprovalDate"
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                        readOnly
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Medical Category"
                    className="formtext"
                    id="medicalCategory"
                    value={medicalCategory}
                    placeholder="Medical Category"
                    name="medicalCategory"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Medical Center"
                    className="formtext"
                    id="medicalCenter"
                    value={medicalCenter}
                    placeholder="Medical Center"
                    name="medicalCenter"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Medical Tpa Code"
                    className="formtext"
                    id="medicatTpaCode"
                    value={medicatTpaCode}
                    placeholder="Medical Tpa Code"
                    name="medicatTpaCode"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
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
                <Grid item xs={8} md={6} lg={4}>
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

                <Grid item xs={8} md={6} lg={4}>
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
                  ></TextField>
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
