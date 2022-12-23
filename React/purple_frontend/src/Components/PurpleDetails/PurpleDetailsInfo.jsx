import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { TextField, FormControl, Grid, Box } from "@mui/material";
import { MenuItem } from "@material-ui/core";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DraggableComponent from "../Service/DraggableComponent";

import "../Css/ContentEdit.css";
import moment from "moment";

function PurpleDetailsInfo({ open, handleClose, data, handleFormSubmit }) {
  let {
    company,
    compId,
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
          <Modal.Title>IPCA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form autoComplete="off">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {/* <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Company"
                    className="formtext"
                    id="company"
                    value={company?.companyName}
                    placeholder="Company"
                    name="company"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid> */}
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Transaction Date"
                    className="formtext"
                    id="trandata"
                    value={moment(trandata).format("DD/MM/yyyy")}
                    placeholder="Transaction Date"
                    name="trandata"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Policy No."
                    className="formtext"
                    id="policyNo"
                    value={policyNo}
                    placeholder="Policy No."
                    name="policyNo"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Transaction No."
                    className="formtext"
                    id="tranNo"
                    value={tranNo}
                    placeholder="Transaction No."
                    name="tranNo"
                    inputProps={{ readOnly: true }}
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
                    inputProps={{ readOnly: true }}
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
                    inputProps={{ readOnly: true }}
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
                    inputProps={{ readOnly: true }}
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
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Stamp Duty +GST"
                    className="formtext"
                    id="stampDuty"
                    value={stampDuty}
                    placeholder="Stamp Duty +GST"
                    name="stampDuty"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Mortality Charges +GST"
                    className="formtext"
                    id="mortCharge"
                    value={mortCharge}
                    placeholder="Mortality Charges +GST"
                    name="mortCharge"
                    inputProps={{ readOnly: true }}
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
                    inputProps={{ readOnly: true }}
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
                    inputProps={{ readOnly: true }}
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
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Purple Pass or Fail"
                    className="formtext"
                    id="pfFlag"
                    value={pfFlag}
                    placeholder="Purple Pass or Fail"
                    name="pfFlag"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Purple Remarks"
                    className="formtext"
                    id="pfRemarks"
                    value={pfRemarks}
                    placeholder="Purple Remarks"
                    name="pfRemarks"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                {/* <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="QC User Approval"
                    className="formtext"
                    id="approvFlag"
                    value={approvFlag}
                    placeholder="QC User Approval"
                    name="approvFlag"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Approval Remarks"
                    className="formtext"
                    id="approvRemarks"
                    value={approvRemarks}
                    placeholder="Approval Remarks"
                    name="approvRemarks"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Approval Date"
                    className="formtext"
                    id="approvDate"
                    value={moment(approvDate).format("DD/MM/yyyy")}
                    placeholder="Approval Date"
                    name="approvDate"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Pass/Fail update in PAS"
                    className="formtext"
                    id="pfFlagUpdate"
                    value={pfFlagUpdate}
                    placeholder="Pass/Fail update in PAS"
                    name="pfFlagUpdate"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid> */}
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

export default PurpleDetailsInfo;
