import { useState, useEffect } from "react";
import React from "react";
import axios from "../services/backendApi.js";
import { Link } from 'react-router-dom';
import logo from '../album_logo.png';
import { useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';


function Login() {
    const [profiles, setProfiles] = useState([]);
    const [usernameID, setUsernameID] = useState("");
    const [usernameValid, setUsernameValid] = useState(false);

    const navigate  = useNavigate ();



    const onChangeUsername = (e) => {
        const username = e.target.value;
        var found = false
        profiles.map((item, key) => {
            if(username.localeCompare(item.username) === 0){
                setUsernameID(item._id)
                setUsernameValid(true)
                found = true
            }else if(found === false){
                setUsernameValid(false)
            }
        })
    }




    const GetProfiles = () =>{
        axios.get(`/profile/`).then(res => {
        setProfiles(res.data);
        console.log(res.data);
        });
    }
    useEffect(() => {
        GetProfiles();
    }, [])
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <TextField 
                id="standard-basic" 
                sx={{ label: { color: 'white' }}} 
                label="Enter Username" 
                variant="outlined" 
                onChange={onChangeUsername}
                onKeyPress={(ev) => {
                    console.log(`Pressed keyCode ${ev.key}`);
                    if (ev.key === 'Enter') {
                        if(usernameValid) {
                            navigate(`/homepage/${usernameID}`);
                        }
                      ev.preventDefault();
                    }
                  }}
                  />
                {usernameValid && (
                    <>
                        <a className="App-link" href= {`/homepage/${usernameID}`}>Login</a>
                    </>
                )}
                {!usernameValid && (
                    <>
                        <a className="App-link">Login</a>
                    </>
                )}
                <a className="App-link" href= {`/createAccount`}>Create Account</a>
                <h2>Profiles</h2>
                {profiles.map((item, key) => (
                    <a className="App-link" href= {`/homepage/${item._id}`} >{item.username}</a>
                ))}
            </header>
        </div>
    )
}


export default Login;