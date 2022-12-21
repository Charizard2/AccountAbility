import React from 'react'
import {Container, TextField, Box, Button, Typography} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import {IconButton, Tooltip} from '@mui/material';
import {InputAdornment} from '@mui/material';


const SearchBox = () => {
  return (
    <Box id="search-input" onSubmit={(e) => e.preventDefault()} marginTop="30px">
      <TextField
        sx={{width: "35ch", backgroundColor: "white"}}
        required
        placeholder={`This doesn't actually work yet`}
        InputProps={{
          startAdornment: (
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignContent:'center', backgroundColor:'white',height:52,width:50,marginLeft:-13,border:'0px solid green',marginRight:0}}>
              <InputAdornment position="start">
                <SearchIcon style={{marginLeft:10}} />
              </InputAdornment>
            </div>
          )
        }}
      />
    </Box>
  )
}

export default SearchBox