import React from "react";
import { Box } from "@mui/material";
import { Link, Routes, Route, redirect } from "react-router-dom";
import Feed from "./Feed";
import Profile from "./Profile";

const handleLogout = (e: React.FormEvent) => {
  fetch("/api/user/logout")
    .then((data) => console.log("logged user out"))
    .catch((err) => console.log(err));
};

const Navbar = () => {
  return (
    <>
      <Box id="navbar">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/home/profile">Profile</Link>
        </li>
        <li id="logout">
          <Link to="/" onClick={(e) => handleLogout(e)}>
            Logout
          </Link>
        </li>
      </Box>
      {/* <Routes>
        <Route path="/feed" element={<Feed/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes> */}
    </>
  );
};

export default Navbar;
