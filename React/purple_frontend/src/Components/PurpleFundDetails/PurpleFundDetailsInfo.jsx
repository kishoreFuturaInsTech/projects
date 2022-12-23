import React from "react";
import TextField from "@mui/material/TextField";
import { Box, FormControl, Grid } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import DraggableComponent from "../Service/DraggableComponent";

function PurpleFundDetailsInfo({ open, handleClose, data }) {
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
          <Modal.Title>Mortality Flag Master Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form autoComplete="off">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="CompanyId"
                    className="formtext"
                    id="companyId"
                    value={data.companyId}
                    placeholder="CompanyId"
                    name="companyId"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Policy No"
                    className="formtext"
                    id="policyNo"
                    value={data.policyNo}
                    placeholder="Policy No"
                    name="policyNo"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Fund Code"
                    className="formtext"
                    id="purpleFundCode"
                    value={data.purpleFundCode}
                    placeholder="Fund Code"
                    name="purpleFundCode"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Fund Name"
                    className="formtext"
                    id="purpleFundName"
                    value={data.purpleFundName}
                    placeholder="Fund Name"
                    name="purpleFundName"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Units"
                    className="formtext"
                    id="purpleUnits"
                    value={data.purpleUnits}
                    placeholder="Units"
                    name="purpleUnits"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Rate App"
                    className="formtext"
                    id="purpleRateApp"
                    value={data.purpleRateApp}
                    placeholder="Rate App"
                    name="purpleRateApp"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Fund Value"
                    className="formtext"
                    id="purpleFundValue"
                    value={data.purpleFundValue}
                    placeholder=" Fund Value"
                    name="purpleFundValue"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Remark"
                    className="formtext"
                    id="remark"
                    value={data.remark}
                    placeholder="Remark"
                    name="remark"
                    onChange={(e) => onChange(e)}
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
          <Button variant="primary" onClick={() => handleFormSubmit()}>
            {"Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PurpleFundDetailsInfo;
