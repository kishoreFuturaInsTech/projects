import React from "react";
import TextField from "@mui/material/TextField";
import { Box, FormControl, Grid } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import DraggableComponent from "../Service/DraggableComponent";

function SurrenderClientDetailsInfo({ open, handleClose, data }) {
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
          <Modal.Title>Surrender Client Detail Info</Modal.Title>
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
                    name="companyId"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Client Number"
                    className="formtext"
                    id="clientNumber"
                    value={data.clntNum}
                    placeholder="Client Number"
                    name="clientNumber"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Client Name"
                    className="formtext"
                    id="laName"
                    value={data.laName}
                    placeholder="Client Name"
                    name="laName"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Client Date Of Birth:"
                    className="formtext"
                    id="laDob"
                    value={moment(data.laDob).format("DD/MM/YYYY")}
                    placeholder="Client Date Of Birth:"
                    name="laDob"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Nationality"
                    className="formtext"
                    id="nationality"
                    value={data.nationality}
                    placeholder="Nationality"
                    name="nationality"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Resident Status"
                    className="formtext"
                    id="residentStatus"
                    value={data.residentStatus}
                    placeholder="Resident Status"
                    name="residentStatus"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Gender"
                    className="formtext"
                    id="gender"
                    value={data.gender}
                    placeholder="Gender"
                    name="gender"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Contact Number"
                    className="formtext"
                    id="contactNumber"
                    value={data.contactNumber}
                    placeholder="Contact Number"
                    name="contactNumber"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Email ID"
                    className="formtext"
                    id="emailId"
                    value={data.emailId}
                    placeholder="Email ID"
                    name="emailId"
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
            Back
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SurrenderClientDetailsInfo;
