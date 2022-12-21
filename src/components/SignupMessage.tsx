import React, {useState, useRef, useEffect} from 'react';
import {createPortal} from 'react-dom'
import {TextField, Container, Box, Grid, Button, Typography} from '@mui/material';


interface Props {
  setOpenSuccessfulSignup: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignupMessage = ({setOpenSuccessfulSignup} : Props) => { 



  return(
    createPortal(
      <Container component="main" id="modal">
        <Box id="signup-confirm">
          <Typography>Account created. Please login!</Typography>
          <Button variant='outlined' 
            size="medium" 
            onClick={() => setOpenSuccessfulSignup(false)}>Close</Button>
        </Box>
      </Container>, 
      document.body
    )
  )
    
};

export default SignupMessage;