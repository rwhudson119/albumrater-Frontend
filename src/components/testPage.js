import { useState, useEffect } from "react";
import React from "react";
import axios from "../services/backendApi.js";
import { Link, useParams  } from 'react-router-dom';
import { DeezerCredentials } from '../deezerCred'


const Genres = (props) => {

    const deezer = DeezerCredentials();

    const data = [
        {value: 1, name: 'A'},
        {value: 2, name: 'B'},
        {value: 3, name: 'C'},
    ]

    const [token, setToken] = useState('');
    const [code, setCode] = useState('');
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        axios.post(`https://connect.deezer.com/oauth/auth.php?app_id=${deezer.DeezerId}&redirect_uri=https://albumrater.herokuapp.com/&perms=basic_access,email`)
        .then(res => {
            console.log(res.data.code);
            setCode(res.data.code);
        })
        axios.post(`https://connect.deezer.com/oauth/access_token.php?app_id=${deezer.DeezerId}&secret=${deezer.DeezerSecret}&code=${code}`)

        .then(tokenResponse => {
            console.log("tokennnnnn" + tokenResponse.data.access_token);
            setToken(tokenResponse.data.access_token);

        });
    }, []);

    return (
        <form onSubmit={() => {}}>
            <p>test page</p>
        </form>
    )
}


export default Genres;