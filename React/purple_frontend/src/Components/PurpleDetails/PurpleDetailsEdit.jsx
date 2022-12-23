import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { TextField, FormControl, Grid, Box } from "@mui/material";
import { MenuItem } from "@material-ui/core";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "../Css/ContentEdit.css";
import DraggableComponent from "../Service/DraggableComponent";
import moment from "moment";

function PurpleDetailsEdit({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
  companyData,
  policyData,
  pf,
  yn,
  onChangeTranDate,
  onChangeApprovDate,
}) {
  let {
    compId,
    company,
    trandata,
    policyNo,
    chdr,
    tranNo,
    totlPremium,
    avalSuspense,
    penalInterest,
    medicalFee,
    stampDuty,
    mortCharge,
    grossPayable,
    recoveries,
    netPayable,
    pfFlag,
    pfRemarks,
    approvFlag,
    approvRemarks,
    approvDate,
    pfFlagUpdate,
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
          <Modal.Title>Insurance Payment Checking Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form autoComplete="off">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {/* <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Company"
                    className="formtext"
                    id="compId"
                    value={compId}
                    placeholder="Company"
                    name="compId"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {companyData?.map((val) => (
                      <MenuItem key={val.id} value={val.id}>
                        {val?.id}-{val?.companyName}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid> */}
                {/* <Grid item xs={8} md={6} lg={4}>
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
                <Grid item xs={8} md={6} lg={4}>
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
                  >
                    {/* {policyData?.map((val) => (
                      <MenuItem key={val.id} value={val.id}>
                        {val?.id}-{val?.chdrNum}
                      </MenuItem>
                    ))} */}
                  </TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Transaction No."
                    className="formtext"
                    id="tranNo"
                    value={tranNo}
                    placeholder="Transaction No."
                    name="tranNo"
                    disabled
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Premium Refund"
                    className="formtext"
                    id="totlPremium"
                    value={totlPremium}
                    placeholder="Premium Refund"
                    name="totlPremium"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Policy Deposit Amount"
                    className="formtext"
                    id="avalSuspense"
                    value={avalSuspense}
                    placeholder="Policy Deposit Amount"
                    name="avalSuspense"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Penal Interest"
                    className="formtext"
                    id="penalInterest"
                    value={penalInterest}
                    placeholder="Penal Interest"
                    name="penalInterest"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
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
                    label="Stamp Duty"
                    className="formtext"
                    id="stampDuty"
                    value={stampDuty}
                    placeholder="Stamp Duty"
                    name="stampDuty"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Mortality Charges"
                    className="formtext"
                    id="mortCharge"
                    value={mortCharge}
                    placeholder="Mortality Charges"
                    name="mortCharge"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Gross Payable"
                    className="formtext"
                    id="grossPayable"
                    value={grossPayable}
                    placeholder="Gross Payable"
                    name="grossPayable"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Recoveries"
                    className="formtext"
                    id="recoveries"
                    value={recoveries}
                    placeholder="Recoveries"
                    name="recoveries"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
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
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Purple Pass or Fail"
                    className="formtext"
                    id="pfFlag"
                    value={pfFlag}
                    placeholder="Purple Pass or Fail"
                    name="pfFlag"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {pf?.map((val) => (
                      <MenuItem value={val.longDescription}>
                        {val?.shortDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
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
                {/* <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="QC User Approval"
                    className="formtext"
                    id="approvFlag"
                    value={approvFlag}
                    placeholder="QC User Approval"
                    name="approvFlag"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {pf?.map((val) => (
                      <MenuItem value={val.longDescription}>
                        {val?.shortDescription}-{val?.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid> */}
                {/* <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Approval Remarks"
                    className="formtext"
                    id="approvRemarks"
                    value={approvRemarks}
                    placeholder="Approval Remarks"
                    name="approvRemarks"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid> */}
                {/* <Grid item xs={8} md={6} lg={4}>
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
                        value={moment(approvDate).format("dd/MM/yyyy")}
                        placeholder="Approval Date:"
                        name="approvDate"
                        onChange={(e) => onChangeApprovDate(e)}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid> */}
                {/* <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Pass/Fail update in PAS"
                    className="formtext"
                    id="pfFlagUpdate"
                    value={pfFlagUpdate}
                    placeholder="Pass/Fail update in PAS"
                    name="pfFlagUpdate"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {pf?.map((val) => (
                      <MenuItem value={val.longDescription}>
                        {val?.shortDescription}-{val?.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid> */}
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

export default PurpleDetailsEdit;
