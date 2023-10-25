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
    const [averageRating, setAverageRating] = useState("");

    
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

    const GetScoresSafely = (album) => {
        var currentScore = 0
        var currentVars = 0
        if(album.originality){
            currentScore = currentScore + album.originality 
            currentVars ++
        }if(album.flow){
            currentScore = currentScore + album.flow 
            currentVars ++
        }if(album.lyrics){
            currentScore = currentScore + album.lyrics
            currentVars ++
        }if(album.how_captivating){
            currentScore = currentScore + album.how_captivating
            currentVars ++
        }if(album.timelessness){
            currentScore = currentScore + album.timelessness
            currentVars ++
        }if(album.delivery){
            currentScore = currentScore + album.delivery
            currentVars ++
        }if(album.music){
            currentScore = currentScore + album.music
            currentVars ++
        }
        console.log(currentScore + "   V  " + currentVars + "  queue? " + album.in_queue)
        if(currentVars === 0){
            return -1
        }
        return (currentScore/currentVars).toFixed(2)
    }

    const ComputeRatings = (resAlbums) => {
        var totalRatings = 0;
        var averageRatingTemp = 0;
        resAlbums.map((item, key) => {
            if(item.in_queue !== "yes"){
                totalRatings = totalRatings + item.ratings.length
                var gss = 0;
                gss = GetScoresSafely(item)
                if(gss === -1){
                    gss = 0;
                }
                console.log("GSS")
                console.log(gss + "  " + averageRatingTemp)
                averageRatingTemp =  Number(gss) + Number(averageRatingTemp)
            }
            
            //averageRatingTemp = averageRatingTemp + (item.originality + item.flow + item.lyrics + item.how_captivating + item.timelessness)/5
            return 0
        })
        averageRatingTemp = averageRatingTemp/resAlbums.length
        setRatings(totalRatings); 
        setAverageRating(averageRatingTemp.toFixed(2))
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
                <p>Average Total Rating: {averageRating}</p>
                <p>Number of Albums: {albums.length}</p>
                <p>Number of Songs: {songs.length}</p>
                <p>Number of Ratings: {ratings}</p>
            </header>
            <Foot />
        </div>
    )
}


export default ProfileDetails;