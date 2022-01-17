import { useState, useEffect } from "react";
import React from "react";
import axios from "../services/backendApi.js";
import { Link } from 'react-router-dom';
import logo from '../album_logo.png';


function Login() {
    const [profiles, setProfiles] = useState([]);
    const [profile, setProfile] = useState("");
    const GetProfiles = () =>{
        axios.get(`/profile/`).then(res => {
        setProfiles(res.data);
        setProfile(res.data[0]);
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
                <h2>Profiles</h2>
                {profiles.map((item, key) => (
                    <a className="App-link" href= {`/homepage/${item._id}`} >{item.username}</a>
                ))}
            </header>
        </div>
    )
}


export default Login;