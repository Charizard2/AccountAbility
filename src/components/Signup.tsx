import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  TextField,
  Container,
  Box,
  Grid,
  Button,
  Typography,
} from "@mui/material";

interface Props {
  setOpenSignup: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSuccessfulSignup: React.Dispatch<React.SetStateAction<boolean>>;
}

const Signup = ({ setOpenSignup, setOpenSuccessfulSignup }: Props) => {
  // const [username, setUsername] = useState('');
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [password, setPassword] = useState('');
  // const [verifyPassword, setVerifyPassword] = useState('');
  // const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [validSignup, setValidSignup] = useState(true);
  const verifyRef = useRef<HTMLInputElement>(null); //this useRef is to pinpoint inproper HTML node
  const [values, setValues] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    validSignup: true,
    showPassword: false,
  }); // we could convert values to useRef instead?
  const { username, firstName, lastName, password, confirmPassword } = values;

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if(password !== verifyPassword) {
    if (values.password !== values.confirmPassword) {
      verifyRef.current?.focus();
      return;
    }

    // const signupBody = {
    //   username,
    //   firstName,
    //   lastName,
    //   password,
    // };

    fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      // body: JSON.stringify(signupBody)
      body: JSON.stringify({ username, firstName, lastName, password }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.err) {
          setValidSignup(false);
          return;
        }
        setOpenSignup(false);
        setOpenSuccessfulSignup(true);
      })
      .catch((err) => {
        console.log("signup error", err);
      });
  };

  return createPortal(
    <Container component="main" id="modal">
      <Box
        component="form"
        id="signup-form"
        onSubmit={(event) => handleSignup(event)}
      >
        <Grid
          container
          id="signup-container"
          sx={{
            "& .MuiTextField-root": {
              m: 1,
              width: "30ch",
              backgroundColor: "white",
            },
          }}
        >
          <Grid item>
            <TextField
              data-testid="username"
              type="text"
              required
              value={username}
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
              // onChange={e => setUsername(e.currentTarget.value)}
              label="Username"
              placeholder="Username"
            />
          </Grid>
          <Grid item>
            <TextField
              data-testid="first-name"
              type="text"
              required
              value={firstName}
              onChange={(e) =>
                setValues({ ...values, firstName: e.target.value })
              }
              label="First name"
              placeholder="First name"
            />
          </Grid>
          <Grid item>
            <TextField
              type="text"
              required
              value={lastName}
              data-testid="last-name"
              onChange={(e) =>
                setValues({ ...values, lastName: e.target.value })
              }
              label="Last name"
              placeholder="Last name"
            />
          </Grid>
          <Grid item>
            <TextField
              type="password"
              label="Password"
              data-testid="password"
              required
              value={password}
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              placeholder="Password"
            />
          </Grid>
          <Grid item>
            <div>
              <TextField
                data-testid="verify-password"
                type="password"
                required
                inputRef={verifyRef}
                value={confirmPassword}
                onChange={(e) =>
                  setValues({ ...values, confirmPassword: e.target.value })
                }
                label="Verify Password"
                error={password !== confirmPassword && !!confirmPassword}
                helperText={
                  password !== confirmPassword &&
                  !!confirmPassword &&
                  "Passwords do not match"
                }
                placeholder="Verify Password"
              />
            </div>
          </Grid>
          <Grid
            sx={{
              "& .MuiButton-root": { marginLeft: "10px", marginRight: "10px" },
            }}
          >
            <Button onClick={() => setOpenSignup(false)} variant="outlined">
              Cancel
            </Button>
            <Button
              type="submit"
              data-testid="secondary-signup"
              variant="contained"
            >
              Signup
            </Button>
          </Grid>
        </Grid>
        {!validSignup && (
          <Typography align="center" sx={{ m: 1 }}>
            Username taken please choose another
          </Typography>
        )}
      </Box>
    </Container>,
    document.body
  );
};

export default Signup;
