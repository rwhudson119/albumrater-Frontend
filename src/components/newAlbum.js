import { useState, useEffect } from "react";
import React from "react";
import axios from "../services/backendApi.js";
import { Link, useParams  } from 'react-router-dom';
import NavBar from './navBar';


const headers = {
    "Access-Control-Allow-Origins": "*"
}


const NewAlbum = (props) => {

    let params = useParams()

    const [results, setResults] = useState([]);


    const GetAlbum = () => {
        axios.get(`https://album-rater-backend.herokuapp.com/deezer/${params.album}`).then(res => {
            console.log(res.data.data[0]);
            setResults(res.data.data)
        }
    )}

    useEffect(() => {
        GetAlbum();
        
    }, []);

    return (
    <div className="App">
        <NavBar />
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