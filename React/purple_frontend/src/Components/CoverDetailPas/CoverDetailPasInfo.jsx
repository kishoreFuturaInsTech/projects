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

function CoverDetailPasInfo({ open, handleClose, data }) {
  let {
    companyId,
    clntNum,
    chdrNum,
    cntType,
    crTable,
    uinNumber,
    riskComDate,
    docDate,
    sumAssured,
    riskCessTerm,
    premCessTerm,
    coverPremium,
    coverStatus,
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
          <Modal.Title>Cover Detail PAS Info</Modal.Title>
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
                    value={companyId}
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
                    id="clntNum"
                    value={clntNum}
                    placeholder="Client Number"
                    name="clntNum"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Policy No"
                    className="formtext"
                    id="chdrNum"
                    value={chdrNum}
                    placeholder="Policy No"
                    name="chdrNum"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Plan Name"
                    className="formtext"
                    id="cntType"
                    value={cntType}
                    placeholder="Plan Name"
                    name="cntType"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Cover Code"
                    className="formtext"
                    id="crTable"
                    value={crTable}
                    placeholder="Cover Code"
                    name="crTable"
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
                    value={uinNumber}
                    placeholder="UIN Number"
                    name="uinNumber"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Risk Com Date:"
                    id="riskComDate"
                    value={moment(riskComDate).format("DD/MM/YYYY")}
                    placeholder="Risk Com Date:"
                    name="riskComDate"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Date Of Commencement Date:"
                    id="docDate"
                    value={moment(docDate).format("DD/MM/YYYY")}
                    placeholder="Date Of Commencement Date:"
                    name="docDate"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Sum Assured"
                    className="formtext"
                    id="sumAssured"
                    value={sumAssured}
                    placeholder="Sum Assured"
                    name="sumAssured"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Risk Cess Term"
                    className="formtext"
                    id="riskCessTerm"
                    value={riskCessTerm}
                    placeholder="Risk Cess Term"
                    name="riskCessTerm"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Prem Cess Term"
                    className="formtext"
                    id="premCessTerm"
                    value={premCessTerm}
                    placeholder="Prem Cess Term"
                    name="premCessTerm"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Cover Premium"
                    className="formtext"
                    id="coverPremium"
                    value={coverPremium}
                    placeholder="Cover Premium"
                    name="coverPremium"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Cover Status"
                    className="formtext"
                    id="coverStatus"
                    value={coverStatus}
                    placeholder="Cover Status"
                    name="coverStatus"
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

export default CoverDetailPasInfo;
