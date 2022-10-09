import { useState, useEffect } from "react";
import React from "react";
import axios from "../services/backendApi.js";
import NavBar from './navBar';
import Foot from './footer';




const ProfileDetails = () => {

    const profileId = localStorage.profile
    console.log(profileId)

    const [profile, setProfile] = useState("");
    const [albums, setAlbums] = useState("");
    const [ratings, setRatings] = useState("");
    const [songs, setSongs] = useState("");

    
    const GetProfiles = () =>{
        axios.get(`/profile/${profileId}`).then(res => {
        setProfile(res.data);
        console.log(res.data);
        });
    }
    const GetAlbums = () =>{
        axios.get(`/album/${profileId}`).then(res => {
            setAlbums(res.data);
            ComputeRatings(res.data);
            console.log(ratings)
        });
    }
    const GetSongs = () =>{
        axios.get(`/song/profile/${profileId}`).then(res => {
            setSongs(res.data);
        });
    }

    const ComputeRatings = (resAlbums) => {
        var totalRatings = 0;
        resAlbums.map((item, key) => {
            totalRatings = totalRatings + item.ratings.length
            return 0
        })
        setRatings(totalRatings); 
    }

    useEffect(() => {
        GetProfiles();
        GetAlbums();
        GetSongs();
        
    }, [])
    return (
        <div className="App">
            <NavBar />
            <header className="App-header">
                <h2>Profile Details</h2>
                <p>{profile.username}</p>
                <p>Number of Albums: {albums.length}</p>
                <p>Number of Songs: {songs.length}</p>
                <p>Number of Ratings: {ratings}</p>
            </header>
            <Foot />
        </div>
    )
}


export default ProfileDetails;