import { useState, useEffect } from "react";
import React from "react";
import axios from "../services/backendApi.js";
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import urlencode from 'urlencode';
import Typography from '@mui/material/Typography';
import NavBar from './navBar';
import Foot from './footer';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'pure-react-carousel/dist/react-carousel.es.css';
import _ from 'underscore';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';



const HomePage = (props) => {

    //definitions --------------------------------------------------------------------

    const [albums, setAlbums] = useState([]);
    const [albumData, setAlbumData] = useState([]);
    const [sortType, setSortType] = useState('');

    const [songs, setSongs] = useState([]);
    const [songData, setSongData] = useState([]);
    const [sortTypeSong, setSortTypeSong] = useState('');

    const [displaySongs, setDisplaySongs] = useState(false);
    const [displayStats, setDisplayStats] = useState(false);

    const [displayedAlbums, setDisplayedAlbums] = useState([]);

    //stats

    const [trendingUpData, setTrendingUpData] = useState([]);
    const [trendingDownData, setTrendingDownData] = useState([]);
    const [trends, setTrends] = useState([]);
    //const [artistStat, setArtistStat] = useState('');
    const [topArtistPhoto, setTopArtistPhoto] = useState('');
    const [artistScore, setArtistScore] = useState([]);
    const [genreScore, setGenreScore] = useState([]);
    const [topAlbums, setTopAlbums] = useState([]);
    //const [topGenreStat, setTopGenreStat] = useState('');
    const [topSongs, setTopSongs] = useState([]);
    const [recentlyRated, setRecentlyRated] = useState([]);
    const [averageDiff, setAverageDiff] = useState({});



    var artistScoreTemp = []
    var genreScoreTemp = []


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
            {artistScore.slice(0, 1).map((item, key) => (
            <div key={key}>
                <img src={topArtistPhoto} alt= ""></img>
                <Typography gutterBottom>
                    {artistScore[getMax(artistScore)].name}
                </Typography>
            </div>
            ))
        }
        </div></div>
      )

      const StatPanelTG = () => (
        <div className="data_title">
            <p>Top Genre</p>
        <div className="top-genre">
            {genreScore.slice(0, 1).map((item, key) => (
            <div key={key}>
                <p>{genreScore[getMax(genreScore)].genre}</p>
            </div>
            ))
        }
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
                    <p>You rated it: {averageDiff.profScore} </p>
                </Typography>
                <Typography gutterBottom>
                    <p>Average Rating:    {averageDiff.averageScore} </p>
                </Typography>
                
            </div>
            
        }
        </div></div>
      )


      
    const getMax = (array) => {
        var max = 0
        array.map((item, key) => {
            if(item.score > array[max].score){
                max = key
            }
            return 0;
        })
        return max;
    }


    //get access to the URL
    let params = useParams()
    var profile = params.profile
    localStorage.clear();
    localStorage.profile = profile
    console.log("PROFILE")
    console.log(profile)
    console.log(localStorage.profile)

    //functions ----------------------------------------------------------------------

    //hidden info
    function toggle() {
        setDisplaySongs(wasSongs => !wasSongs);
    }

    //Functions for search feature

    const onChangeSearch = (e) => {
        var search = e.target.value;
        setDisplayedAlbums(albumData)
        setDisplayedAlbums(albumData.filter(obj => {
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

        const topAlbumsTemp = [...albums].sort((a, b) => {

            var aTrend = (a.originality + a.flow + a.lyrics + a.how_captivating + a.timelessness)/5
            var bTrend = (b.originality + b.flow + b.lyrics + b.how_captivating + b.timelessness)/5

            return bTrend - aTrend;
        });
        setTopAlbums(topAlbumsTemp);
    };

    const sortArrayTrend = (trendsTemp) => {
        var TUDTst;

        const trendingUpTemp = [...trendsTemp].sort((a, b) => {
            return b.trendScore- a.trendScore;
        });
        try{
            console.log("KHJEBGFSakbs")
            var trendingUpDataTest1 = {album: trendingUpTemp[0].album, change: trendingUpTemp[0].trendScore}
            var trendingUpDataTest2 = {album: trendingUpTemp[1].album, change: trendingUpTemp[1].trendScore}
            var trendingUpDataTest3 = {album: trendingUpTemp[2].album, change: trendingUpTemp[2].trendScore}
            TUDTst = [trendingUpDataTest1,trendingUpDataTest2,trendingUpDataTest3]

            setTrendingUpData(TUDTst);
        
        }catch{
            console.log("KHJEBGFSakbs")
            console.log("setTrendUp err")
            setTrendingUpData([])
        }

        const trendingDownTemp = [...trendsTemp].sort((a, b) => {
            return a.trendScore - b.trendScore;
        });
        
        try{

            var trendingDownDataTest1 = {album: trendingDownTemp[0].album, change: trendingDownTemp[0].trendScore}
            var trendingDownDataTest2 = {album: trendingDownTemp[1].album, change: trendingDownTemp[1].trendScore}
            var trendingDownDataTest3 = {album: trendingDownTemp[2].album, change: trendingDownTemp[2].trendScore}
            TUDTst = [trendingDownDataTest1,trendingDownDataTest2,trendingDownDataTest3]

            setTrendingDownData(TUDTst);

            setDisplayStats(true)
        }catch{
            console.log("trenddown")
        }
    };

    const sortArrayRecentlyRated = () => {
        const recentlyRatedTemp = [...albums].sort((a, b) => {

            var a_noSec = a.ratings[a.ratings.length - 1].split(",");
            var [a_day, a_month, a_year] = a_noSec[0].split('/');
            var [a_hours, a_minutes, a_seconds] = a_noSec[1].split(':');
            var a_date = new Date(+a_year, a_month - 1, +a_day, +a_hours, +a_minutes, +a_seconds);


            var b_noSec = b.ratings[b.ratings.length - 1].split(",");
            var [b_day, b_month, b_year] = b_noSec[0].split('/');
            var [b_hours, b_minutes, b_seconds] = b_noSec[1].split(':');
            var b_date = new Date(+b_year, b_month - 1, +b_day, +b_hours, +b_minutes, +b_seconds);
            
            return b_date - a_date;
        });
        setRecentlyRated(recentlyRatedTemp);
    };

        const GetTopArtist = () => {
            try{
            artistScore.slice(0, 1).map((item, key) => (
                axios.get(`/deezer/artist/${artistScore[getMax(artistScore)].name}`).then(res => {
                    console.log(res.data.data[0])
                    setTopArtistPhoto(res.data.data[0].picture_big)
                }
            ))
        )}catch{
            console.log("unable to find artist")
        }
    }






    
    const getArtistRank = (singularAlbum) => {
        var bool = -1
        artistScoreTemp.map((item, key) => {
            if(item.name === singularAlbum.artist){
                bool = key
            }
            return 0;
        })
        const totalScore = (singularAlbum.originality + singularAlbum.flow + singularAlbum.lyrics + singularAlbum.how_captivating + singularAlbum.timelessness)/5
        if(bool > -1){
            artistScoreTemp[bool].score = artistScoreTemp[bool].score + totalScore
        }else{
            artistScoreTemp.push({name: singularAlbum.artist, score: totalScore})
        }
        setArtistScore(artistScoreTemp)
    }

    const getGenreRank = (singularAlbum) => {
        var bool = -1
        genreScoreTemp.map((item, key) => {
            if(item.genre === singularAlbum.genre){
                bool = key
            }
            return 0;
        })
        const totalScore = (singularAlbum.originality + singularAlbum.flow + singularAlbum.lyrics + singularAlbum.how_captivating + singularAlbum.timelessness)/5
        if(bool > -1){
            genreScoreTemp[bool].score = genreScoreTemp[bool].score + totalScore
        }else{
            genreScoreTemp.push({genre: singularAlbum.genre, score: totalScore})
        }
        setGenreScore(genreScoreTemp)
        return 0;
    }


    //axios request to get Albums

    const GetAlbums = () =>{
        axios.get(`/album/${params.profile}`).then(res => {
            setAlbums(res.data);
            setSortType('title')
            //setSortTypeType(types[sortType])
            res.data.map((item, key) => {
                GetRankStats(item)
                getArtistRank(item)
                getGenreRank(item)
                return 0;
            })
            //sortArtistRank()
        });
        return 0;
    }

    const GetSongs = () =>{
        axios.get(`/song/profile/${params.profile}`).then(res => {
        setSongs(res.data);
        setSortTypeSong('title')
        });
    }
    
    const GetAverageDiff = (albums) => {
        var sumScore = 0, profileVal = -1;
        try{
        albums.map((item, key) => {
            var totalScore = ((item.how_captivating + item.flow + item.lyrics + item.originality + item.timelessness)/5)
            if(item.profile === params.profile){
                profileVal = totalScore
            }else{
                sumScore = sumScore + totalScore
            }
            return 0;
        })
        
        if(profileVal === -1){
            return 0;
        }else{
            if(albums.length - 1 > 0){
                //console.log((sumScore/(albums.length - 1)) - profileVal)
                return (sumScore/(albums.length - 1)) - profileVal
            }else{
            return 0
            }
            
        }
        
        }catch{
            console.log("nope" + params.profile);
        }
        return 0;
    }

    const UseVariationStats = (everyAlbum) => {
        //return an object with the average rating and the profile rating so i can display it easier
        const diffSort = everyAlbum.sort((a,b) => { return Math.abs(GetAverageDiff(b)) - Math.abs(GetAverageDiff(a))});
        //console.log(diffSort)
        //console.log("sorted ratings diff^^")
        
        var averageScore = 0, profileScore = -1;
        diffSort[0].map((item, key) => {
            var totalScore = ((item.how_captivating + item.flow + item.lyrics + item.originality + item.timelessness)/5)
            if(item.profile === params.profile){
                profileScore = totalScore
            }else{
                averageScore = averageScore + totalScore
                console.log(item);
            }
            return 0;
        })

        var testobj = { album: diffSort[0][0].title, averageScore: averageScore, profScore: profileScore, albumImage: diffSort[0][0].cover_photo}


        setAverageDiff(testobj);
     
        //console.log("HERE:")
        //console.log(averageDiff)
        //console.log("THERE^^")
    }

    const GetVariationStats = (albums) => {        
        axios.get(`/album/`).then(res => {
            
            const albumsSingular = _.groupBy(res.data, function(alb){ return alb.title});
            const albumsSingVal = Object.values(albumsSingular);

            UseVariationStats(albumsSingVal);
        });
    }

    const GetRankStats = (singularAlbum) => {
        var rating1 = 0, rating2 = 0

        if((singularAlbum.ratings.length) > 1){

            axios.get(`/rating/date/${urlencode(singularAlbum.ratings[singularAlbum.ratings.length - 1])}`).then(res => {
                rating1 = res.data.total_score  
                axios.get(`/rating/date/${urlencode(singularAlbum.ratings[singularAlbum.ratings.length - 2])}`).then(res2 => {
                    console.log("is this even working")
                    rating2 = res2.data.total_score
                    var arrayTemp = trends
                    arrayTemp.push({album: singularAlbum, trendScore: (rating1 - rating2)})
                    
                    setTrends(arrayTemp)
                    sortArrayTrend(arrayTemp)
                    
                    
                })
            })
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
                total_score: 'total_score',
            };
            const sortProperty = types[type];
            const sorted = [...albums].sort((a, b) => {
                if(sortProperty === 'title'){
                    return a.title.localeCompare(b.title);
                }
                else if(sortProperty === 'artist') {
                    return a.artist.localeCompare(b.artist);
                }else if(sortProperty === 'total_score'){
                    var aTrend1 = (a.originality + a.flow + a.lyrics + a.how_captivating + a.timelessness)/5
                    var bTrend1 = (b.originality + b.flow + b.lyrics + b.how_captivating + b.timelessness)/5
        
                    return bTrend1 - aTrend1;
                }else {
                    return b[sortProperty] - a[sortProperty];
                }
            });
            setAlbumData(sorted);
            setDisplayedAlbums(sorted);
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
            setSongData(sorted);
          };
          sortArrayTopAlbums();
          sortArrayRecentlyRated();
          sortArrayTopSongs();
          sortSongArray(sortTypeSong);
          GetTopArtist();
          GetVariationStats(albums);

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
                        {artistScore[0] &&
                        <Carousel.Item>
                        <div className="stats-buttonless">
                        <StatPanelTA /></div>
                        </Carousel.Item>
                        }{!artistScore[0] &&
                        <div className="stats-buttonless">
                        <p>Rate some Albums to view your stats</p></div>
                        }
                        {genreScore[0] &&
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
                    <div className="top_Album_Individual">
                        {//<a href={`/albumdetails/${item._id}`}>
                           }   <img src= {item.cover_photo} alt= ""/>
                            <p>{key + 1}</p><br></br>
                            <p>{item.title}</p><br></br>
                            <p>{(item.flow + item.lyrics + item.how_captivating + item.originality + item.timelessness) / 5}/100</p><br></br>
                        {//</a>
                        }
                    </div>
                ))}
                </div>

                <h1 className="topRated">
                Recently Rated
                </h1>

                <div className="top_Albums">
                
                {recentlyRated.slice(0, 10).map((item, key) => (
                    <div className="top_Album_Individual">
                        {//<a href={`/albumdetails/${item._id}`}>
                           }   <img src= {item.cover_photo} alt= ""/>
                            <p>{item.title}</p><br></br>
                            <p>{(item.flow + item.lyrics + item.how_captivating + item.originality + item.timelessness) / 5}/100</p><br></br>
                        {//</a>
                        }
                    </div>
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
                            <option value="total_score">Total</option>
                        </select> 
                            <Box sx={{ width: 600 }}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs>
                                        <h2>Albums</h2>
                                    </Grid><Grid item xs>
                                        <h2><div onClick={toggle}>Songs</div></h2>
                            </Grid></Grid></Box>
                            <TextField 
                            id="standard-basic" 
                            sx={{ label: { color: 'white' }}} 
                            label="Search Rated" 
                            variant="outlined"
                            onChange={onChangeSearch}/>

                            {displayedAlbums.map((item, key) => (
                                <div className="album_display">
                                    <a href={`/albumdetails/${item._id}`}>
                                        <Box sx={{ width: 900 }}>
                                            <Grid container spacing={3} alignItems="center">
                                                <Grid item xs>
                                                    <div className="album_display_image">
                                                        <img src= {item.cover_photo} alt= ""/>
                                                    </div>
                                                </Grid><Grid item xs>
                                                    <p>{item.title}</p>
                                                    <p>{item.artist}</p>
                                                    <div className="scores">
                                                        <p>Flow: {item.flow} Lyrics: {item.lyrics}</p>
                                                        <p>How Captivating: {item.how_captivating}   Originality: {item.originality}</p>
                                                        <p>Timelessness: {item.timelessness}</p>
                                                    </div>
                                                </Grid><Grid item xs>
                                                    <p>{(item.flow + item.lyrics + item.how_captivating + item.originality + item.timelessness) / 5}/100</p>
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

            </header>

            <Foot />

        </div>
    )

}


export default HomePage;