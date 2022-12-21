import React from 'react'
import {Box} from '@mui/material'
import {Link, Routes, Route} from 'react-router-dom'
import Feed from './Feed'
import Profile from './Profile'

const Navbar = () => {
  return (
    <>
      <Box id="navbar">
        <li>
          <Link to='/home/feed'>
                Home
          </Link>
        </li>
        <li>
          <Link 
            to='/home/profile'>
                Profile
          </Link>
        </li>
        <li id="logout">
          <Link to='/'>
                Logout
          </Link>
        </li>
      </Box>
      {/* <Routes>
        <Route path="/feed" element={<Feed/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes> */}
    </>
  )
}

export default Navbar