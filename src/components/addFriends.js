import { useState, useEffect } from "react";
import React from "react";
import axios from "../services/backendApi.js";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Foot from './footer';
import NavBar from './navBar';
import Grid from '@mui/material/Grid';
import AddBoxIcon from '@mui/icons-material/AddBox';


const profile = localStorage.profile


function AddFriends() {
    const [profiles, setProfiles] = useState([]);

    const GetProfiles = () =>{
        axios.get(`/profile/`).then(res => {
            var profilesTemp = res.data
            profilesTemp.sort(function (a, b) {
                if (a.username < b.username) {
                    return -1;
                }
                if (b.username < a.username) {
                    return 1;
                }
                return 0;
            });
            var profilesSliced = []
            var myProfile
            profilesTemp.map((item) => {
                if (item.id === profile){
                    myProfile = item
                    console.log("MY Prof")
                }else{
                    profilesSliced.push(item)
                }
            })
            setProfiles(profilesSliced);
        });
    }

    document.getElementById('specialp').onclick = function()
    {
        addFriend();
    };

    const addFriend = (id) =>{
        /*
        var friends = id
        
        axios.post(`/profile/update/${profile}`, 
            {friends: friends} );*/
            console.log({id})
    }



    useEffect(() => {
        GetProfiles();
    }, [])
    return (
        <div className="App">
            <NavBar />
            <header className="App-header">
                <p>Add Friends: </p>
                {profiles.map((item, key) => (
                <div key={key}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs>
                            <p>{item.username}</p>
                        </Grid><Grid item xs>
                        <div onClick={addFriend(item._id)}><p><AddBoxIcon /></p> </div>
                        </Grid></Grid>
                </div>
            ))}
            </header>
            <Foot />
        </div>
    )
}


export default AddFriends;