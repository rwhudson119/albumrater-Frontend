import { useState, useEffect } from "react";
import React from "react";
import axios from "../services/backendApi.js";
import { Link, useParams  } from 'react-router-dom';
import { DeezerCredentials } from '../deezerCred'
const headers = {
    "Access-Control-Allow-Origins": "*"
}


const NewAlbum = (props) => {

    const deezer = DeezerCredentials();
    let params = useParams()

    const [results, setResults] = useState([]);


    const GetAlbum = () => {
        axios.get(`https://api.deezer.com/search/album/?q=album:"${params.album}"`).then(res => {
            setResults(res.data.data)
            console.log(res.data.data[0]);
        }
    )}

    useEffect(() => {
        GetAlbum();
        
    }, []);

    return (
    <div className="App">
        <header className="App-header">
            <h2>{params.album}</h2>
            {results.map((item, key) => (
                <>
                    <p> {item.title} {item.artist.name}</p> 

                    <a href={`/addalbum/${item.id}`}><img src= {item.cover}/> </a>
                </>
            ))}
        </header>
    </div>
    )
}


export default NewAlbum;