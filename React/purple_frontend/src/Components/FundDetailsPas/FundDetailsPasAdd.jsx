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

function FundDetailsPasAdd({
  open,
  data,
  handleClose,
  companyData,
  policyData,
  onChange,
  fundCodeData,
  fundNameData,
  onChangeNavDate,
  handleFormSubmit,
}) {
  let {
    companyId,
    chdrNum,
    fundCode,
    fundName,
    navDate,
    units,
    rateApp,
    value,
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
          <Modal.Title>Fund Details PAS Add</Modal.Title>
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
                    label="Policy No."
                    className="formtext"
                    id="chdrNum"
                    value={chdrNum}
                    placeholder="Policy No."
                    name="chdrNum"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {policyData?.map((val) => (
                      <MenuItem key={val.id} value={val.chdrNum}>
                        {val.chdrNum}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Fund Code"
                    className="formtext"
                    id="fundCode"
                    value={fundCode}
                    placeholder="Fund Code"
                    name="fundCode"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {/* {fundCodeData?.map((val) => (
                      <MenuItem key={val.id} value={val.shortDescription}>
                        {val.shortDescription}
                      </MenuItem>
                    ))} */}
                  </TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Fund Name"
                    className="formtext"
                    id="fundName"
                    value={fundName}
                    placeholder="Fund Name"
                    name="fundName"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {/* {fundNameData?.map((val) => (
                      <MenuItem key={val.id} value={val.longDescription}>
                        {val.longDescription}
                      </MenuItem>
                    ))} */}
                  </TextField>
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
                        label="Nav Date"
                        id="navDate"
                        value={moment(navDate).format("YYYY-MM-DD")}
                        placeholder="Nav Date"
                        name="navDate"
                        onChange={(e) => onChangeNavDate(e)}
                        renderInput={(params) => <TextField {...params} />}
                        maxDate={moment().toDate()}
                        fullWidth
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    label="No. of Units"
                    className="formtext"
                    id="units"
                    value={units}
                    placeholder="No. of Units"
                    name="units"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    label="Rate Applied"
                    className="formtext"
                    id="rateApp"
                    value={rateApp}
                    placeholder="Rate Applied"
                    name="rateApp"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
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

export default FundDetailsPasAdd;
