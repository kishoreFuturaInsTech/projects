import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { TextField, FormControl, Grid, Box } from "@mui/material";
import { MenuItem } from "@material-ui/core";
import "../Css/ContentEdit.css";
import DraggableComponent from "../Service/DraggableComponent";
import moment from "moment";

function PurpleFundDetailsEdit({
  open,
  handleClose,
  data,
  companyData,
  fundCodeData,
  fundNameData,
  chdrData,
  editChangenavDate,
  onChange,
  handleFormSubmit,
}) {
  let {
    companyId,
    policyNo,
    purpleFundCode,
    purpleFundName,
    purpleNavDate,
    purpleUnits,
    purpleRateApp,
    purpleFundValue,
    remark,
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
          <Modal.Title>Mortality Flag Master Edit</Modal.Title>
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
                    value={companyId}
                    disabled
                    placeholder="CompanyId"
                    name="companyId"
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
                    id="policyNo"
                    value={policyNo}
                    disabled
                    placeholder="Policy No"
                    name="policyNo"
                    inputProps={{ readOnly: true }}
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
                    value={purpleFundCode}
                    placeholder="Fund Code"
                    name="purpleFundCode"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {/* {fundCodeData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.shortDescription}
                      </MenuItem>
                    ))} */}
                  </TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Fund Name"
                    className="formtext"
                    id="purpleFundName"
                    value={purpleFundName}
                    placeholder="Fund Name"
                    name="purpleFundName"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {/* {fundNameData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.shortDescription}
                      </MenuItem>
                    ))} */}
                  </TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Nav Date"
                    className="formtext"
                    id="purpleNavDate"
                    value={moment(purpleNavDate).format("DD-MM-YYYY")}
                    placeholder="Nav Date"
                    name="purpleNavDate"
                    inputProps={{ readOnly: true }}
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
                    value={purpleUnits}
                    placeholder="Units"
                    name="purpleUnits"
                    inputProps={{ readOnly: true }}
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
                    value={purpleRateApp}
                    placeholder="Rate App"
                    name="purpleRateApp"
                    inputProps={{ readOnly: true }}
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
                    value={purpleFundValue}
                    placeholder="Fund Value"
                    name="purpleFundValue"
                    inputProps={{ readOnly: true }}
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
                    value={remark}
                    placeholder="Remark"
                    name="remark"
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
          <Button variant="primary" onClick={() => handleFormSubmit()}>
            {"Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PurpleFundDetailsEdit;
