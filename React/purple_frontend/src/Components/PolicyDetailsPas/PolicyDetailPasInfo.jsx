import React from "react";
import TextField from "@mui/material/TextField";
import { Box, FormControl, Grid } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import DraggableComponent from "../Service/DraggableComponent";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

function PolicyDetailPasInfo({ open, handleClose, data }) {
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
          <Modal.Title>Policy Detail PAS </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form autoComplete="off">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Company"
                    className="formtext"
                    id="companyId"
                    value={data.companyId}
                    placeholder="Company"
                    inputProps={{ readOnly: true }}
                    name="companyId"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Client Number"
                    className="formtext"
                    id="clntNum"
                    value={data.clntNum}
                    placeholder="Client Num"
                    inputProps={{ readOnly: true }}
                    name="clntNum"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Policy Number"
                    className="formtext"
                    id="chdrNum"
                    value={data.chdrNum}
                    placeholder="Policy Num"
                    inputProps={{ readOnly: true }}
                    name="chdrNum"
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
                    value={data.uinNumber}
                    placeholder="UIN Number"
                    inputProps={{ readOnly: true }}
                    name="uinNumber"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Bill Frequency"
                    className="formtext"
                    id="billFreq"
                    value={data.billFreq}
                    placeholder="Bill Frequency"
                    inputProps={{ readOnly: true }}
                    name="billFreq"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Installment premium"
                    className="formtext"
                    id="installmentPremium"
                    value={data.installmentPremium}
                    placeholder="Installment premium"
                    inputProps={{ readOnly: true }}
                    name="installmentPremium"
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
                    value={moment(data.premToDate).format("DD/MM/YYYY")}
                    placeholder="Prem To Date:"
                    inputProps={{ readOnly: true }}
                    name="premToDate"
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
                    value={moment(data.docDate).format("DD/MM/YYYY")}
                    placeholder="DOC Date:"
                    name="docDate"
                    inputProps={{ readOnly: true }}
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
                        value={moment(data.premToDate).format("YYYY-MM-DD")}
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
                    value={data.anbAtCcd}
                    placeholder="Life Assured Age"
                    inputProps={{ readOnly: true }}
                    name="anbAtCcd"
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
                    value={data.clntDob}
                    placeholder="Policy Holder Age"
                    name="clntDob"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Status Code"
                    className="formtext"
                    id="statCode"
                    value={data.statCode}
                    placeholder="Status Code"
                    inputProps={{ readOnly: true }}
                    name="statCode"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Medical Flag"
                    className="formtext"
                    id="medicalFlag"
                    value={data.medicalFlag}
                    placeholder="Medical Flag"
                    inputProps={{ readOnly: true }}
                    name="medicalFlag"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Smoker Flag"
                    className="formtext"
                    id="smokerFlag"
                    value={data.smokerFlag}
                    placeholder="Smoker Flag"
                    inputProps={{ readOnly: true }}
                    name="smokerFlag"
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
            Back
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PolicyDetailPasInfo;
