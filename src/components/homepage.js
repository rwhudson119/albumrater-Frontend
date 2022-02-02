import { useState, useEffect } from "react";
import React from "react";
import axios from "../services/backendApi.js";
import { Link, useParams  } from 'react-router-dom';
import logo from '../album_logo.png';
import TextField from '@mui/material/TextField';



const HomePage = (props) => {
    const [albums, setAlbums] = useState([]);
    const [album, setAlbum] = useState("");
    const [search, setSearch] = useState("");
    const [albumData, setAlbumData] = useState([]);
    const [sortType, setSortType] = useState('');
    const [sortTypeType, setSortTypeType] = useState('');




    //get access to the URL
    let params = useParams()
    var profile = params.profile
    localStorage.profile = profile


    const onChangeSearch = (e) => {
        const search = e.target.value;
        setSearch(search)
    }

    const types = {
        title: 'title',
        artist: 'artist',
        flow: 'flow',
        lyrics: 'lyrics',
        how_captivating: 'how_captivating',
        originality: 'originality',
        timelessness: 'timelessness',
    };

    const GetAlbums = () =>{
        axios.get(`/album/${params.profile}`).then(res => {
        setAlbums(res.data);
        setAlbum(res.data[0]);
        setSortType('title')
        setSortTypeType(types[sortType])
        console.log(res.data);
        });
    }

    useEffect(() => {
        GetAlbums();
    }, [])


    useEffect(() => {
        const sortArray = type => {
            const types = {
                title: 'title',
                artist: 'artist',
                flow: 'flow',
                lyrics: 'lyrics',
                how_captivating: 'how_captivating',
                originality: 'originality',
                timelessness: 'timelessness',
            };
            const sortProperty = types[type];
            const sorted = [...albums].sort((a, b) => {
                if(sortProperty === 'title'){
                    return a.title.localeCompare(b.title);
                }
                else if(sortProperty === 'artist') {
                    return a.artist.localeCompare(b.artist);
                }else {
                    return b[sortProperty] - a[sortProperty];
                }
            });
            console.log(sorted);
            setAlbumData(sorted);
          };

          sortArray(sortType);

    }, [sortType]) 

    return (
        <div className="App">
            <header className="App-header">
                <h1>
                Welcome
                </h1>
                <h2>Albums</h2>
                <select onChange={(e) => setSortType(e.target.value)}>
                    <option value="title">Title</option>
                    <option value="artist">Artist</option>
                    <option value="flow">Flow</option>
                    <option value="lyrics">Lyrics</option>
                    <option value="how_captivating">How Captivating</option>
                    <option value="originality">Originality</option>
                    <option value="timelessness">Timelessness</option>


    
                </select> 
                {albumData.map((item, key) => (
                    <div className="album_display">
                        <a href={`/albumdetails/${item._id}`}>
                            <img src= {item.cover_photo}/>
                            <p>{item.title}</p>
                            <p>{item.artist}</p>
                            <div className="scores">
                            <p>Flow: {item.flow} Lyrics: {item.lyrics}</p>
                            <p>How Captivating: {item.how_captivating}   Originality: {item.originality}</p>
                            <p>Timelessness: {item.timelessness}</p>
                            </div>
                        </a>
                    </div>
                ))}
                <TextField id="standard-basic" label="Search Album" variant="outlined" onChange={onChangeSearch}/>
                <a className="App-link" href={`/newalbum/${search}`} >Search</a>

            </header>
        </div>
    )
}


export default HomePage;