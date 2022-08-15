import { useState, useEffect } from "react";
import React from "react";
import axios from "../services/backendApi.js";
import GenreData from './genreData';
import { Credentials } from './Credentials'


const Genres = (props) => {

    const spotify = Credentials();

    const data = [
        {value: 1, name: 'A'},
        {value: 2, name: 'B'},
        {value: 3, name: 'C'},
    ]

    const [genres, setGenres] = useState([]);

    useEffect(() => {
        axios('https://accounts.spotify,con/api/token', {
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : ' Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)
              },
              data: 'grant_type=client_credentials',
              method: 'POST'
        })
        .then(tokenResponse => {
            console.log(tokenResponse.data.access_token);
            
            axios('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
                method: 'GET',
                headers: { 'Authorization' : ' Bearer ' + tokenResponse.data.access_token}
            })
            console.log('Authorization : Bearer ' + tokenResponse.data.access_token)
            .then (genreResponse => {
                setGenres(genreResponse.data.categories.items);
            });

        });
    }, []);

    return (
        <form onSubmit={() => {}}>
            <div className="container">
                <GenreData options={genres} />
                <GenreData options={data} />
                <button type='submit'>
                    Search
                </button>
                <p>dropdown page</p>
            </div>
        </form>
    )
}


export default Genres;