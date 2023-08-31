import { useState, useEffect } from "react";
import React from "react";
import axios from "../services/backendApi.js";
import logo from '../album_logo_crop.png';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Foot from './footer';


function Login() {
    const [profiles, setProfiles] = useState([]);
    const [usernameID, setUsernameID] = useState("");
    const [usernameValid, setUsernameValid] = useState(false);
    const [forgotUsername, setForgotUsername] = useState(false);

    const navigate  = useNavigate ();

    function toggleFU() {
        setForgotUsername(forgotUsername => !forgotUsername);
    }

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
            return 0;
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
                <div className="userLogin">
                    {usernameValid && (
                        <div className="badUser">
                            <Button variant="outlined"  onClick={() => { navigate(`/homepage/${usernameID}`)}} >Login</Button>
                        </div>
                    )}
                    {!usernameValid && (
                        <>
                            <Button variant="outlined" color="error">Login</Button>
                        </>
                    )}
                </div>
                <div className="login_text">
                <a className="App-link" href= {`/createAccount`}>Create Account</a>
                <p onClick={toggleFU} >Forgot Username?</p>
                {forgotUsername && (
                    <p>Ask Robbie :p </p>
                )}
                </div>
                {/*}
                <h2>Profiles</h2>
                {profiles.map((item, key) => (
                    <a className="App-link" href= {`/homepage/${item._id}`} >{item.username}</a>
                ))} */}
            </header>
            <Foot />
        </div>
    )
}


export default Login;