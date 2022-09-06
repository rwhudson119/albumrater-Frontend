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
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';
import _ from 'underscore';



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
          <div className="trending-up">
                <p>Trending Up</p>
                
                {displayStats &&
                <LineChart width={500} height={300} data={trendingUpData}>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" tick={{fontSize: "18px"}}/>
                    <YAxis yAxisId="left" domain={[50, 80]} tick={{fontSize: "18px"}}/>
                    <Legend wrapperStyle={{top: 275, left: 0, fontSize: "18px"}} />
                    <Line yAxisId="left" type="monotone" dataKey= {Object.getOwnPropertyNames(trendingUpData[0])[1]} stroke="#8884d8"/>
                    <Line yAxisId="left" type="monotone" dataKey={Object.getOwnPropertyNames(trendingUpData[0])[2]} stroke="#FFA500" />
                    <Line yAxisId="left" type="monotone" dataKey={Object.getOwnPropertyNames(trendingUpData[0])[3]} stroke="#00FF00" />


                </LineChart>
                }
            </div>
      )

      const StatPanelTD = () => (
          <div className="trending-down">
                <p>Trending Down</p>

                 {displayStats &&
                    <LineChart width={500} height={300} data={trendingDownData}>
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="name" tick={{fontSize: "18px"}}/>
                        <YAxis yAxisId="left" domain={[40, 100]} tick={{fontSize: "18px"}}/>
                        <Legend wrapperStyle={{top: 295, left: 0, fontSize: "18px"}}/>
                        <Line yAxisId="left" type="monotone" dataKey= {Object.getOwnPropertyNames(trendingDownData[0])[1]} stroke="#8884d8" />
                        <Line yAxisId="left" type="monotone" dataKey={Object.getOwnPropertyNames(trendingDownData[0])[2]} stroke="#FFA500" />
                        <Line yAxisId="left" type="monotone" dataKey={Object.getOwnPropertyNames(trendingDownData[0])[3]} stroke="#00FF00" />
                    </LineChart>
                }
            </div>
      )

      const StatPanelTS = () => (
        <div className="top-songs">
            <p>Top Songs</p>
            {topSongs.slice(0, 5).map((item, key) => (
                <div key = {key}>
                    <Typography gutterBottom>
                        {item.title} {item.score}
                    </Typography>
                </div>
            ))}
        </div>
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


      const StatPanelTA = () => (
        <div className="top-artist">
            <p>Top Artist</p>
            {
            artistScore.slice(0, 1).map((item, key) => (
            <div key={key}>
                <img src={topArtistPhoto} alt= ""></img>
                <Typography gutterBottom>
                    {artistScore[getMax(artistScore)].name}
                </Typography>
            </div>
            ))
        }
        </div>
      )

      const StatPanelTG = () => (
        <div className="top-genre">
            <p>Top Genre</p>
            {genreScore.slice(0, 1).map((item, key) => (
            <div key={key}>
                <Typography gutterBottom>
                    {genreScore[getMax(genreScore)].genre}
                </Typography>
            </div>
            ))
        }
        </div>
      )

      const StatPanelAD = () => (
        <div className="average-difference">
            <p>You're Special</p>
            {
            <div>
                <Typography gutterBottom>
                    {averageDiff.album}
                </Typography>
                <Typography gutterBottom>
                    <p>You rated it: {averageDiff.profScore} </p>
                </Typography>
                <Typography gutterBottom>
                    <p>Average Rating:    {averageDiff.averageScore} </p>
                </Typography>
                
            </div>
            
        }
        </div>
      )


    //search options

    /*const types = {
        title: 'title',
        artist: 'artist',
        flow: 'flow',
        lyrics: 'lyrics',
        how_captivating: 'how_captivating',
        originality: 'originality',
        timelessness: 'timelessness',
        total_score: 'total',
    };

    const songTypes = {
        title: 'title',
        artist: 'artist',
        score: 'score',
    };*/

    //get access to the URL
    let params = useParams()
    var profile = params.profile
    localStorage.clear();
    localStorage.profile = profile

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

        const trendingUpTemp = [...trendsTemp].sort((a, b) => {
            return b.trendScore- a.trendScore;
        });
        try{
            setTrendingUpData([{name: 'Prev', [trendingUpTemp[0].album.title]: ((trendingUpTemp[0].album.how_captivating + trendingUpTemp[0].album.flow + trendingUpTemp[0].album.lyrics + trendingUpTemp[0].album.originality + trendingUpTemp[0].album.timelessness)/5 - trendingUpTemp[0].trendScore), [trendingUpTemp[1].album.title]: ((trendingUpTemp[1].album.how_captivating + trendingUpTemp[1].album.flow + trendingUpTemp[1].album.lyrics + trendingUpTemp[1].album.originality + trendingUpTemp[1].album.timelessness)/5 - trendingUpTemp[1].trendScore), [trendingUpTemp[2].album.title]: ((trendingUpTemp[2].album.how_captivating + trendingUpTemp[2].album.flow + trendingUpTemp[2].album.lyrics + trendingUpTemp[2].album.originality + trendingUpTemp[2].album.timelessness)/5 - trendingUpTemp[2].trendScore)},{name: 'New', [trendingUpTemp[0].album.title]: (trendingUpTemp[0].album.how_captivating + trendingUpTemp[0].album.flow + trendingUpTemp[0].album.lyrics + trendingUpTemp[0].album.originality + trendingUpTemp[0].album.timelessness)/5, [trendingUpTemp[1].album.title]: (trendingUpTemp[1].album.how_captivating + trendingUpTemp[1].album.flow + trendingUpTemp[1].album.lyrics + trendingUpTemp[1].album.originality + trendingUpTemp[1].album.timelessness)/5, [trendingUpTemp[2].album.title]: (trendingUpTemp[2].album.how_captivating + trendingUpTemp[2].album.flow + trendingUpTemp[2].album.lyrics + trendingUpTemp[2].album.originality + trendingUpTemp[2].album.timelessness)/5}]);
        }catch{
            console.log("setTrendUp err")
        }

        const trendingDownTemp = [...trendsTemp].sort((a, b) => {
            return a.trendScore - b.trendScore;
        });
        
        try{
            var TDD1 = (trendingDownTemp[0].album.how_captivating + trendingDownTemp[0].album.flow + trendingDownTemp[0].album.lyrics + trendingDownTemp[0].album.originality + trendingDownTemp[0].album.timelessness)/5;
            var TDD2 = (trendingDownTemp[1].album.how_captivating + trendingDownTemp[1].album.flow + trendingDownTemp[1].album.lyrics + trendingDownTemp[1].album.originality + trendingDownTemp[1].album.timelessness)/5;
            var TDD3 = (trendingDownTemp[2].album.how_captivating + trendingDownTemp[2].album.flow + trendingDownTemp[2].album.lyrics + trendingDownTemp[2].album.originality + trendingDownTemp[2].album.timelessness)/5;
            setTrendingDownData([{name: 'Prev', [trendingDownTemp[0].album.title]: (TDD1 - trendingDownTemp[1].trendScore), [trendingDownTemp[1].album.title]: (TDD2 - trendingDownTemp[1].trendScore), [trendingDownTemp[2].album.title]: (TDD3 - trendingDownTemp[2].trendScore)},{name: 'New', [trendingDownTemp[0].album.title]: TDD1, [trendingDownTemp[1].album.title]: TDD2, [trendingDownTemp[2].album.title]: TDD3}]);
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
        
        var averageScore = 0, profileScore = 0;
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

        var testobj = { album: diffSort[0][0].title, averageScore: averageScore, profScore: profileScore}


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
            //console.log("var start");
            //console.log(albumsSingVal);
            //console.log(albums);
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
                    sortArrayTrend(arrayTemp)
                    
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
                    <Carousel>
                        <Carousel.Item>
                        <div className="stats-buttonless">
                        <StatPanelTU /></div>
                        </Carousel.Item>
                        <Carousel.Item>
                        <div className="stats-buttonless">
                        <StatPanelTD /></div>
                        </Carousel.Item>
                        <Carousel.Item>
                        <div className="stats-buttonless">
                        <StatPanelTS /></div>
                        </Carousel.Item>
                        <Carousel.Item>
                        <div className="stats-buttonless">
                        <StatPanelTA /></div>
                        </Carousel.Item>
                        <Carousel.Item>
                        <div className="stats-buttonless">
                        <StatPanelTG /></div>
                        </Carousel.Item>
                        <Carousel.Item>
                        <div className="stats-buttonless">
                        <StatPanelAD /></div>
                        </Carousel.Item>
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
                            <p>{item.title}</p>
                            <p>{(item.flow + item.lyrics + item.how_captivating + item.originality + item.timelessness) / 5}/100</p><br></br>
                            <p>{key + 1}</p>
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
                            <p>{item.title}</p>
                            <p>{(item.flow + item.lyrics + item.how_captivating + item.originality + item.timelessness) / 5}/100</p><br></br>
                            <p>{key + 1}</p>
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
        </div>
    )

}


export default HomePage;