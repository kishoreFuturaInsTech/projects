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

function PolicyDetailsPasEdit({
  open,
  handleClose,
  data,
  companyData,
  clientdata,
  billFrequencyData,
  statusCodeData,
  medicalFlagData,
  smokerFlagData,
  editChangePremToDate,
  editChangeAnbAtCcd,
  editChangeClntDob,
  onChange,
  handleFormSubmit,
}) {
  let {
    companyId,
    clntNum,
    chdrNum,
    uinNumber,
    billFreq,
    installmentPremium,
    premToDate,
    docDate,
    anbAtCcd,
    clntDob,
    statCode,
    medicalFlag,
    smokerFlag,
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
          <Modal.Title>Policy Detail PAS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                    label="Policy Num"
                    className="formtext"
                    id="chdrNum"
                    value={chdrNum}
                    placeholder="Policy Num"
                    name="chdrNum"
                    disabled
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
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
                    select
                    label="Bill Frequency"
                    className="formtext"
                    id="billFreq"
                    value={billFreq}
                    placeholder="Bill Frequency"
                    name="billFreq"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {billFrequencyData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.shortDescription}-{val.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Installment premium"
                    className="formtext"
                    id="installmentPremium"
                    value={installmentPremium}
                    placeholder="Installment premium"
                    name="installmentPremium"
                    disabled
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Prem To Date:"
                    className="formtext"
                    id="premToDate"
                    value={moment(premToDate).format("DD/MM/YYYY")}
                    placeholder="Prem To Date:"
                    name="premToDate"
                    disabled
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="DOC Date:"
                    className="formtext"
                    id="docDate"
                    value={moment(docDate).format("DD/MM/YYYY")}
                    placeholder="DOC Date:"
                    name="docDate"
                    disabled
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                {/* <Grid item xs={8} md={6} lg={4}>
                  <FormControl
                    style={{ marginTop: "0.5rem" }}
                    className="formtext"
                    fullWidth
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputFormat="dd/MM/yyyy"
                        label="Prem To Date:"
                        id="premToDate"
                        value={moment(premToDate).format("YYYY-MM-DD")}
                        placeholder="Prem To Date:"
                        name="premToDate"
                        onChange={(e) => editChangePremToDate(e)}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid> */}

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Life Assured Age"
                    className="formtext"
                    id="anbAtCcd"
                    value={anbAtCcd}
                    placeholder="Life Assured Age"
                    name="anbAtCcd"
                    disabled
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Policy Holder Age"
                    className="formtext"
                    id="clntDob"
                    value={clntDob}
                    placeholder="Policy Holder Age"
                    name="clntDob"
                    disabled
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Status Code"
                    className="formtext"
                    id="statCode"
                    value={statCode}
                    placeholder="Status Code"
                    name="statCode"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {statusCodeData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Medical Flag"
                    className="formtext"
                    id="medicalFlag"
                    value={medicalFlag}
                    placeholder="Medical Flag"
                    name="medicalFlag"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {medicalFlagData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Smoker Flag"
                    className="formtext"
                    id="smokerFlag"
                    value={smokerFlag}
                    placeholder="Smoker Flag"
                    name="smokerFlag"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {smokerFlagData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.shortDescription}
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

export default PolicyDetailsPasEdit;
