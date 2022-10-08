import { useState } from "react";
import React from "react";
import logo from '../album_logo.png';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';




var profile = localStorage.profile


function Footer() {
 
    return (
        <div className="App">
            <footer className="footer">
            <a href={`/homepage/${profile}`}>
                <Box className="foot_box">
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs = {4.5}>
                        <Typography gutterBottom>
                            <p className="footer_title"> Album rater</p>
                        </Typography>
                        </Grid><Grid item xs = {3}>
                            <img src={logo} className="footer_logo" alt="logo" />
                        </Grid><Grid item xs = {4.5}>
                        <Typography gutterBottom>
                            <p className="footer_name"> Robert Hudson</p>
                        </Typography>
                            
                        </Grid></Grid></Box>
                </a>
                </footer>
        </div>
    )
}




export default Footer;