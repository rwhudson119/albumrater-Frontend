import { useState, useEffect } from "react";
import React from "react";
import axios from "../services/backendApi.js";
import { Link, useParams  } from 'react-router-dom';
import logo from '../album_logo.png';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import urlencode from 'urlencode';
import Typography from '@mui/material/Typography';





const HomePage = (props) => {

    //definitions --------------------------------------------------------------------

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

    const [displaySongs, setDisplaySongs] = useState(false);

    //stats

    const [trendingUp, setTrendingUp] = useState([]);
    const [trendingDown, setTrendingDown] = useState([]);
    const [trends, setTrends] = useState([]);
    const [artistStat, setArtistStat] = useState('');
    const [topArtistStat, setTopArtistStat] = useState('');
    const [genreStat, setGenreStat] = useState('');
    const [topGenreStat, setTopGenreStat] = useState('');
    const [topSongs, setTopSongs] = useState([]);
    const [recentlyChanged, setRecentlyChanged] = useState([]);





    //search options

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

    //get access to the URL
    let params = useParams()
    var profile = params.profile
    localStorage.profile = profile

    //functions ----------------------------------------------------------------------

    //hidden info
    function toggle() {
        setDisplaySongs(wasSongs => !wasSongs);
    }

    //Functions for search feature

    const onChangeSearch = (e) => {
        const search = e.target.value;
        setSearch(search)
    }
    const sortArrayTopSongs = () => {

        const topSongsTemp = [...songs].sort((a, b) => {
            var bTrend
            var aTrend
            if(b.score === undefined){
                bTrend = -1
                
            } else{
                bTrend = b.score
                
            } if(a.score === undefined){
                aTrend = -1
                
            } else{
                aTrend = a.score
            }
            return bTrend - aTrend;
        });
        setTopSongs(topSongsTemp);
      };

      const sortArrayTrend = () => {

        const trendingUpTemp = [...trends].sort((a, b) => {
            return b.trendScore- a.trendScore;
        });
        console.log(trendingUpTemp);
        setTrendingUp(trendingUpTemp);

        const trendingDownTemp = [...trends].sort((a, b) => {
            return a.trendScore - b.trendScore;
        });
        console.log(trendingDownTemp);
        setTrendingDown(trendingDownTemp);
      };


    //axios request to get Albums

    const GetAlbums = () =>{
        axios.get(`/album/${params.profile}`).then(res => {
            setAlbums(res.data);
            setAlbum(res.data[0]);
            setSortType('title')
            setSortTypeType(types[sortType])
            console.log(res.data);
            var sample = []

            res.data.map((item, key) => {
                GetRankStats(item)
            })
        });
    }

    const showArray = () => {
        console.log(trends)
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

    const GetRankStats = (singularAlbum) => {
        var rating1 = 0
        var rating2 = 0

        if((singularAlbum.ratings.length) > 1){

            axios.get(`/rating/date/${urlencode(singularAlbum.ratings[singularAlbum.ratings.length - 1])}`).then(res => {
                rating1 = res.data.total_score  
                axios.get(`/rating/date/${urlencode(singularAlbum.ratings[singularAlbum.ratings.length - 2])}`).then(res2 => {
                    rating2 = res2.data.total_score
                    var arrayTemp = trends
                    arrayTemp.push({album: singularAlbum, trendScore: (rating1 - rating2)})
                    setTrends(arrayTemp)
                    sortArrayTrend()
                })
            })
        }

        
    }

    //UseEffect ----------------------------------------------------------------------------

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
          sortArrayTopSongs();
          sortSongArray(sortTypeSong);

    }, [sortTypeSong]) 

    //Whats Displaying ----------------------------------------------------------------------------------------

    return (
        <div className="App">
            <header className="App-header">
                <h1>
                Welcome
                </h1>

                <div className="trending-up">
                    <p>Trending Up</p>
                    {trendingUp.slice(0, 3).map((item, key) => (
                         
                        <Box sx={{ width: 300 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs>
                                <img src= {item.album.cover_photo}/>
                            </Grid><Grid item xs>
                                <Typography gutterBottom>
                                    {item.trendScore.toFixed(2)}
                                </Typography>
                    </Grid></Grid></Box>
                    ))}
                </div>

                <div className="trending-down">
                    <p>Trending Down</p>
                    {trendingDown.slice(0, 3).map((item, key) => (
                        <Box sx={{ width: 300 }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs>
                                    <img src= {item.album.cover_photo}/>
                                </Grid><Grid item xs>
                                    <Typography gutterBottom>
                                        {item.trendScore.toFixed(2)}
                                    </Typography>
                        </Grid></Grid></Box>
                    ))}
                </div>

                <div className="top-songs">
                    <p>Top Songs</p>
                    {topSongs.slice(0, 5).map((item, key) => (
                         <Typography gutterBottom>
                            {item.title} {item.score}
                        </Typography>
                    ))}
                </div>


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