import { useState, useEffect } from "react";
import React from "react";
import axios from "../services/backendApi.js";
import NavBar from './navBar';




const ProfileDetails = () => {

    const profileId = localStorage.profile

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
        });
    }
    const GetRatings = () =>{
        axios.get(`/rating`).then(res => {
            setRatings(res.data);
        });
    }
    const GetSongs = () =>{
        axios.get(`/song/profile/${profileId}`).then(res => {
            setSongs(res.data);
        });
    }
    useEffect(() => {
        GetProfiles();
        GetAlbums();
        GetRatings();
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
                <p>Number of Ratings: {ratings.length}</p>
            </header>
        </div>
    )
}


export default ProfileDetails;