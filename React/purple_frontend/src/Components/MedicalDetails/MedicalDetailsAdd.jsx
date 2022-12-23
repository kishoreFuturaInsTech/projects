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

function MedicalDetailsAdd({
  open,
  handleClose,
  data,
  onChange,
  companyData,
  onChangeStartDate,
  onChangeEndDate,
  medicalCategoryData,
  medicalCenterData,
  medicalTpaData,
  handleFormSubmit,
}) {
  let {
    companyId,
    companyName,
    tpaCode,
    prodName,
    medicalCategory,
    medicalCenter,
    mfRate,
    startDate,
    endDate,
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
          <Modal.Title>Medical Details Add</Modal.Title>
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
                    label="Company Name"
                    className="formtext"
                    id="companyName"
                    value={companyName}
                    placeholder="Company Name"
                    name="companyName"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="TPA Code"
                    className="formtext"
                    id="tpaCode"
                    value={tpaCode}
                    placeholder="TPA Code"
                    name="tpaCode"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {medicalTpaData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Product Name"
                    className="formtext"
                    id="prodName"
                    value={prodName}
                    placeholder="Product Name"
                    name="prodName"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
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
                    {medicalCategoryData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
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
                    {medicalCenterData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="MF Rate"
                    className="formtext"
                    id="mfRate"
                    value={mfRate}
                    placeholder="MF Rate"
                    name="mfRate"
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
                        inputFormat="yyyy/MM/dd"
                        label="Start Date:"
                        id="occDate"
                        value={startDate}
                        placeholder="Start Date:"
                        name="startDate"
                        onChange={(e) => onChangeStartDate(e)}
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
                        inputFormat="yyyy/MM/dd"
                        label="End Date:"
                        id="endDate"
                        value={endDate}
                        placeholder="End Date:"
                        name="endDate"
                        onChange={(e) => onChangeEndDate(e)}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                        maxDate={moment().toDate()}
                      />
                    </LocalizationProvider>
                  </FormControl>
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

export default MedicalDetailsAdd;
