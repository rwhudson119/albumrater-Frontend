import { useState, useEffect, Fragment } from "react";
import React from "react";
import axios from "../services/backendApi.js";
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import urlencode from 'urlencode';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';

import NavBar from './navBar';
import Foot from './footer';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'pure-react-carousel/dist/react-carousel.es.css';
import _ from 'underscore';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import SearchIcon from '@mui/icons-material/Search';




const HomePage = (props) => {

    //definitions --------------------------------------------------------------------

    const [albums, setAlbums] = useState([]);
    const [sortType, setSortType] = useState('');

    const [songs, setSongs] = useState([]);
    const [sortTypeSong, setSortTypeSong] = useState('');

    const [displaySongs, setDisplaySongs] = useState(false);
    const [displayQueue] = useState(false);
    const [displayStats, setDisplayStats] = useState(false);

    const [displayedAlbums, setDisplayedAlbums] = useState([]);
    const [displayedSongs, setDisplayedSongs] = useState([]);

    //stats
    const [mostRatedAlbums, setMostRatedAlbums] = useState([]);
    const [trendingUpData, setTrendingUpData] = useState([]);
    const [trendingDownData, setTrendingDownData] = useState([]);
    //const [trends, setTrends] = useState([]);
    const [topArtistPhoto, setTopArtistPhoto] = useState('');
    const [topArtist, setTopArtist] = useState('');
    const [topGenre, setTopGenre] = useState('');
    const [topAlbums, setTopAlbums] = useState([]);

    const [topSongs, setTopSongs] = useState([]);
    const [recentlyRated, setRecentlyRated] = useState([]);
    const [albumQueue, setAlbumQueue] = useState([]);
    const [averageDiff, setAverageDiff] = useState({});


    var trends = []
    var artistScore = {}
    var genreScore = {}

    function toggle() {
        setDisplaySongs(wasSongs => !wasSongs);
    }



    const StatPanelTU = () => (
        <div className="data_title">
            <p>Trending Up</p>
            {
                displayStats &&
                trendingUpData[0] !== [] &&
                <div className="trending">
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={3}><img src={trendingUpData[0].album.cover_photo} alt= ""></img></Grid>
                        <Grid item xs={6}><p>{trendingUpData[0].album.title}</p></Grid>
                        <Grid item xs={3}><p><TrendingUpIcon /> {trendingUpData[0].change.toFixed(2)}</p></Grid>
                    </Grid>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={3}><img src={trendingUpData[1].album.cover_photo} alt= ""></img></Grid>
                        <Grid item xs={6}><p>{trendingUpData[1].album.title}</p></Grid>
                        <Grid item xs={3}><p> <TrendingUpIcon /> {trendingUpData[1].change.toFixed(2)}</p></Grid>
                    </Grid>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={3}><img src={trendingUpData[2].album.cover_photo} alt= ""></img></Grid>
                        <Grid item xs={6}><p>{trendingUpData[2].album.title}</p></Grid>
                        <Grid item xs={3}><p><TrendingUpIcon /> {trendingUpData[2].change.toFixed(2)}</p></Grid>
                    </Grid>
                </div>
            }{
                displayStats &&
                trendingUpData === [] &&
                <div className="trending">
                    <p>change some songs buddy</p>
                </div>
            }

        </div>
    )

    const StatPanelTD = () => (
        <div className="data_title">
            <p>Trending Down</p>
            {
                displayStats &&
                <div className="trending">
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={3}><img src={trendingDownData[0].album.cover_photo} alt= ""></img></Grid>
                        <Grid item xs={6}><p>{trendingDownData[0].album.title}</p></Grid>
                        <Grid item xs={3}><p><TrendingDownIcon /> {trendingDownData[0].change.toFixed(2)}</p></Grid>
                    </Grid><Grid container spacing={3} alignItems="center">
                        <Grid item xs={3}><img src={trendingDownData[1].album.cover_photo} alt= ""></img></Grid>
                        <Grid item xs={6}><p>{trendingDownData[1].album.title}</p></Grid>
                        <Grid item xs={3}><p><TrendingDownIcon /> {trendingDownData[1].change.toFixed(2)}</p></Grid>
                    </Grid><Grid container spacing={3} alignItems="center">
                    <Grid item xs={3}><img src={trendingDownData[2].album.cover_photo} alt= ""></img></Grid>
                    <Grid item xs={6}><p>{trendingDownData[2].album.title}</p></Grid>
                    <Grid item xs={3}><p> <TrendingDownIcon /> {trendingDownData[2].change.toFixed(2)}</p></Grid>
                    </Grid>
                </div>
            }
        </div>
    )

      const StatPanelTS = () => (
        <div className="data_title">
            <p>Top Songs</p>
        <div className="top-songs">
            {topSongs.slice(0, 3).map((item, key) => (
                <div key = {key}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={8}><p> {item.title} </p> </Grid>
                        
                    <Grid item xs={4}><p>{item.score}</p> </Grid> 
                </Grid>
                </div>
            ))}
        </div></div>
      )

      const StatPanelTA = () => (
        <div className="data_title">
            <p>Top Artist</p>
        <div className="top-artist">
                <img src={topArtistPhoto} alt= ""></img>
                <Typography gutterBottom>
                    {topArtist}

                </Typography>
            </div>
        </div>
      )

      const StatPanelTG = () => (
        <div className="data_title">
            <p>Top Genre</p>
        <div className="top-genre">
            <Typography gutterBottom>
                    {topGenre}
            </Typography>
        </div></div>
      )

      const StatPanelAD = () => (
        <div className="data_title">
            <p>Where you stand out</p>
        <div className="average-difference">
            {
            <div>
                <img src={averageDiff.albumImage} alt= ""></img>
                <p>
                    {averageDiff.album}
                </p>
                <Typography gutterBottom>
                    You rated it: {averageDiff.profScore}
                </Typography>
                <Typography gutterBottom>
                    Average Rating:    {(+averageDiff.averageScore).toFixed(2)}
                </Typography>
                
            </div>
            
        }
        </div></div>
      )
    const getMaxProp = (object) => {
        var bool = 0
        var max_name
        for (const property in object) {
            if(object[property] > object[max_name] || bool === 0){
                bool = 1
                max_name = property
            }
        }
        return max_name
    }


    //get access to the URL
    let params = useParams()
    var profile = params.profile
    localStorage.clear();
    localStorage.profile = profile

    //functions ----------------------------------------------------------------------

    //Functions for search feature

    const onChangeSearch = (e) => {
        var search = e.target.value;
        setDisplayedAlbums(albums.filter(obj => {
            return obj.title.toLowerCase().includes(search.toLowerCase()) || obj.artist.toLowerCase().includes(search.toLowerCase())
        }))
    }
    const onChangeSearchSongs = (e) => {
        var search = e.target.value;
        setDisplayedSongs(songs.filter(obj => {
            return obj.title.toLowerCase().includes(search.toLowerCase()) || obj.artist.toLowerCase().includes(search.toLowerCase())
        }))
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

    const sortArrayTopAlbums = () => {

        setTopAlbums([...albums].sort((a, b) => {
            var aTrend = (a.originality + a.flow + a.lyrics + a.how_captivating + a.timelessness)/5
            var bTrend = (b.originality + b.flow + b.lyrics + b.how_captivating + b.timelessness)/5

            return bTrend - aTrend;
        })
        );
    };


    const sortArrayTrend = (trendsTemp) => {
        var TUDTst, TUDTst2;

        var trendingUpTemp = [...trendsTemp].sort((a, b) => {
            return b.trendScore- a.trendScore;
        });
        try{
            var trendingUpDataTest1 = {album: trendingUpTemp[0].album, change: trendingUpTemp[0].trendScore}
            var trendingUpDataTest2 = {album: trendingUpTemp[1].album, change: trendingUpTemp[1].trendScore}
            var trendingUpDataTest3 = {album: trendingUpTemp[2].album, change: trendingUpTemp[2].trendScore}
            var trendingDownDataTest1 = {album: trendingUpTemp[trendsTemp.length - 1].album, change: trendingUpTemp[trendingUpTemp.length - 1].trendScore}
            var trendingDownDataTest2 = {album: trendingUpTemp[trendsTemp.length - 2].album, change: trendingUpTemp[trendingUpTemp.length - 2].trendScore}
            var trendingDownDataTest3 = {album: trendingUpTemp[trendsTemp.length - 3].album, change: trendingUpTemp[trendingUpTemp.length - 3].trendScore}
            TUDTst = [trendingUpDataTest1,trendingUpDataTest2,trendingUpDataTest3]
            TUDTst2 = [trendingDownDataTest1,trendingDownDataTest2,trendingDownDataTest3]

            setTrendingUpData(TUDTst);
            setTrendingDownData(TUDTst2);
            setDisplayStats(true)
        
        }catch{
            console.log("setTrend err")

            setTrendingUpData([])
            setTrendingDownData([])
        }
        trendingUpTemp = []
    };


    const sortArrayRecentlyRated = () => {
        var recentlyRatedTemp = [...albums].sort((a, b) => {

            var a_date, b_date
            if(a.in_queue === "yes"){
                a_date = 0
            }else{
                var a_noSec = a.ratings[a.ratings.length - 1].split(",");
                var [a_day, a_month, a_year] = a_noSec[0].split('/');
                var [a_hours, a_minutes, a_seconds] = a_noSec[1].split(':');
                a_date = new Date(+a_year, a_month - 1, +a_day, +a_hours, +a_minutes, +a_seconds);
            }
            if(b.in_queue === "yes"){
                b_date = 0
            }else{
                var b_noSec = b.ratings[b.ratings.length - 1].split(",");
                var [b_day, b_month, b_year] = b_noSec[0].split('/');
                var [b_hours, b_minutes, b_seconds] = b_noSec[1].split(':');
                b_date = new Date(+b_year, b_month - 1, +b_day, +b_hours, +b_minutes, +b_seconds);
            }

            return b_date - a_date;
        });
        setRecentlyRated(recentlyRatedTemp);
        setAlbumQueue(recentlyRatedTemp.filter(obj => {
            return obj.in_queue === "yes"
        }))
        recentlyRatedTemp = []
    };

    const GetTopArtist = () => {
        try{
            var top_Artist_Name = getMaxProp(artistScore)
            setTopArtist(top_Artist_Name)
            artistScore = {}
            axios.get(`/deezer/artist/${top_Artist_Name}`).then(res => {
                setTopArtistPhoto(res.data.data[0].picture_big)
            }
        )}catch{
            console.log("unable to find artist")
        }
    }

    
    const getArtistRank = (gAlbums) => {
        var total = (gAlbums.originality + gAlbums.flow + gAlbums.lyrics + gAlbums.how_captivating + gAlbums.timelessness)/5
        if(artistScore[gAlbums.artist] === undefined){
            artistScore[gAlbums.artist] = total

        }else{
            artistScore[gAlbums.artist] = artistScore[gAlbums.artist] + total
        }
        }



    const getGenreRank = (singularAlbum) => {
        var totalScore = (singularAlbum.originality + singularAlbum.flow + singularAlbum.lyrics + singularAlbum.how_captivating + singularAlbum.timelessness)/5
        if(genreScore[singularAlbum.genre] === undefined){
            genreScore[singularAlbum.genre] = totalScore

        }else{
            genreScore[singularAlbum.genre] = genreScore[singularAlbum.genre] + totalScore
        }
        setTopGenre(getMaxProp(genreScore))
        return 0;
    }


    //axios request to get Albums

    const GetAlbums = () =>{
        axios.get(`/album/${params.profile}`).then(res => {
            setAlbums(res.data);
            setSortType('title')
            res.data.map((item) => {

                GetRankStats(item)
                getArtistRank(item)
                getGenreRank(item)
                return 0;
            })
            GetTopArtist(topArtist);
            trends = []
        });
        return 0;
    }

    const GetSongs = () =>{
        axios.get(`/song/profile/${params.profile}`).then(res => {
        setSongs(res.data);
        setSortTypeSong('title')
        });
    }

    const beenRated = (albumRatings) => {
        var returnVal = 0
        albumRatings.map((item) => {
            if(item.profile === params.profile){
                returnVal = 1
            }
            return 0;
        });
        if(returnVal === 1){
            return false
        }else{
            return true
        }
    }

    const GetMostRated = (everyAlbum) =>{

        const mostRatedAlbs = []
        everyAlbum.map((item) => {
            if(beenRated(item)){
                //console.log("Have not rated: " + item[0].title)
                mostRatedAlbs.push(item)
            }
            return 0;
        });
        mostRatedAlbs.sort((a, b) => b.length - a.length)
        return mostRatedAlbs
    }

    const GetScoresSafely = (album) => {
        var currentScore = 0
        var currentVars = 0
        if(album.originality){
            currentScore = currentScore + album.originality 
            currentVars ++
        }if(album.flow){
            currentScore = currentScore + album.flow 
            currentVars ++
        }if(album.lyrics){
            currentScore = currentScore + album.lyrics
            currentVars ++
        }if(album.how_captivating){
            currentScore = currentScore + album.how_captivating
            currentVars ++
        }if(album.timelessness){
            currentScore = currentScore + album.timelessness
            currentVars ++
        }if(album.delivery){
            currentScore = currentScore + album.delivery
            currentVars ++
        }if(album.music){
            currentScore = currentScore + album.music
            currentVars ++
        }
        return currentScore/currentVars
    }


    
    const GetAverageDiff = (albumRatings) => {
        var sumScore = 0, profileVal = -1, otherRaters = 0;
        try{
            //Get average Score
            albumRatings.map((item) => {
                var totalScore = GetScoresSafely(item)

                if(item.profile === params.profile){
                    profileVal = totalScore
                }else{
                    //console.log(" NEW SCORE JUST DROPPED for " + item.title)
                    //console.log(totalScore)
                    sumScore = sumScore + totalScore
                    otherRaters = otherRaters + 1
                } return 0;
            })
            var scores = {profileVal: profileVal, averageDiff: Math.abs(sumScore/(albumRatings.length - 1) - profileVal)}
            
            if(profileVal === -1){
                return 0;
            }if(otherRaters === 0){
                return 0;
            }else{
                if(albumRatings.length - 1 > 0){
                    return scores

                }else{
                    return 0
                }
        }}catch{
            console.log("nope" + params.profile);
        }
        return 0;
    }

    const UseVariationStats = (everyAlbum) => {
        var max= 0, itemKey, profileScore = -1
        everyAlbum.map((item, key) => {
            var result = GetAverageDiff(item)
            var score = result.averageDiff
            
            if(score > max){
                max = score
                itemKey = key
                profileScore = result.profileVal

                console.log(everyAlbum[itemKey][0].title)
                console.log(max + profileScore)
            }
            return 0
            
        })

        var testobj = { album: everyAlbum[itemKey][0].title, averageScore: (max + profileScore), profScore: profileScore, albumImage: everyAlbum[itemKey][0].cover_photo}

        setMostRatedAlbums(GetMostRated(everyAlbum));
        
        setAverageDiff(testobj);
    }

    const GetVariationStats = () => {        
        axios.get(`/album/`).then(res => {
            var albumsSingular = _.groupBy(res.data, function(alb){ return alb.title});
            var albumsSingVal = Object.values(albumsSingular);
            albumsSingular = {}

            UseVariationStats(albumsSingVal);
        });
    }

    const GetRankStats = (singularAlbum) => {
        var rating1 = 0, rating2 = 0

        if((singularAlbum.ratings.length) > 1){
            axios.get(`/rating/date/${urlencode(singularAlbum.ratings[singularAlbum.ratings.length - 1])}`).then(res => {
                rating1 = res.data.total_score  
                axios.get(`/rating/date/${urlencode(singularAlbum.ratings[singularAlbum.ratings.length - 2])}`).then(res2 => {
                    rating2 = res2.data.total_score
                    var arrayTemp = trends
                    arrayTemp.push({album: singularAlbum, trendScore: (rating1 - rating2)})
                    
                    trends = arrayTemp
                    sortArrayTrend(arrayTemp)
                }, () => {
                    console.log("Cant find album rating")
                });
            }, () => {
                console.log("Cant find album rating")
            });
        }else{
            setTrendingUpData([])
            setTrendingDownData([])
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
                delivery: 'delivery',
                music: 'music',
                total_score: 'total_score',
            };
            var sortProperty = types[type];
            setDisplayedAlbums([...albums].sort((a, b) => {
                if(sortProperty === 'title' || sortProperty === 'artist'){
                    return a[sortProperty].localeCompare(b[sortProperty]);
                }else if(sortProperty === 'total_score'){
                    //this is where i get the scores
                    var aTrend1 = GetScoresSafely(a)
                    // (a.originality + a.flow + a.lyrics + a.how_captivating + a.timelessness)/5
                    var bTrend1 = GetScoresSafely(b)
                    //(b.originality + b.flow + b.lyrics + b.how_captivating + b.timelessness)/5

                    return bTrend1 - aTrend1;
                }else {
                    return b[sortProperty] - a[sortProperty];
                }
            }))

          };
          sortArray(sortType);
    }, [sortType, displayQueue]) 

    useEffect(() => {
        const sortSongArray = type => {
            const types = {
                title: 'title',
                artist: 'artist',
                score: 'score',
            };
            var sortProperty = types[type];
            setDisplayedSongs([...songs].sort((a, b) => {
                if(sortProperty === 'title' || sortProperty === 'artist'){
                    return a[sortProperty].localeCompare(b[sortProperty]);
                }else {
                    return b[sortProperty] - a[sortProperty];
                }
            }))

          };
          
          sortArrayTopAlbums();
          sortArrayRecentlyRated();
          sortArrayTopSongs();
          sortSongArray(sortTypeSong);
          GetVariationStats();

    }, [sortTypeSong]) 

    //Whats Displaying ----------------------------------------------------------------------------------------
    return (
        <div className="App">
            <NavBar />
            
            <header className="App-header">
                <h1>
                Welcome
                </h1>

                <div className="album-stats-entire">
                    <Carousel slide={false}>
                        {topArtistPhoto !== '' &&
                        <Carousel.Item>
                        <div className="stats-buttonless">
                        <StatPanelTA /></div>
                        </Carousel.Item>
                        }{topArtistPhoto === '' &&
                        <div className="stats-buttonless">
                        <p>Rate some Albums to view your stats</p></div>
                        }
                        {topGenre &&
                        <Carousel.Item>
                        <div className="stats-buttonless">
                        <StatPanelTG /></div>
                        </Carousel.Item>
                        }{(averageDiff.profScore !== -1) &&
                        <Carousel.Item>
                        <div className="stats-buttonless">
                        <StatPanelAD /></div>
                        </Carousel.Item>
                        }{topSongs[0] &&
                            <Carousel.Item>
                            <div className="stats-buttonless">
                            <StatPanelTS /></div>
                            </Carousel.Item>
                        }{trendingUpData[0] &&
                            <Carousel.Item>
                            <div className="stats-buttonless">
                            <StatPanelTU /></div>
                            </Carousel.Item>
                        }{trendingDownData[0] &&
                        <Carousel.Item>
                        <div className="stats-buttonless">
                        <StatPanelTD /></div>
                        </Carousel.Item>
                        }
                    </Carousel>
                </div>

                <h1 className="topRated">
                    Top Rated
                </h1>

                <div className="top_Albums">
                
                {topAlbums.slice(0, 10).map((item, key) => (
                    <div className="top_Album_Individual" key={key}>
                        <a href={`/albumdetails/${item._id}`}>
                              <img src= {item.cover_photo} alt= ""/>
                            <p>{key + 1}</p><br></br>
                            <p>{item.title}</p><br></br>
                            <p>{(item.flow + item.lyrics + item.how_captivating + item.originality + item.timelessness) / 5}/100</p><br></br>
                        </a>
                        
                    </div>
                ))}

                </div>
                
                {(recentlyRated[0]) && (
                        <>

                <h1 className="topRated">
                    Recently Rated
                </h1>

                <div className="top_Albums">
                
                {recentlyRated.filter(obj => {
                    return obj.in_queue !== "yes"
                }).slice(0, 10).map((item, key) => (
                    <div key={key} className="top_Album_Individual">
                        <a href={`/albumdetails/${item._id}`}>
                              <img src= {item.cover_photo} alt= ""/>
                            <p>{item.title}</p><br></br>
                            <p>{(item.flow + item.lyrics + item.how_captivating + item.originality + item.timelessness) / 5}/100</p><br></br>
                        </a>
                        
                    </div>
                ))}

                </div></>)}

                {(albumQueue[0]) && (
                        <>
                     
                <h1 className="topRated">
                In Queue
                </h1>

                <div className="top_Albums">
                
                {albumQueue.slice(0, 10).map((item, key) => (
                    <div key={key} className="top_Album_Individual">
                        <a href={`/albumdetails/${item._id}`}>
                              <img src= {item.cover_photo} alt= ""/>
                            <p>{item.title}</p><br></br>
                            <p>{item.expectation}/100</p><br></br>
                        </a>
                        
                    </div>
                ))}
                </div> </>)}

               

                    <h1 className="topRated">
                    Most Rated Albums
                    </h1>

                    <div className="top_Albums">
                    
                        {mostRatedAlbums.slice(0, 10).map((item, key) => (
                            <div key={key} className="top_Album_Individual">
                                <a href={`/addalbum/${item[0]._id}`}>
                                    <img src= {item[0].cover_photo} alt= ""/>
                                    <p>{item[0].title}</p><br></br>
                                </a>
                                
                            </div>
                        ))}
                    </div>
                    
                            
                
                    {!displaySongs && (
                        <>
                            <div className="sort_by">
                                <FormControl sx={{ m: 1, minWidth: 100}}>
                                <InputLabel id="simple-select" color="primary">Sort by</InputLabel>
                                <Select value={sortType}  variant="filled"
                                    onChange={(e) => setSortType(e.target.value)} color="primary">
                                    <MenuItem  value="title">Title</MenuItem >
                                    <MenuItem  value="artist">Artist</MenuItem >
                                    <MenuItem  value="flow">Flow</MenuItem >
                                    <MenuItem  value="lyrics">Lyrics</MenuItem >
                                    <MenuItem  value="how_captivating">How Captivating</MenuItem >
                                    <MenuItem  value="originality">Originality</MenuItem >
                                    <MenuItem  value="timelessness">Timelessness</MenuItem >
                                    <MenuItem  value="total_score">Total</MenuItem >

                            </Select></FormControl></div>

                            <div className="toggle_box">
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs>
                                        <Button disabled><h2>Albums</h2></Button>
                                    </Grid><Grid item xs>
                                        <Button onClick={toggle}><h2>Songs</h2></Button>
                            </Grid></Grid></div>
                            <TextField 
                            id="standard-basic" 
                            sx={{ label: { color: 'white' }}} 
                            label={
                                <Fragment>
                                <SearchIcon className="myIcon" fontSize="small" />
                                &nbsp; Search Rated
                            </Fragment>}
                            variant="outlined"
                            onChange={onChangeSearch}/>

                            <div className="album-list-entire">

                            {displayedAlbums.map((item, key) => (
                                <div key={key} className="album_display">
                                    <a href={`/albumdetails/${item._id}`}>
                                        <div className="album-display-box">
                                            <Grid container spacing={3} alignItems="center">
                                                <Grid item xs>
                                                    <div className="album_display_image">
                                                        <img src= {item.cover_photo} alt= ""/>
                                                    </div>
                                                </Grid><Grid item xs>
                                                    <p>{item.title}</p>
                                                    <p>{item.artist}</p>
                                                </Grid><Grid item xs>
                                                    {sortType !== 'title' && sortType !==  'artist' && sortType !==  'total' && (
                                                        <p>{sortType}:  {item[sortType]}</p>

                                                    )}
                                                        <p>{(item.flow + item.lyrics + item.how_captivating + item.originality + item.timelessness) / 5}/100</p>
                                                      
                                        </Grid></Grid></div>
                                    </a>
                                </div>
                            ))}
                        </div></>
                    )}

                    {displaySongs && (
                        <>
                            <div className="sort_by">
                                <FormControl sx={{ m: 1, minWidth: 150 }}>
                                <InputLabel id="simple-select" color="primary">Sort by</InputLabel>
                                <Select value={sortTypeSong}  variant="filled"
                                    onChange={(e) => setSortTypeSong(e.target.value)} color="primary">
                                        <MenuItem value="title">Title</MenuItem>
                                        <MenuItem value="artist">Artist</MenuItem>
                                        <MenuItem value="score">Score</MenuItem>
                                </Select></FormControl></div>

                            <div className="toggle_box">
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs>
                                    <Button onClick={toggle} ><h2>Albums</h2></Button>
                                </Grid><Grid item xs>
                                <Button disabled><h2> Songs</h2></Button>
                            </Grid></Grid></div>

                            <TextField 
                            id="standard-basic" 
                            sx={{ label: { color: 'white' }}} 
                            label={
                                <Fragment>
                                <SearchIcon className="myIcon" fontSize="small" />
                                &nbsp; Search Rated
                            </Fragment>}
                            variant="outlined"
                            onChange={onChangeSearchSongs}/>

                            <div className="album-list-entire">

                            {displayedSongs.map((item, key) => (
                                <a href={`/songdetails/${item._id}`} key={key}>
                                    <div className="album_display" key={item._id}>
                                        
                                        <div className="album-display-box">
                                            <Grid container spacing={2} alignItems="center">
                                                <Grid item xs={8}>
                                                    <div className="songInfo">
                                                        <p>{item.title}</p>
                                                        <p>{item.artist}</p> 
                                                    </div>                                   
                                                </Grid><Grid item xs={4}>
                                                    <div className="scores">
                                                        <h1>{item.score}</h1>
                                                    </div>
                                        </Grid></Grid></div>
                                    </div>
                                </a>
                            ))}
                        </div></>
                    )}


            </header>

            <Foot />

        </div>
    )

}


export default HomePage;