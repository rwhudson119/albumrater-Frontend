import React, { useState, useEffect } from "react";
import axios from "../services/backendApi.js";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MuiInput from '@mui/material/Input';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import NavBar from './navBar';




const Input = styled(MuiInput)`
width: 42px;
`;


const AddAlbum = (props) => {

    let params = useParams()
    const time = new Date().toLocaleString()

    const [displayDetails, setDisplayDetails] = useState(false);
      
    function toggle() {
        setDisplayDetails(wasDetails => !wasDetails);
    }

    
    const [displaySongs, setDisplaySongs] = useState(false);
      
    function toggleSongs() {
        setDisplaySongs(wasSongs => !wasSongs);
    }


    const [results, setResults] = useState(null);
    const [artist, setArtist] = useState("");
    const [title, setTitle] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [coverPhoto, setCoverPhoto] = useState("");
    const [genre, setGenre] = useState("");
    const [originality, setOriginality] = useState(50);
    const [flow, setFlow] = useState(50);
    const [lyrics, setLyrics] = useState(50);
    const [howCaptivating, setHowCaptivating] = useState(50);
    const [timelessness, setTimelessness] = useState(50);
    const [notes, setNotes] = useState("");
    const [songScores1, setSongScores1] = useState([]);
    const [songScores, setSongScores] = useState();


    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    const profile = localStorage.profile
    const navigate  = useNavigate ();
    var arr = [];
    var songScoresArr = [];
    //const [ratings, setRatings] = useState("");
    

    const handleSliderChangeOriginality = (event, newValue) => {
            setOriginality(newValue);
        };
        
        const handleInputChangeOriginality = (event) => {
            setOriginality(event.target.value === '' ? '' : Number(event.target.value));
        };

        const handleSliderChangeFlow = (event, newValue) => {
            setFlow(newValue);
        };
        
        const handleInputChangeFlow = (event) => {
            setFlow(event.target.value === '' ? '' : Number(event.target.value));
        };

        const handleSliderChangeLyrics = (event, newValue) => {
            setLyrics(newValue);
        };
        
        const handleInputChangeLyrics = (event) => {
            setLyrics(event.target.value === '' ? '' : Number(event.target.value));
        };

        const handleSliderChangeHowCaptivating = (event, newValue) => {
            setHowCaptivating(newValue);
        };
        
        const handleInputChangeHowCaptivating = (event) => {
            setHowCaptivating(event.target.value === '' ? '' : Number(event.target.value));
        };

        const handleSliderChangeTimelessness = (event, newValue) => {
            setTimelessness(newValue);
        };
        
        const handleInputChangeTimelessness = (event) => {
            setTimelessness(event.target.value === '' ? '' : Number(event.target.value));
        };

         const handleInputChangeNotes = (event) => {
            setNotes(event.target.value);
        };
        const handleInputChangeTitle = (event) => {
            setTitle(event.target.value);
        };
        const handleInputChangeArtist = (event) => {
            setArtist(event.target.value);
        };
        const handleInputChangeGenre = (event) => {
            setGenre(event.target.value);
        };
        const handleInputChangeRelease_Date = (event) => {
            setReleaseDate(event.target.value);
        };

        const showArray = (event) => {
            console.log("array" + songScoresArr)
            console.log("array2" + songScores1)
        }


        const handleUpdate = (e) => {
            console.log("title   " + title + "  profile   " + profile + "  artist   " + artist + "  genre   " + genre + "  releaseDate   " + releaseDate + "  coverPhoto   " + coverPhoto + "  originality   " + originality + "  flow   " + flow + "  lyrics   " + lyrics + "  howCaptivating   " + howCaptivating + "  timelessness   " + timelessness + "  notes  " + notes)
            e.preventDefault();
            const totalScore = (originality + flow + lyrics + howCaptivating + timelessness)/5
            //console.log("date: " + date + " TS: " + totalScore + " notes: " + notes)

            //Post album rating

            axios.post("/rating/add",
                {date: time, total_score: totalScore, notes: notes} ).then((res) => {
                console.log(res)
            });

            //add tracks to database

            setSongScores1(songScoresArr)
            console.log(setSongScores1)
            {results.tracks.data.map((item, key) => {
                if(songScores1[key] != null){
                    axios.post("/song/add",
                    {title: item.title, artist: results.artist.name, id: item.id, score: songScores1[key], profile: profile} )
                }
            })
            
            };

            //formulate tracks into 

            {results.tracks.data.map((item, key) => (
                arr.push(item.id)
            ))}
            const ratings = [time]
            axios.post("/album/add", 
                {title: title, profile: profile, artist: artist, genre: genre, release_date: releaseDate, cover_photo: coverPhoto, originality: originality, flow: flow, lyrics: lyrics, how_captivating: howCaptivating, timelessness: timelessness, notes: notes, ratings: ratings, songs: arr} ).then((res) => {
                    console.log(res)
                    navigate(`/homepage/${profile}`);
                });
    }



    useEffect(() => {
        const URL = `https://album-rater-backend.herokuapp.com/deezer/albumid/${params.albumId}`
    
        const GetAlbum = async () => {

            const res = await axios({
                method: 'get',
                url: URL,
                headers: {
                  'Access-Control-Allow-Origin': '*',
                },
            });
            setResults(res.data)
            setTitle(res.data.title)
            setArtist(res.data.artist.name)
            setGenre(res.data.genres.data[0].name)
            setReleaseDate(res.data.release_date)
            setCoverPhoto(res.data.cover_big)
            
            setSongScores1(songScoresArr)
            console.log("SongScores " + songScores)
            console.log(res.data)
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
        <NavBar />
        <header className="App-header">
            <img src= {results.cover}/>
            {!displayDetails && (
                <div className="albumInfo">
                    <p> {results.title}</p>
                    <p> {results.artist.name}</p>
                    <p> {results.release_date}</p>
                    <p> {results.genres.data[0].name}</p>
                </div>
            )}



            {displayDetails && (
                <div className="changeDetails">
                    <div className="change_details_items">
                        <Grid container spacing={2} alignItems="center">
                            <TextField id="standard-basic" label="Title" variant="standard" onChange={handleInputChangeTitle} defaultValue={results.title}/>
                        </Grid>
                    </div>
                    <div className="change_details_items">
                        <Grid container spacing={2} alignItems="center">    
                            <TextField id="standard-basic" label="Artist" variant="standard" onChange={handleInputChangeArtist} defaultValue={results.artist.name} />
                        </Grid>
                    </div>
                    <div className="change_details_items">
                        <Grid container spacing={2} alignItems="center">
                            <TextField id="standard-basic" label="Release Date" variant="standard" onChange={handleInputChangeRelease_Date} defaultValue={results.release_date}/>
                        </Grid>
                    </div>
                    <div className="change_details_items">
                        <Grid container spacing={2} alignItems="center">
                            <TextField id="standard-basic" label="Genre" variant="standard" onChange={handleInputChangeGenre} defaultValue={results.genres.data[0].name}/>
                        </Grid>
                    </div>
                </div>
            )}

            <div className="boxTitle" onClick={toggle}>
                Change Details
            </div>

            <div className="boxTitle" onClick={toggleSongs}>
                Show Songs
            </div>

            <div className="boxTitle" onClick={showArray}>
                Show array
            </div>
            

            {displaySongs && (
                <>
               <h1>Rate Songs</h1>
               {results.tracks.data.map((item, key) => (
                    <Box sx={{ width: 250 }}>
                        <Grid container spacing={2} alignItems="center">
                                <Grid item xs>
                                    <Typography id="song-input" gutterBottom>
                                        {item.title}
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Input
                                        defaultValue={songScores1[key]}
                                        //value={songScores[key]}
                                        size="small"
                                        onChange= {songScoresArr = songScores1, (e) => songScoresArr[key] = e.target.value}
                                        inputProps={{
                                        step: 1,
                                        min: 0,
                                        max: 10,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                        }}
                                    />
                                </Grid>
                        </Grid>
                   </Box>
                ))
                }
            </>
            )}


            {!displaySongs && (
            <div className="rating">
                <h1>Rate Album</h1>
                <div className="Originality">
                    <Typography id="input-slider" gutterBottom>
                        Originality
                    </Typography>
                    <Box sx={{ width: 250 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs>
                            <Slider
                                value={typeof originality === 'number' ? originality : 50}
                                onChange={handleSliderChangeOriginality}
                                aria-labelledby="input-slider"
                            />
                            </Grid>
                            <Grid item>
                            <Input
                                value={originality}
                                size="small"
                                onChange={handleInputChangeOriginality}
                                //onBlur={handleBlur}
                                inputProps={{
                                step: 5,
                                min: 0,
                                max: 100,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                                }}
                            />
                            </Grid>
                        </Grid>
                    </Box>
                </div>

                <div className="Flow">
                    <Typography id="input-slider" gutterBottom>
                        Flow
                    </Typography>
                    <Box sx={{ width: 250 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs>
                            <Slider
                                value={typeof flow === 'number' ? flow : 50}
                                onChange={handleSliderChangeFlow}
                                aria-labelledby="input-slider"
                            />
                            </Grid>
                            <Grid item>
                            <Input
                                value={flow}
                                size="small"
                                onChange={handleInputChangeFlow}
                                //onBlur={handleBlur}
                                inputProps={{
                                step: 5,
                                min: 0,
                                max: 100,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                                }}
                            />
                            </Grid>
                        </Grid>
                    </Box>
                </div>

                <div className="Lyrics">
                    <Typography id="input-slider" gutterBottom>
                        Lyrics
                    </Typography>
                    <Box sx={{ width: 250 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs>
                            <Slider
                                value={typeof lyrics === 'number' ? lyrics : 50}
                                onChange={handleSliderChangeLyrics}
                                aria-labelledby="input-slider"
                            />
                            </Grid>
                            <Grid item>
                            <Input
                                value={lyrics}
                                size="small"
                                onChange={handleInputChangeLyrics}
                                //onBlur={handleBlur}
                                inputProps={{
                                step: 5,
                                min: 0,
                                max: 100,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                                }}
                            />
                            </Grid>
                        </Grid>
                    </Box>
                </div>

                <div className="HowCaptivating">
                    <Typography id="input-slider" gutterBottom>
                        HowCaptivating
                    </Typography>
                    <Box sx={{ width: 250 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs>
                            <Slider
                                value={typeof howCaptivating === 'number' ? howCaptivating : 50}
                                onChange={handleSliderChangeHowCaptivating}
                                aria-labelledby="input-slider"
                            />
                            </Grid>
                            <Grid item>
                            <Input
                                value={howCaptivating}
                                size="small"
                                onChange={handleInputChangeHowCaptivating}
                                //onBlur={handleBlur}
                                inputProps={{
                                step: 5,
                                min: 0,
                                max: 100,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                                }}
                            />
                            </Grid>
                        </Grid>
                    </Box>
                </div>

                <div className="Timelessness">
                    <Typography id="input-slider" gutterBottom>
                        Timelessness
                    </Typography>
                    <Box sx={{ width: 250 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs>
                            <Slider
                                value={typeof timelessness === 'number' ? timelessness : 50}
                                onChange={handleSliderChangeTimelessness}
                                aria-labelledby="input-slider"
                            />
                            </Grid>
                            <Grid item>
                            <Input
                                value={timelessness}
                                size="small"
                                onChange={handleInputChangeTimelessness}
                                //onBlur={handleBlur}
                                inputProps={{
                                step: 5,
                                min: 0,
                                max: 100,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                                }}
                            />
                            </Grid>
                        </Grid>
                    </Box>
                </div>
                <div className="notes">
                    <Box sx={{ width: 250 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs>
                            <TextField id="outlined-multiline-flexible" color="info" label="Notes" variant="outlined" multiline onChange={handleInputChangeNotes} />
                            </Grid>
                        </Grid>
                    </Box>
                </div>
                <Button variant="Contained" onClick = {handleUpdate}>Submit Rating</Button>
            </div>
            )}
        </header>
    </div>
    )
}

export default AddAlbum