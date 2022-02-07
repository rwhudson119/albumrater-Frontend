import { useState, useEffect } from "react";
import React from "react";
import axios from "../services/backendApi.js";
import { Link, useParams  } from 'react-router-dom';
import logo from '../album_logo.png';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';



const HomePage = (props) => {
    const [albums, setAlbums] = useState([]);
    const [album, setAlbum] = useState("");
    const [search, setSearch] = useState("");
    const [albumData, setAlbumData] = useState([]);
    const [sortType, setSortType] = useState('');
    const [sortTypeType, setSortTypeType] = useState('');

    const [songs, setSongs] = useState([]);
    const [song, setSong] = useState("");
    const [searchSong, setSearchSong] = useState("");
    const [songData, setSongData] = useState([]);
    const [sortTypeSong, setSortTypeSong] = useState('');
    const [sortTypeTypeSong, setSortTypeTypeSong] = useState('');




    //get access to the URL
    let params = useParams()
    var profile = params.profile
    localStorage.profile = profile


    const [displaySongs, setDisplaySongs] = useState(false);


    function toggle() {
        setDisplaySongs(wasSongs => !wasSongs);
    }

    //Functions for search feature


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

    const songTypes = {
        title: 'title',
        artist: 'artist',
        score: 'score',
    };


    //axios request to get Albums

    const GetAlbums = () =>{
        axios.get(`/album/${params.profile}`).then(res => {
        setAlbums(res.data);
        setAlbum(res.data[0]);
        setSortType('title')
        setSortTypeType(types[sortType])
        console.log(res.data);
        });
    }

    const GetSongs = () =>{
        axios.get(`/song/profile/${params.profile}`).then(res => {
        setSongs(res.data);
        setSong(res.data[0]);
        setSortTypeSong('title')
        setSortTypeTypeSong(songTypes[sortTypeSong])
        console.log(res.data);
        });
    }

    //initial refresh

    useEffect(() => {
        GetAlbums();
        GetSongs();
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

    useEffect(() => {
        const sortSongArray = type => {
            const types = {
                title: 'title',
                artist: 'artist',
                score: 'score',
            };
            const sortProperty = types[type];
            const sorted = [...songs].sort((a, b) => {
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
            setSongData(sorted);
          };

          sortSongArray(sortTypeSong);

    }, [sortTypeSong]) 

    return (
        <div className="App">
            <header className="App-header">
                <h1>
                Welcome
                </h1>
                {!displaySongs && (
                    <>
                    <select onChange={(e) => setSortType(e.target.value)}>
                        <option value="title">Title</option>
                        <option value="artist">Artist</option>
                        <option value="flow">Flow</option>
                        <option value="lyrics">Lyrics</option>
                        <option value="how_captivating">How Captivating</option>
                        <option value="originality">Originality</option>
                        <option value="timelessness">Timelessness</option>
                    </select> 
                        <Box sx={{ width: 600 }}>
                        <Grid container spacing={2} alignItems="center">
                        <Grid item xs>
                        <h2>Albums</h2>
                        </Grid><Grid item xs>
                        <h2><div onClick={toggle}>Songs</div></h2>
                        </Grid></Grid></Box>
                        {albumData.map((item, key) => (
                            <div className="album_display">
                                <a href={`/albumdetails/${item._id}`}>
                                    <Box sx={{ width: 600 }}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item xs>
                                                <img src= {item.cover_photo}/>
                                            </Grid><Grid item xs>
                                                <p>{item.title}</p>
                                                <p>{item.artist}</p>
                                                <div className="scores">
                                                    <p>Flow: {item.flow} Lyrics: {item.lyrics}</p>
                                                    <p>How Captivating: {item.how_captivating}   Originality: {item.originality}</p>
                                                    <p>Timelessness: {item.timelessness}</p>
                                                </div>
                                    </Grid></Grid></Box>
                                </a>
                            </div>
                        ))}
                    </>
                )}

                {displaySongs && (
                    <>
                        <select onChange={(e) => setSortTypeSong(e.target.value)}>
                            <option value="title">Title</option>
                            <option value="artist">Artist</option>
                            <option value="score">Score</option>
                        </select> 
                        <Box sx={{ width: 600 }}>
                        <Grid container spacing={2} alignItems="center">
                        <Grid item xs>
                        <h2><div onClick={toggle}>Albums</div></h2>
                        </Grid><Grid item xs>
                        <h2> Songs</h2>
                        </Grid></Grid></Box>
                        {songData.map((item, key) => (
                            <a href={`/songdetails/${item._id}`}>
                                <div className="album_display">
                                    <Box sx={{ width: 600 }}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item xs>
                                                <div className="songInfo">
                                                    <p>{item.title}</p>
                                                    <p1>{item.artist}</p1> 
                                                </div>                                   
                                            </Grid><Grid item xs>
                                                <div className="scores">
                                                    <h1>{item.score}</h1>
                                                </div>
                                    </Grid></Grid></Box>
                                </div>
                            </a>
                        ))}
                    </>
                )}




                <TextField id="standard-basic" label="Search Album" variant="outlined" onChange={onChangeSearch}/>
                <a className="App-link" href={`/newalbum/${search}`} >Search</a>

            </header>
        </div>
    )
}


export default HomePage;