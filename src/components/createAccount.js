import { useState } from "react";
import React from "react";
import axios from "../services/backendApi.js";
import NavBar from './navBar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Foot from './footer';






const CreateAccount = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate  = useNavigate ();

    
    const onChangeUsername = (event) => {
        setUsername(event.target.value);
    };
    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.post("/profile/add",
            {username: username, password: password} ).then((res) => {
            console.log(res)
            navigate(`/`);
        });
}


    return (
        <div className="App">
            <NavBar />
            <header className="App-header">
                <h2>Create Account</h2>
                <h2>Set Username</h2>
                <TextField id="standard-basic" sx={{ label: { color: 'white' }}} label="Enter Username" variant="outlined" onChange={onChangeUsername}/>
                <h2>Set Password</h2>
                <TextField id="standard-basic" sx={{ label: { color: 'white' }}} label="Enter Public Password" variant="outlined" onChange={onChangePassword}/>
                <Button variant="Contained" onClick = {handleUpdate}>Create Profile</Button>
            </header>
            <Foot />
        </div>
    )
}


export default CreateAccount;