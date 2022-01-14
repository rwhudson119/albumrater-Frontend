import { useState, useEffect } from "react";
import React from "react";
import axios from "../services/backendApi.js";
import { Link } from 'react-router-dom';
import logo from '../album_logo10.png';


function Login() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <a
                className="App-link"
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                >
                Login
                </a>
            </header>
        </div>
    )
}


export default Login;