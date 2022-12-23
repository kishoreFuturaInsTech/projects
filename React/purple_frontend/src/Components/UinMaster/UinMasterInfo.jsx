import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { TextField, FormControl, Grid, Box } from "@mui/material";
import { MenuItem } from "@material-ui/core";
import DraggableComponent from "../Service/DraggableComponent";
import "../Css/ContentEdit.css";
import moment from "moment";

function UinMasterInfo({ open, data, handleClose }) {
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
          <Modal.Title>UIN Master</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form autoComplete="off">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Company Id"
                    className="formtext"
                    id="companyId"
                    value={data.companyId}
                    placeholder="Company Id"
                    name="companyId"
                    inputProps={{ readOnly: true }}
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
                    placeholder="uinNumber"
                    name="uinNumber"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Plan Name"
                    className="formtext"
                    id="planName"
                    value={data.planName}
                    placeholder="Plan Name"
                    name="planName"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Plan Code"
                    className="formtext"
                    id="planCode"
                    value={data.planCode}
                    placeholder="plan Code"
                    name="planCode"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Product Type"
                    className="formtext"
                    id="productType"
                    value={data.productType}
                    placeholder="Product Type"
                    name="productType"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="GSV Eligibility"
                    className="formtext"
                    id="gsvFactor"
                    value={data.gsvFactor}
                    placeholder="GSV Eligibility"
                    name="gsvFactor"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="GSV Cash Value"
                    className="formtext"
                    id="gsvCashValue"
                    value={data.gsvCashValue}
                    placeholder="GSV Cash Value"
                    name="gsvCashValue"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="SSV Eligibility"
                    className="formtext"
                    id="ssvFactor"
                    value={data.ssvFactor}
                    placeholder="SSV Eligibility"
                    name="ssvFactor"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    inputFormat="dd/MM/yyyy"
                    label="Start Date"
                    className="formtext"
                    id="startDate"
                    value={moment(data.startDate).format("DD-MM-YYYY")}
                    placeholder="Start Date"
                    name="startDate"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    inputFormat="dd/MM/yyyy"
                    label="End Date"
                    className="formtext"
                    id="endDate"
                    value={moment(data.endDate).format("DD-MM-YYYY")}
                    placeholder="End Date"
                    name="endDate"
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

export default UinMasterInfo;
