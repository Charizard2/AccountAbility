import React, {useState} from 'react'
import {Container, TextField, Box, Button, Typography} from '@mui/material'


const PostBox = () => {
  const [post, setPost] = useState('');

  const handleSubmit = () => {
    const body = {
      post
    }


    // maybe use usemutation here
    fetch('/post', {
      method: 'POST',
      headers: {
        'content-type': 'application-json'
      },
      body: JSON.stringify(body)
    }).then(() => {
      setPost('');
    })
  }


  return (
    <Box id="post-box" component="form" onSubmit={(e) => e.preventDefault()}>
      <TextField
        id="post-input"
        required
        placeholder={`Today's Goal`}
        value={post}
        onChange={e => setPost(e.currentTarget.value)}
      />
      <Button variant="contained" onClick={handleSubmit}>POST</Button>
    </Box>
  )
}

export default PostBox