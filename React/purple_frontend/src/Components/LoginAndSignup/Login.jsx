import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  Box,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import "../Css/ContentAdd.css";
import { useCounter } from "../Contexts/StoreContext";

const Login = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 500,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0", marginLeft: "1.5rem" };

  const {
    error,
    setError,
    handleSubmit,
    email,
    setEmail,
    password,
    setPassword,
    access,
  } = useCounter();

  return (
    <div>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
          <br />
        </Grid>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <TextField
                className="formtext"
                label="E-Mail"
                value={email}
                placeholder="Enter E-Mail"
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
              />
              <br />
              <TextField
                className="formtext"
                label="Password"
                value={password}
                placeholder="Enter password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={btnstyle}
                fullWidth
              >
                Sign in
              </Button>
            </Grid>

            <br />
            <Grid container spacing={2}>
              <Link href="/ui/forgotPassword">
                <span style={{ marginLeft: "1.5rem" }}>Forgot Passsword ?</span>
              </Link>
              <Link href="/ui/signup">
                <Button
                  style={{
                    color: "white",
                    backgroundColor: "green",
                    marginLeft: 170,
                  }}
                >
                  {" "}
                  Create An Account{" "}
                </Button>
              </Link>

              {error ? (
                <Typography style={{ color: "red" }}>
                  Bad Credentials , Username or Password is wrong
                </Typography>
              ) : null}
            </Grid>
          </Box>
        </form>
      </Paper>
    </div>
  );
};

export default Login;
