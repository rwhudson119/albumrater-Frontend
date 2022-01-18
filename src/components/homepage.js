import { useState, useEffect } from "react";
import React from "react";
import axios from "../services/backendApi.js";
import { Link, useParams  } from 'react-router-dom';
import logo from '../album_logo.png';


const HomePage = (props) => {
    const [albums, setAlbums] = useState([]);
    const [album, setAlbum] = useState("");
    const [search, setSearch] = useState("");



    //get access to the URL
    let params = useParams()



    const onChangeSearch = (e) => {
        const search = e.target.value;
        setSearch(search)
    }

    const handleSearch = (e) => {
        window.location.href = `/testpage/${search}`
    }



    const GetAlbums = () =>{
        axios.get(`/album/${params.profile}`).then(res => {
        setAlbums(res.data);
        setAlbum(res.data[0]);
        //console.log(res.data);
        });
    }
    useEffect(() => {
        GetAlbums();
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                <h1>
                Welcome
                </h1>
                <h2>Albums</h2>
                {albums.map((item, key) => (
                    <p>{item.title}</p>
                ))}
                <form onSubmit={handleSearch}>
                    <input 
                        type="text" 
                        className="input"
                        placeholder="Enter Album" 
                        name="email" 
                        onChange={onChangeSearch}
                        autoComplete="on"/><br />
                </form>
                <a className="App-link" href={`/testpage/${search}`} >Search</a>

            </header>
        </div>
    )
}


export default HomePage;