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
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import NavBar from './navBar';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

import Foot from './footer';



const Input = styled(MuiInput)`
width: 42px;
`;


const AddAlbum = (props) => {

    let params = useParams()
    const time = new Date().toLocaleString()


    const [displayDetails, setDisplayDetails] = useState(false);
    const [toQueue, setToQueue] = useState(true);
      
    function toggle() {
        setDisplayDetails(wasDetails => !wasDetails);
    }
    function toggleQueue() {
        setToQueue(wasQueue => !wasQueue);
    }

    const [displaySongs, setDisplaySongs] = useState(false);


    const [results, setResults] = useState(null);
    const [artist, setArtist] = useState("");

    const [country, setCountry] = useState("");

    const [title, setTitle] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [coverPhoto, setCoverPhoto] = useState("");
    const [genre, setGenre] = useState("");
    const [artwork, setArtwork] = useState(5);
    const [originality, setOriginality] = useState(50);
    const [flow, setFlow] = useState(50);
    const [lyrics, setLyrics] = useState(50);
    const [howCaptivating, setHowCaptivating] = useState(50);
    const [timelessness, setTimelessness] = useState(50);
    const [music, setMusic] = useState(50);
    const [delivery, setDelivery] = useState(50);
    const [expectation, setExpectation] = useState(50);
    const [notes, setNotes] = useState("");

    const [songScores, setSongScores] = useState([]);
    //const [songDuration, setSongDuration] = useState([]);
    //const [totalDuration, setTotalDuration] = useState(null);



    const profile = localStorage.profile
    const navigate  = useNavigate ();
    var arr = [];
    var songScoresArr = [];
    
    function toggleSongs() {
        setDisplaySongs(wasSongs => !wasSongs);
    }
  
    const handleSliderChangeArtwork = (event, newValue) => {
        setArtwork(newValue);
    };

    const handleInputChangeArtwork = (event) => {
        setArtwork(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleSliderChangeExpectation = (event, newValue) => {
        setExpectation(newValue);
    };

    const handleInputChangeExpectation = (event) => {
        setExpectation(event.target.value === '' ? '' : Number(event.target.value));
    };


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

    const handleSliderChangeDelivery = (event, newValue) => {
        setDelivery(newValue);
    };

    const handleInputChangeDelivery = (event) => {
        setDelivery(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleSliderChangeMusic = (event, newValue) => {
        setMusic(newValue);
    };

    const handleInputChangeMusic = (event) => {
        setMusic(event.target.value === '' ? '' : Number(event.target.value));
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

    /*const handleInputChangeCountry = (event) => {
        setCountry(event.target.value);
    };*/


    const handleInputChangeRelease_Date = (event) => {
        setReleaseDate(event.target.value);
    };


    const handleBlurArtwork = () => {
        if (artwork < 0) {
            setArtwork(0);
        } else if (artwork > 10) {
            setArtwork(10);
        }
    };

    const handleBlurExpectation = () => {
        if (expectation < 0) {
            setExpectation(0);
        } else if (expectation > 100) {
            setExpectation(100);
        }
    };


    const handleBlurOriginality = () => {
        if (originality < 0) {
            setOriginality(0);
        } else if (originality > 100) {
            setOriginality(100);
        }
    };
    const handleBlurFlow = () => {
        if (flow < 0) {
            setFlow(0);
        } else if (flow > 100) {
            setFlow(100);
        }
    };
    const handleBlurLyrics = () => {
        if (lyrics < 0) {
            setLyrics(0);
        } else if (lyrics > 100) {
            setLyrics(100);
        }
    };
    const handleBlurHowCaptivating = () => {
        if (howCaptivating < 0) {
            setHowCaptivating(0);
        } else if (howCaptivating > 100) {
            setHowCaptivating(100);
        }
    };
    const handleBlurTimelessness = () => {
        if (timelessness < 0) {
            setTimelessness(0);
        } else if (timelessness > 100) {
            setTimelessness(100);
        }
    };

    const handleBlurDelivery = () => {
        if (delivery < 0) {
            setDelivery(0);
        } else if (delivery > 100) {
            setDelivery(100);
        }
    };

    const handleBlurMusic = () => {
        if (music < 0) {
            setMusic(0);
        } else if (music > 100) {
            setMusic(100);
        }

    };

    const handleInputChangeCountry = (event) => {
        setCountry(event.target.value);
    };



        const handleBlurSongs = () => {
            songScoresArr.map((item, key) => {
                if(item > 10){
                    songScoresArr[key] = "10"
                }if(item < 0){
                    songScoresArr[key] = "0"
                }
                return 0
            })

            setSongScores(songScoresArr)
        }

        /*
        const setSongsDuration = (results, songDurationArr) => {
            var totalDur = 0
            results.tracks.data.map((item, key) => {
                songDurationArr[key] = item.duration
                totalDur = totalDur + item.duration
                return 0
            })
            setSongDuration(songDurationArr)
            setTotalDuration(totalDur)
        }*/



        const handleUpdate = (e) => {
            //console.log("title   " + title + "  profile   " + profile + "  artist   " + artist + "  country   " + country + "  genre   " + genre + "  releaseDate   " + releaseDate + "  coverPhoto   " + coverPhoto + "  art   " + artwork + "  expectation   " + expectation + "  originality   " + originality + "  flow   " + flow + "  lyrics   " + lyrics + "  howCaptivating   " + howCaptivating + "  timelessness   " + timelessness + "  Delivery   " + delivery + "  Music   " + music + "  notes  " + notes)
            e.preventDefault();
            const totalScore = (originality + flow + lyrics + howCaptivating + timelessness + delivery + music)/7


                //Post album rating

            if(toQueue === true){
                axios.post("/album/add", 
                {title: title, profile: profile, artist: artist, genre: genre, release_date: releaseDate, cover_photo: coverPhoto, artwork: artwork, expectation: expectation, in_queue: "yes", songs: arr} ).then((res) => {
                    console.log(res)
                    navigate(`/homepage/${profile}`);
                });
            }else{

                axios.post("/rating/add",
                    {date: time, total_score: totalScore, notes: notes} ).then((res) => {
                    console.log(res)

                });

                //add tracks to database

                setSongScores(songScoresArr)
                results.tracks.data.map((item, key) => {
                    if(songScores[key] === null){
                        songScores[key] = -1
                    }
                    axios.post("/song/add",
                        {title: item.title, artist: results.artist.name, id: item.id, score: songScores[key], profile: profile} )
                    return 0;
                });

            }

            //formulate tracks into array

            results.tracks.data.map((item, key) => (
                arr.push(item.id)
            ))
            const ratings = [time]
            axios.post("/album/add", 
                {title: title, profile: profile, artist: artist, genre: genre, release_date: releaseDate, cover_photo: coverPhoto, artwork: artwork, expectation: expectation, originality: originality, flow: flow, lyrics: lyrics, how_captivating: howCaptivating, timelessness: timelessness, delivery: delivery, music: music, notes: notes, ratings: ratings, in_queue: "no", songs: arr} ).then((res) => {
                    console.log(res)
                    navigate(`/homepage/${profile}`);
                });

        return 0
    }



    useEffect(() => {
      
        const GetAlbum = async () => {
            axios.get(`/deezer/albumid/${params.albumId}`).then((res) => {
                setResults(res.data)
                setTitle(res.data.title)
                setArtist(res.data.artist.name)
                setGenre(res.data.genres.data[0].name)
                setReleaseDate(res.data.release_date)
                setCoverPhoto(res.data.cover_big)
                setSongScores(songScoresArr)
                if((title === "" || artist === "" || genre === ""|| releaseDate === "") === ""){
                  toggle()
                }
                console.log(res.data)
            });
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
            <img className="album_deets_image" src= {results.cover} alt= ""/>

            <div className="Artwork">
                    <Typography id="input-slider" gutterBottom>
                        Artwork
                    </Typography>
                    <Box sx={{ width: 250 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs>
                            <Slider
                                value={typeof artwork === 'number' ? artwork : 5}
                                max={10}
                                onChange={handleSliderChangeArtwork}
                                aria-labelledby="input-slider"
                            />
                            </Grid>
                            <Grid item>
                            <Input
                                value={artwork}
                                size="small"
                                onChange={handleInputChangeArtwork}
                                onBlur={handleBlurArtwork}
                                inputProps={{
                                    style: { color: "white" },
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
                </div>

            {!displayDetails && (
                <div className="albumInfo">
                    <p> {results.title}</p>
                    <p> {results.artist.name}</p>
                    <p> {results.release_date}</p>
                    <p> {results.genres.data[0].name}</p>
                    <div className="alterDetails">
                        <Button onClick={toggle}><SettingsSuggestIcon /></Button>

                    </div>
                </div>
            )}



            {displayDetails && (
                <div className="changeDetails">
                    <div className="change_details_items">
                        <Grid container spacing={2} alignItems="center">
                            <TextField id="standard-basic" label="Title" variant="standard" onChange={handleInputChangeTitle} defaultValue={title}/>
                        </Grid>
                    </div>
                    <div className="change_details_items">
                        <Grid container spacing={2} alignItems="center">    
                            <TextField id="standard-basic" label="Artist" variant="standard" onChange={handleInputChangeArtist} defaultValue={artist} />
                        </Grid>
                    </div>
                    <div className="change_details_items">
                        <Grid container spacing={2} alignItems="center">
                            <TextField id="standard-basic" label="Country" variant="standard" onChange={handleInputChangeCountry} defaultValue={country}/>
                        </Grid>
                    </div>
                    <div className="change_details_items">
                        <Grid container spacing={2} alignItems="center">
                            <TextField id="standard-basic" label="Release Date" variant="standard" onChange={handleInputChangeRelease_Date} defaultValue={releaseDate}/>
                        </Grid>
                    </div>
                    <div className="alterDetails">
                        <Button onClick={toggle}>Abandon</Button>

                    </div>
                </div>
                
            )}

                <div className="Expectation">
                    <Typography id="input-slider" gutterBottom>
                        Expectation
                    </Typography>
                    <Box sx={{ width: 250 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs>
                            <Slider
                                value={typeof expectation === 'number' ? expectation : 50}
                                onChange={handleSliderChangeExpectation}
                                aria-labelledby="input-slider"
                            />
                            </Grid>
                            <Grid item>
                            <Input
                                value={expectation}
                                size="small"
                                onChange={handleInputChangeExpectation}
                                onBlur={handleBlurExpectation}
                                inputProps={{
                                    style: { color: "white" },
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

 
                <FormControlLabel control={<Switch defaultChecked onChange={toggleQueue}/>} label="Send to Queue" />
            
            {!toQueue && (
                <>
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
                                            defaultValue={songScores[key]}
                                            size="small"
                                            onChange= {songScoresArr = songScores, (e) => songScoresArr[key] = e.target.value}
                                            onBlur={handleBlurSongs}
                                            inputProps={{
                                                style: { color: "white" },
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
                    <div className="alterDetails">
                        <Button onClick={toggleSongs}><p>Back to Album</p></Button>
                    </div>
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
                                    onBlur={handleBlurOriginality}
                                    inputProps={{
                                        style: { color: "white" },
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
                                    onBlur={handleBlurFlow}
                                    inputProps={{
                                        style: { color: "white" },
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
                                    value={typeof lyrics === 'number' ? lyrics : 0}
                                    onChange={handleSliderChangeLyrics}
                                    aria-labelledby="input-slider"
                                />
                                </Grid>
                                <Grid item>
                                <Input
                                    value={lyrics}
                                    size="small"
                                    onChange={handleInputChangeLyrics}
                                    onBlur={handleBlurLyrics}
                                    inputProps={{
                                        style: { color: "white" },
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
                                    value={typeof howCaptivating === 'number' ? howCaptivating : 0}
                                    onChange={handleSliderChangeHowCaptivating}
                                    aria-labelledby="input-slider"
                                />
                                </Grid>
                                <Grid item>
                                <Input
                                    value={howCaptivating}
                                    size="small"
                                    onChange={handleInputChangeHowCaptivating}
                                    onBlur={handleBlurHowCaptivating}
                                    inputProps={{
                                        style: { color: "white" },
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
                                    onBlur={handleBlurTimelessness}
                                    inputProps={{
                                        style: { color: "white" },
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

                    <div className="Delivery">
                        <Typography id="input-slider" gutterBottom>
                            Delivery
                        </Typography>
                        <Box sx={{ width: 250 }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs>
                                <Slider
                                    value={typeof delivery === 'number' ? delivery : 50}
                                    onChange={handleSliderChangeDelivery}
                                    aria-labelledby="input-slider"
                                />
                                </Grid>
                                <Grid item>
                                <Input
                                    value={delivery}
                                    size="small"
                                    onChange={handleInputChangeDelivery}
                                    onBlur={handleBlurDelivery}
                                    inputProps={{
                                        style: { color: "white" },
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

                    <div className="Music">
                        <Typography id="input-slider" gutterBottom>
                            Music
                        </Typography>
                        <Box sx={{ width: 250 }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs>
                                <Slider
                                    value={typeof music === 'number' ? music : 50}
                                    onChange={handleSliderChangeMusic}
                                    aria-labelledby="input-slider"
                                />
                                </Grid>
                                <Grid item>
                                <Input
                                    value={music}
                                    size="small"
                                    onChange={handleInputChangeMusic}
                                    onBlur={handleBlurMusic}
                                    inputProps={{
                                        style: { color: "white" },
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
                                <TextField id="outlined-multiline-flexible" value={notes} label="Notes" onChange={handleInputChangeNotes} inputProps={{ style: { color: "white" } }} multiline focused />
                                </Grid>
                            </Grid>
                        </Box>
                    </div>
                    <div className="alterDetails">
                        <Button onClick={toggleSongs}><p>Rate songs</p></Button>
                    </div>
                </div>
                )}
                </>
            )}
            <Button variant="text" onClick = {handleUpdate}>Submit Rating</Button>

        </header>
        <Foot />
    </div>
    )
}

export default AddAlbum