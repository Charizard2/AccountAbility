import React, {useState} from 'react'
import {Container, TextField, Box, Button, Typography} from '@mui/material'
import Signup from './Signup'
import SignupMessage from './SignupMessage'
import {useNavigate} from 'react-router-dom'


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openSignup, setOpenSignup] = useState(false);
  const [valid, setValid] = useState(true);
  const [openSuccessfulSignup, setOpenSuccessfulSignup] = useState(false);
  const [incorrectCreds, setIncorrectCreds] = useState(false);
  const navigate = useNavigate();


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
    
    // fetch('/api/user/login', {
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application-json'
    //   },
    //   body: JSON.stringify(loginCredentials),
    // }).then(() => {
        navigate('/home/feed');        
    // })





  }

  return (
    <>
    <Container sx={{
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      width:"100%",
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
          <Typography>LOGIN</Typography>
          <TextField 
            label="Username"
            placeholder="Username"
            data-testid="username-login"
            value={username} 
            onChange={e => setUsername(e.target.value)}/>
          <TextField 
            type="password" 
            placeholder="Password"
            data-testid="password-login"
            value={password} 
            onChange={e => setPassword(e.target.value)} label="Password" />
            <div>
              <Button variant="outlined" data-testid="initial-signup"onClick={() => setOpenSignup(true)} size="medium" type="submit">
                Signup
              </Button>
              <Button variant="contained" data-testid="login-button" size="medium" onClick={handleLogin} type="submit">
                Login
              </Button>
            </div>
            {!valid && <p>Please enter your username and password.</p>}
            {incorrectCreds && <p>Incorrect username or password!</p>}
            
        </Box>
    </Container>
    {openSignup && <Signup setOpenSignup={setOpenSignup} setOpenSuccessfulSignup={setOpenSuccessfulSignup}/>}
    {openSuccessfulSignup && <SignupMessage setOpenSuccessfulSignup={setOpenSuccessfulSignup}/>}
    </>
  )
}

export default Login