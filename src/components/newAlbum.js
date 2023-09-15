import { useState, useEffect } from "react";
import React from "react";
import axios from "../services/backendApi.js";
import { useParams } from 'react-router-dom';
import NavBar from './navBar';
import Foot from './footer';


/*const headers = {
    "Access-Control-Allow-Origins": "*"
}*/


const NewAlbum = (props) => {

    let params = useParams()

    const profile = localStorage.profile

    const [results, setResults] = useState([]);
    const [existingResults, setExistingResults] = useState([]);


    const GetAlbum = () => {
        axios.get(`/deezer/${params.album}`).then(res => {
            console.log(res.data.data[0]);
            setResults(res.data.data)
        }
    )}
    const GetAllExistingAlbs = () => {
        axios.get(`/album/${profile}`).then(res => {
            console.log(res.data);
            var allAlbums = res.data
            
            setExistingResults(allAlbums.filter(obj => {
                console.log(obj.title.toLowerCase() + " contains " + params.album.toLowerCase())
                if(obj.title.toLowerCase().includes(params.album.toLowerCase())){
                    console.log("HORAYYY")
                }
                return obj.title.toLowerCase().includes(params.album.toLowerCase()) || obj.artist.toLowerCase().includes(params.album.toLowerCase())
            }))
        }
    )}

    useEffect(() => {
        GetAllExistingAlbs();
        GetAlbum();
        
        
    }, []);

    return (
    <div className="App">
        <NavBar />
        <header className="App-header">
            <h2>{params.album}</h2>
            <h2>Already Rated</h2>
            <div className="existingResults">
                {existingResults.map((item, key) => (
                    <div key={key}>
                        <p> {item.title} {item.artist}</p> 
                        <a href={`/addalbum/${item.id}`}><img className="alreadyRatedImage" src= {item.cover_photo} alt= ""/> </a>
                    </div>
                ))}
            </div>
            <h2>Add New Album</h2>
            {results.map((item, key) => (
                <div key={key}>
                    <p> {item.title} {item.artist.name}</p> 
                    <a href={`/addalbum/${item.id}`}><img src= {item.cover} alt= ""/> </a>
                </div>
            ))}
        </header>
        <Foot />
    </div>
    )
}


export default NewAlbum;