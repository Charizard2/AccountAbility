import React, {useState} from 'react'
import {Container, TextField, Box, Button} from '@mui/material'
import Signup from './Signup'


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openSignup, setOpenSignup] = useState(false);
  const [valid, setValid] = useState(true);
  const [incorrectCreds, setIncorrectCreds] = useState(true);


  const handleLogin = () => {
    setValid(true);
    setIncorrectCreds(true);
    if(!username || !password) {
      setValid(false);
      return;
    }

    const loginCredentials = {
      username,
      password
    }
    console.log(loginCredentials);

    // fetch('/user', {
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application-json'
    //   },
    //   body: JSON.stringify(loginCredentials),
    // })
  }

  const handleSignup = () => {
    setOpenSignup(!openSignup);
  }

  return (
    <>
    <Container sx={{
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      height:"100%"}}
    >
        <Box
          component="form"
          id="login-form"
          onSubmit={e => e.preventDefault()}
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch', backgroundColor: 'white'},
            '& .MuiButton-root':{m:1},
          }}
        >
          <TextField 
            label="Username"
            placeholder="Username"
            value={username} 
            onChange={e => setUsername(e.target.value)}/>
          <TextField 
            type="password" 
            placeholder="Password"
            value={password} 
            onChange={e => setPassword(e.target.value)} label="Password" />
            <div>
              <Button variant="outlined" onClick={handleSignup} size="medium" type="submit">
                Signup
              </Button>
              <Button variant="contained" size="medium" onClick={handleLogin} type="submit">
                Login
              </Button>
            </div>
            {!valid && <p>Please enter your username and password.</p>}
            
        </Box>
    </Container>
    {openSignup && <Signup setOpenSignup={setOpenSignup}/>}
    </>
  )
}

export default Login