import React, {useState, useRef} from 'react';
import {createPortal} from 'react-dom'
import {TextField, Container, Box, Grid, Button, Typography} from '@mui/material';
import { styled } from '@mui/material/styles';
import { JsxElement } from 'typescript';


interface Props {
  setOpenSignup: React.Dispatch<React.SetStateAction<boolean>>;
}
  





const Signup = ({setOpenSignup} : Props) => { 
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const passRef = useRef<HTMLInputElement>(null);
  const verifyRef = useRef<HTMLInputElement>(null);

  const handleSignup = () => {
    if(password !== verifyPassword) {
      verifyRef.current?.focus();
      console.log('asdf');
      return;
    }
  }



  return(
    createPortal(
      <Container component="main" id="modal">
        <Box component="form"
          id="signup-form" 
          onSubmit={(event) => event.preventDefault()}
        >
          <Grid container id="signup-container"
            sx={{'& .MuiTextField-root': { m: 1, width: '30ch', backgroundColor: 'white'}}}
          >
            <Grid item>
              <TextField 
                type="text" 
                required
                value={username}
                onChange={e => setUsername(e.currentTarget.value)}
                label="Username" 
                placeholder="Username"/>
            </Grid>
            <Grid item>
              <TextField 
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
                inputRef={passRef}
                required
                value={password}
                onChange={e => setPassword(e.currentTarget.value)}
                placeholder="Password"/>
            </Grid>
            <Grid 
              item
            >
              <TextField 
                type="password" 
                required
                inputRef={verifyRef}
                value={verifyPassword}
                onChange={e => setVerifyPassword(e.currentTarget.value)}
                label="Verify Password"
                placeholder="Verify Password"/>
            </Grid>
            <Grid sx={{'& .MuiButton-root': { marginLeft: "10px", marginRight: "10px"}}}>
              <Button 
                onClick={() => setOpenSignup(false)}
                variant="outlined" >Cancel</Button>
              <Button 
                type="submit" 
                onClick={handleSignup}
                variant="contained"  >Signup</Button>
            </Grid>
          </Grid>
        </Box>
    </Container>, 
      document.body
    )
  )
    
};

export default Signup;