import { useState, useEffect } from "react";
import React from "react";
import axios from "../services/backendApi.js";
import { Link, useParams  } from 'react-router-dom';
import { DeezerCredentials } from '../deezerCred'
const headers = {
    "Access-Control-Allow-Origins": "*"
}


const TestPage = (props) => {

    const deezer = DeezerCredentials();


    const [results, setResults] = useState([]);


    const GetAlbum = () => {
        axios.get(`https://api.deezer.com/search?q=artist:"eminem" track:"rap god"`).then(res => {
            setResults(res.data.data)
            console.log(res.data.data[0]);

    })}

    useEffect(() => {
        GetAlbum();
        
    }, []);

    return (
    <div className="App">
        <header className="App-header">
            <p>Search: Eminem rap god</p>
            {results.map((item, key) => (
                <>
                    <p> {item.title} {item.artist.name} {item.album.title}</p> 
                    <img src= {item.album.cover}/> 
                </>
            ))}
        </header>
    </div>
    )
}


export default TestPage;