import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { TextField, FormControl, Grid, Box } from "@mui/material";
import { MenuItem } from "@material-ui/core";
import DraggableComponent from "../Service/DraggableComponent";
import "../Css/ContentEdit.css";
import moment from "moment";


 function MedicalDetailsInfo({ open, handleClose, data, handleFormSubmit}) {

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
        <Modal.Title>Medical Details Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form autoComplete="off">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={8} md={6} lg={4}>
                <TextField
                  label="Company Code"
                  className="formtext"
                  id="companyId"
                  value={companyId}
                  placeholder="Company Id"
                  name="companyId"
                  inputProps={{ readOnly: true }}
                  fullWidth
                  variant="outlined"
                  margin="dense"
                />
              </Grid>
              <Grid item xs={8} md={6} lg={4}>
                <TextField
                  label="Company Name"
                  className="formtext"
                  id="companyName"
                  value={companyName}
                  placeholder="Company Name"
                  name="companyName"
                  inputProps={{ readOnly: true }}
                  fullWidth
                  variant="outlined"
                  margin="dense"
                />
              </Grid>
              <Grid item xs={8} md={6} lg={4}>
                <TextField
                  label="TPA code"
                  className="formtext"
                  id="tpaCode"
                  value={tpaCode}
                  placeholder="TPA Code"
                  name="tpaCode"
                  inputProps={{ readOnly: true }}
                  fullWidth
                  variant="outlined"
                  margin="dense"
                />
              </Grid>

              <Grid item xs={8} md={6} lg={4}>
                <TextField
                  label="Product Name"
                  className="formtext"
                  id="prodName"
                  value={prodName}
                  placeholder="Product Name"
                  name="prodName"
                  inputProps={{ readOnly: true }}
                  fullWidth
                  variant="outlined"
                  margin="dense"
                />
              </Grid>
              <Grid item xs={8} md={6} lg={4}>
                <TextField
                  label="Medical Category"
                  className="formtext"
                  id="medicalCategory"
                  value={medicalCategory}
                  placeholder="Medical Category"
                  name="medicalCategory"
                  inputProps={{ readOnly: true }}
                  fullWidth
                  variant="outlined"
                  margin="dense"
                >
                </TextField>
              </Grid>
              <Grid item xs={8} md={6} lg={4}>
                <TextField
                  label="Medical Center"
                  className="formtext"
                  id="medicalCenter"
                  value={medicalCenter}
                  placeholder="Medical Center"
                  name="medicalCenter"
                  inputProps={{ readOnly: true }}
                  fullWidth
                  variant="outlined"
                  margin="dense"
                >
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
                  inputProps={{ readOnly: true }}
                  fullWidth
                  variant="outlined"
                  margin="dense"
                />
              </Grid>
              <Grid item xs={8} md={6} lg={4}>
                <TextField
                  label="Start Date"
                  className="formtext"
                  id="startDate"
                  value={moment(startDate).format("DD-MM-YYYY")}
                  placeholder="Start Date"
                  name="startDate"
                  inputProps={{ readOnly: true }}
                  fullWidth
                  variant="outlined"
                  margin="dense"
                />
              </Grid>
             
              <Grid item xs={8} md={6} lg={4}>
                <TextField
                  label="End Date"
                  className="formtext"
                  id="endDate"
                  value={moment(endDate).format("DD-MM-YYYY")}
                  placeholder="End Date"
                  name="endDate"
                  inputProps={{ readOnly: true }}
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
        {/* <Button variant="primary" onClick={() => handleFormSubmit()}>
          {"Submit"}
        </Button> */}
      </Modal.Footer>
    </Modal>
  </div>
  )
}

export default MedicalDetailsInfo;