import React, { useState, useEffect } from "react";
import axios from "../services/backendApi.js";
import { useParams } from 'react-router-dom';


const AddAlbum = (props) => {

    let params = useParams()

    const [results, setResults] = useState(null);
    
    useEffect(() => {
        const URL = `https://api.deezer.com/album/${params.albumId}`

        const GetAlbum = async () => {

            const res = await axios({
                method: 'get',
                url: URL,
                headers: {
                  'Access-Control-Allow-Origin': '*',
                },
            });
            setResults(res.data)
            console.log(res.data)
            console.log("hi1")
        };
        GetAlbum();
    }, []);


    if (results == null){
        console.log("Returning null");
        return null;
    }
    if (results instanceof Error) {
        console.error(results);
        return (
                    <div>
                        <h1>Error.</h1>
                    </div>
                );
    }

    return (
    <div className="App">
        <header className="App-header">
            <img src= {results.cover}/>
            <p> {results.title}</p>
            <p> {results.release_date}</p>
            <p> {results.genres.data[0].name}</p>
        </header>
    </div>
    )
}

export default AddAlbum