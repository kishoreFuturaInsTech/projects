import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { TextField, FormControl, Grid, Box, Autocomplete } from "@mui/material";
import { MenuItem } from "@material-ui/core";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DraggableComponent from "../Service/DraggableComponent";
import moment from "moment";
import "../Css/ContentAdd.css";

function PolicyDetailsPasAdd({
  open,
  handleClose,
  data,
  policyNoError,
  clientdata,
  companyData,
  billFrequencyData,
  statusCodeData,
  medicalFlagData,
  smokerFlagData,
  onChange,
  onChangePremToDate,
  onChangedocDate,
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                  <p style={{ marginLeft: "0.5rem", color: "red" }}>
                    {policyNoError}
                  </p>
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
                        {val.longDescription}-{val.shortDescription}
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
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
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
                        label="DOC Date:"
                        id="docDate"
                        value={docDate}
                        placeholder="DOC Date:"
                        name="docDate"
                        onChange={(e) => onChangedocDate(e)}
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
                        label="Prem To Date:"
                        id="premToDate"
                        value={premToDate}
                        placeholder="Prem To Date:"
                        name="premToDate"
                        onChange={(e) => onChangePremToDate(e)}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                        // maxDate={moment().toDate()}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Life Assured Age"
                    className="formtext"
                    id="anbAtCcd"
                    value={anbAtCcd}
                    placeholder="Life Assured Age"
                    name="anbAtCcd"
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Policy Status "
                    className="formtext"
                    id="statCode"
                    value={statCode}
                    placeholder="Policy Status "
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

export default PolicyDetailsPasAdd;
