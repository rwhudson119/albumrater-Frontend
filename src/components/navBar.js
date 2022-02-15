import { useState, useEffect } from "react";
import React from "react";
import axios from "../services/backendApi.js";
import { Link } from 'react-router-dom';
import logo from '../album_logo.png';

const profile = localStorage.profile


function NavBar() {
    return (
        <div className="App">
            <nav className="nav-bar">
                
                <h1 className = "nav-logo"><a href={`/homepage/${profile}`}><img src={logo} className="nav-logo-2" alt="logo" /></a></h1>
                <ul class="nav-links">
                    <li><a href={`/homepage/${profile}`}>Home</a></li>
                    <li><a href={`/homepage/${profile}`}>Profile</a></li>
                    <li><a href={`/homepage/${profile}`}>Data</a></li>
                </ul>
            </nav>
        </div>
    )
}


export default NavBar;