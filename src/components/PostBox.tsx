import React, {createContext, useEffect, useState} from 'react'
import {Container, TextField, Box, Button, Typography} from '@mui/material'


const PostBox = () => {
  const [post, setPost] = useState('');
  const [alert, setAlert] = useState(false)

  useEffect(()=> {
    setTimeout(()=>{
      setAlert(false)
    },3000)
  },[alert])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const body = {
      post
    }


    // maybe use usemutation here
    fetch('/api/post', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({post})
    })
    .then(data=>data.json())
    .then((data) => {
      if (data) {
        setPost('')
        return setAlert(true)
      }
    })
    .catch(err=>console.log(err))
  }


  return (
    <Box id="post-box" component="form" onSubmit={(e) => handleSubmit(e)}>
      <TextField
        id="post-input"
        required
        placeholder={`Today's Goal`}
        value={post}
        onChange={e => setPost(e.currentTarget.value)}
      />
      <Button variant="contained" type='submit' sx={{m:1}} >POST</Button>
      <br/>
      {alert && <Typography>Successful Post!</Typography>}
    </Box>
  )
}

export default PostBox