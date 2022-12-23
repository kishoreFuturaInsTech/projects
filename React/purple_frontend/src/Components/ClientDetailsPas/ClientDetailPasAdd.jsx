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
import "../Css/ContentAdd.css";
// import validator from "validator";

function ClientDetailPasAdd({
  open,
  handleClose,
  emailError,
  data,
  clientNumError,
  companyData,
  genderData,
  nationalityData,
  residentStatusData,
  onChange,
  onChangeLaDob,
  handleFormSubmit,
}) {
  let {
    companyId,
    clntNum,
    laName,
    laDob,
    nationality,
    residentStatus,
    gender,
    contactNum,
    emailId,
  } = data;

  const [isError, setisError] = useState(false);

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
          <Modal.Title>Client Detail PAS</Modal.Title>
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
                  ></TextField>
                  <p style={{ marginLeft: "0.5rem", color: "red" }}>
                    {clientNumError}
                  </p>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Client Name"
                    className="formtext"
                    id="laName"
                    value={laName}
                    placeholder="Client Name"
                    name="laName"
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
                        label="Client Date Of Birth:"
                        id="laDob"
                        value={laDob}
                        placeholder="Client Date Of Birth:"
                        name="laDob"
                        onChange={(e) => onChangeLaDob(e)}
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
                    label="Nationality"
                    className="formtext"
                    id="nationality"
                    value={nationality}
                    placeholder="Nationality"
                    name="nationality"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {nationalityData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Resident Status"
                    className="formtext"
                    id="residentStatus"
                    value={residentStatus}
                    placeholder="Resident Status"
                    name="residentStatus"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {residentStatusData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.shortDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Gender"
                    className="formtext"
                    id="gender"
                    value={gender}
                    placeholder="Gender"
                    name="gender"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {genderData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="tel"
                    error={isError}
                    label="Contact Number"
                    className="formtext"
                    id="contactNum"
                    value={contactNum}
                    placeholder="Contact Number"
                    name="contactNum"
                    onChange={(e) => {
                      if (e.target.value.length > 10) {
                        setisError(true);
                        <p>Enter a Valid Mobile No</p>;
                      } else {
                        onChange(e);
                        setisError(false);
                      }
                    }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="email"
                    label="Email ID"
                    className="formtext"
                    id="emailId"
                    value={emailId}
                    placeholder="Email ID"
                    name="emailId"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                  <p style={{ marginLeft: "0.5rem", color: "red" }}>
                    {emailError}
                  </p>
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

export default ClientDetailPasAdd;
