import { useState } from 'react'
import {Box} from '@mui/material';

import {Routes, Route, Link} from 'react-router-dom';
import Login from './Login';
import HomeView from './HomeView'

function App() {

  return (
    
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/home/*" element={<HomeView/>}/>
    </Routes>
  )
}

export default App
