import React, {useState, useRef, useEffect} from 'react';
import {createPortal} from 'react-dom'
import {TextField, Container, Box, Grid, Button} from '@mui/material';


interface Props {
  setOpenSignup: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSuccessfulSignup: React.Dispatch<React.SetStateAction<boolean>>;

}
  





const Signup = ({setOpenSignup, setOpenSuccessfulSignup} : Props) => { 
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [validSignup, setValidSignup] = useState(true);
  const verifyRef = useRef<HTMLInputElement>(null);

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(password !== verifyPassword) {
      verifyRef.current?.focus();
      return;
    }

    const signupBody = {
      username,
      firstName,
      lastName,
      password,
    };


    fetch('/api/user/signup', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(signupBody)
    }).then(() => {
        setOpenSignup(false);
        setOpenSuccessfulSignup(true);
    })


  }


  return(
    createPortal(
      <Container component="main" id="modal">
        <Box component="form"
          id="signup-form" 
          onSubmit={(event) => handleSignup(event)}
        >
          <Grid container id="signup-container"
            sx={{'& .MuiTextField-root': { m: 1, width: '30ch', backgroundColor: 'white'}}}
          >
            <Grid item>
              <TextField 
                data-testid="username"
                type="text" 
                required
                value={username}
                onChange={e => setUsername(e.currentTarget.value)}
                label="Username" 
                placeholder="Username"/>
            </Grid>
            <Grid item>
              <TextField 
                data-testid="first-name"
                type="text" 
                required
                value={firstName}
                onChange={e => setFirstName(e.currentTarget.value)}
                label="First name" 
                placeholder="First name"/>
            </Grid>
            <Grid item>
              <TextField 
                type="text" 
                required
                value={lastName}
                data-testid="last-name"
                onChange={e => setLastName(e.currentTarget.value)}
                label="Last name" 
                placeholder="Last name"/>
            </Grid>
            <Grid 
              item 
            >
              <TextField
                type="password" 
                label="Password" 
                data-testid="password"
                required
                value={password}
                onChange={e => setPassword(e.currentTarget.value)}
                placeholder="Password"/>
            </Grid>
            <Grid 
              item
            >
              <div>
              <TextField 
                data-testid="verify-password"
                type="password" 
                required
                inputRef={verifyRef}
                value={verifyPassword}
                onChange={e => setVerifyPassword(e.currentTarget.value)}
                label="Verify Password"
                error={(password !== verifyPassword && !!verifyPassword)}
                helperText={(password !== verifyPassword && !!verifyPassword) && "Passwords do not match"}
                placeholder="Verify Password"/>
                </div>
            </Grid>
            <Grid sx={{'& .MuiButton-root': { marginLeft: "10px", marginRight: "10px"}}}>
              <Button 
                onClick={() => setOpenSignup(false)}
                variant="outlined" >Cancel</Button>
              <Button 
                type="submit" 
                // onClick={handleSignup}
                data-testid = "secondary-signup"
                variant="contained"  >Signup</Button>
            </Grid>
          </Grid>
          {!validSignup && <p>Username taken please choose another</p>}
        </Box>
    </Container>, 
      document.body
    )
  )
    
};

export default Signup;