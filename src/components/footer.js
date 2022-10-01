import { useState } from "react";
import React from "react";
import logo from '../album_logo.png';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';



var profile = localStorage.profile


function Footer() {
 
    return (
        <div className="App">
            <footer className="footer">
                <a href={`/homepage/${profile}`}><img src={logo} className="footer_logo" alt="logo" /></a>
                <p>Album Rater - Robert Hudson</p>
            </footer>
        </div>
    )
}




export default Footer;