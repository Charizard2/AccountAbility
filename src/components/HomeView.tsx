import React from 'react'
import {Box, Container} from '@mui/material'
import Feed from './Feed';
import {Link, Routes, Route} from 'react-router-dom'
import Navbar from './Navbar'
import PostBox from './PostBox';
import SearchBox from './SearchBox'

const HomeView = () => {


  // if we are on homescreen 

  return (
    <Box id="home-container">
      <Navbar/>
      <Box id="views">
        <PostBox/>
        <Feed/>
      </Box>
      <Box id="search-box">
        <SearchBox/>
      </Box>
    </Box>
      
  )
}

export default HomeView