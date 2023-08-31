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

    const [results, setResults] = useState([]);


    const GetAlbum = () => {
        axios.get(`/deezer/${params.album}`).then(res => {
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