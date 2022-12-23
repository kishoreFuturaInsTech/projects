import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { Grid, Paper, TextField, Button, Link, Box } from "@mui/material";
const paperStyle = {
  padding: 20,
  height: "auto",
  width: "50%",
  margin: "20px auto",
};
import axios from "axios";
import Verification from "./Verification";
import { Navigate } from "react-router-dom";
``;

function ForgotPassword() {
  const [email, setemail] = useState("");
  const [verifyOtp, setverifyOtp] = useState("");
  const [password, setpassword] = useState("");
  const [password1, setpassword1] = useState("");
  const [otp, setotp] = useState("");

  const [openOtp, setopenOtp] = useState(false);
  const [verified, setverified] = useState(false);
  const [passwordCheck, setpasswordCheck] = useState(false);

  const verification = () => {
    if (otp === verifyOtp) {
      setverified(true);
      setpasswordCheck(false);
    } else {
      return <p>Otp Mismatch</p>;
    }
  };

  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    password: "",
    confirmPassword: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(name, value);
    validateInput(e);
    setpasswordCheck(true);
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  const getOtp = () => {
    setopenOtp(true);
    axios
      .patch(`http://localhost:8080/api/auth/user/reset/${email}`)
      .then((res) => {
        setotp(res.data);
      })
      .catch((err) => console.log(err));
  };

  const changePassword = () => {
    axios
      .patch(`http://localhost:8080/api/auth/user/resetPassword/${verifyOtp}`, {
        password: input.password,
      })
      .then((res) => {
        //   Navigate("/")
        window.location = "/ui";
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Paper elevation={10} style={paperStyle}>
        <form>
          <div style={{ display: "flex" }}>
            <TextField
              label="Email"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => setemail(e.target.value)}
              fullWidth
              required
            />
            <Button
              style={{ marginLeft: "1rem" }}
              size="small"
              color="primary"
              variant="contained"
              onClick={getOtp}
            >
              <SendIcon />
            </Button>
          </div>
          <br />

          {openOtp ? (
            <div style={{ display: "flex" }}>
              <TextField
                label="Otp"
                value={verifyOtp}
                placeholder="Enter Otp"
                onChange={(e) => setverifyOtp(e.target.value)}
                fullWidth
                required
              />

              <Button
                style={{ marginLeft: "1rem" }}
                color="primary"
                variant="contained"
                onClick={() => verification()}
              >
                <VerifiedUserIcon />
              </Button>
            </div>
          ) : null}

          <br />
          {verified ? (
            <div>
              <TextField
                label="Password"
                name="password"
                onBlur={validateInput}
                value={input.password}
                type="password"
                placeholder="Enter Password"
                onChange={onInputChange}
                fullWidth
                required
              />

              {error.password && (
                <span style={{ color: "red" }}>{error.password}</span>
              )}
              <br />
              <br />
              <TextField
                label="Confirm Password"
                onBlur={validateInput}
                value={input.confirmPassword}
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                onChange={onInputChange}
                fullWidth
                required
              />

              {error.confirmPassword && (
                <span style={{ color: "red" }}>{error.confirmPassword}</span>
              )}

              <br />
              <br />

              {input.password === input.confirmPassword ? (
                <Button
                  disabled={!input.password || !input.confirmPassword}
                  color="primary"
                  variant="contained"
                  onClick={() => changePassword()}
                >
                  Reset
                </Button>
              ) : (
                <Button
                  disabled
                  color="primary"
                  variant="contained"
                  onClick={() => changePassword()}
                >
                  Reset
                </Button>
              )}
            </div>
          ) : null}
        </form>
      </Paper>
    </div>
  );
}

export default ForgotPassword;
