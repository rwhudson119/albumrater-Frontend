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



const Input = styled(MuiInput)`
width: 42px;
`;


const AddAlbum = (props) => {

    let params = useParams()
    const time = new Date().toLocaleString()


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

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    const profile = localStorage.profile
    const navigate  = useNavigate ();
    var arr = [];
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



        const handleUpdate = (e) => {
            console.log("title   " + title + "  profile   " + profile + "  artist   " + artist + "  genre   " + genre + "  releaseDate   " + releaseDate + "  coverPhoto   " + coverPhoto + "  originality   " + originality + "  flow   " + flow + "  lyrics   " + lyrics + "  howCaptivating   " + howCaptivating + "  timelessness   " + timelessness + "  notes  " + notes)
            e.preventDefault();
            const totalScore = (originality + flow + lyrics + howCaptivating + timelessness)/5
            //console.log("date: " + date + " TS: " + totalScore + " notes: " + notes)
            axios.post("/rating/add",
                {date: time, total_score: totalScore, notes: notes} ).then((res) => {
                console.log(res)
            });
            {results.tracks.data.map((item, key) => (
                axios.post("/song/add",
                {title: item.title, artist: results.artist.name, id: item.id} )
                ))
            };

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
        const URL = `https://api.deezer.com/album/${params.albumId}`
    
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
            setCoverPhoto(res.data.cover)
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
        <header className="App-header">
            <img src= {results.cover}/>
            <p> {results.title}</p>
            <p> {results.artist.name}</p>
            <p> {results.release_date}</p>
            <p> {results.genres.data[0].name}</p>
            <div className="rating">
                <h1>Rate it</h1>
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
        </header>
    </div>
    )
}

export default AddAlbum