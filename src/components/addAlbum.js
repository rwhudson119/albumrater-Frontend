import { useState, useEffect } from "react";
import React from "react";
import axios from "../services/backendApi.js";
import { Link, useParams  } from 'react-router-dom';
const headers = {
    "Access-Control-Allow-Origins": "*"
}


const AddAlbum = (props) => {

    let params = useParams()

    const [results, setResults] = useState([]);
    const URL = `https://api.deezer.com/album/${params.albumId}`


    const GetAlbum = () => {
        axios.get(URL).then(res => {
            setResults(res.data)
        }
    )}

    useEffect(() => {
        GetAlbum();
        
    }, []);

    //need a async thing so that once everything loads then it displays

    return (
    <div className="App">
        <header className="App-header">
            <img src= {results.cover}/>
            <p> {results.title}</p>
        </header>
    </div>
    )
}


export default AddAlbum