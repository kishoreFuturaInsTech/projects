import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import TestApi from "../Service/TestApi";
import { useNavigate } from "react-router-dom";
import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  TextField,
  Paper,
} from "@mui/material";
import Notification from "../Dialogs/Notification";

const Verification = ({ mail }) => {
  const [user, setuser] = useState("");
  const [code, setcode] = useState("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  let navigate = useNavigate();

  const paperStyle = {
    padding: 20,
    height: "auto",
    width: 500,
    margin: "20px auto",
  };
  // const btnstyle = { margin: "8px 0", marginLeft: "1.5rem" };

  const verify = () => {
    const c = code;
    TestApi.verifyUser(c).then((res) => {
      console.log(res.data);
      setNotify({
        isOpen: true,
        message: "User Registered Successfully",
        type: "success",
      });
      window.location = "/ui";
    });
  };

  return (
    <div>
      <Paper elevation={10} style={paperStyle}>
        <TextField
          label="Enter Verification Code"
          placeholder="Enter Verification Code"
          variant="outlined"
          style={{ marginBottom: "1rem" }}
          onChange={(e) => setcode(e.target.value)}
          margin="dense"
          fullWidth
        />

        <Button
          color="primary"
          variant="contained"
          // style={btnstyle}
          fullWidth
          onClick={() => verify()}
        >
          Click Here To Verify Your Account
        </Button>
      </Paper>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default Verification;
