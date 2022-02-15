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


const AlbumDetails = (props) => {



    const [displayDetails, setDisplayDetails] = useState(false);
      
    function toggle() {
        setDisplayDetails(wasDetails => !wasDetails);
    }

    const [displaySongs, setDisplaySongs] = useState(false);
      
    function toggleSongs() {
        setDisplaySongs(wasSongs => !wasSongs);
    }

    let params = useParams()
    const time = new Date().toLocaleString()

    const [album, setAlbum] = useState(null)
    const [notes, setNotes] = useState("");

    const [artist, setArtist] = useState("");
    const [title, setTitle] = useState("");
    const [release_date, setRelease_Date] = useState("");
    const [genre, setGenre] = useState("");
    const [originality, setOriginality] = useState(50);
    const [flow, setFlow] = useState(50);
    const [lyrics, setLyrics] = useState(50);
    const [howCaptivating, setHowCaptivating] = useState(50);
    const [timelessness, setTimelessness] = useState(50);
    const [songArrayFinal, setSongArrayFinal] = useState([]);


    const profile = localStorage.profile
    const navigate  = useNavigate ();
    var songArray = []





    const CssTextField = styled(TextField)({
            '& label.Mui-focused': {
                color: 'white',
            },
            '& label': {
                color: 'white',
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: 'white',
            },
            '& .MuiOutlinedInput-root': {
                borderColor: 'white',
            },
            '&.MuiInput-input': {
                color: 'white',
            }
      });






    

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
            setRelease_Date(event.target.value);
        };



        const handleUpdate = (e) => {
            e.preventDefault();
            const totalScore = (originality + flow + lyrics + howCaptivating + timelessness)/5
            axios.post("/rating/add",
                {date: time, total_score: totalScore, notes: notes} ).then((res) => {
                console.log(res)
            });

            console.log("songs: " + songArrayFinal)

            {songArrayFinal.map((item, key) => (
                console.log("HELLO"),
                console.log(item._id),
                axios.post(`/song/update/${item._id}`, 
                {score: item.score} ).then((res) => {
                    console.log(res)
                })))}


            var ratings = []
            {album.ratings.map((item, key) => (
                ratings.push(item)
            ))}
            ratings.push(time)
            console.log(originality + "   " + flow + "   " + lyrics + "   " + howCaptivating + "   " + timelessness + "   " + ratings)
            axios.post(`/album/update/${params.albumId}`, 
                {title: title, artist: artist, genre: genre, release_date: release_date, originality: originality, flow: flow, lyrics: lyrics, how_captivating: howCaptivating, timelessness: timelessness, ratings: ratings, notes: notes} ).then((res) => {
                    console.log(res)
                    navigate(`/homepage/${profile}`);
                });
    }

    useEffect(() => {


        const getSongData = async (albumSongs) => {
            console.log(albumSongs)
            {albumSongs.map((item, key) => (
                axios.get(`/song/${item}`)
                .then((res) => {
                    songArray[key] = res.data
                    //console.log("song: " + res.data.title + " score: " + res.data.score)
                })

            ))}
            console.log(songArray)
            setSongArrayFinal(songArray)
        }


        const getAlbumData = async () => {
            const res = await axios({
                method: 'get',
                url: `/album/oneAlbum/${params.albumId}`,
                headers: {
                  'Access-Control-Allow-Origin': '*',
                },
            }).then((res) => {
                setAlbum(res.data);
                setOriginality(res.data.originality)
                setFlow(res.data.flow)
                setLyrics(res.data.lyrics)
                setHowCaptivating(res.data.how_captivating)
                setTimelessness(res.data.timelessness)
                setTitle(res.data.title)
                setArtist(res.data.artist)
                setGenre(res.data.genre)
                setRelease_Date(res.data.release_date)
                getSongData(res.data.songs)
                console.log(res.data)
            });
        };


        getAlbumData()
    }, []);


    if (album == null){
        console.log("Returning null");
        return null;
    }
    if (album instanceof Error) {
        console.error(album);
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
            <img src= {album.cover_photo}/>
            {!displayDetails && (
                <div className="albumInfo">
                    <p> {album.title}</p>
                    <p> {album.artist}</p>
                    <p> {album.release_date}</p>
                    <p> {album.genre}</p>
                </div>
            )}
            
            {displayDetails && (
                <div className="changeDetails">
                    <div className="change_details_items">
                        <Grid container spacing={2} alignItems="center">
                            <TextField id="standard-basic" label="Title" variant="standard" onChange={handleInputChangeTitle} defaultValue={album.title}/>
                        </Grid>
                    </div>
                    <div className="change_details_items">
                        <Grid container spacing={2} alignItems="center">    
                            <TextField id="standard-basic" label="Artist" variant="standard" onChange={handleInputChangeArtist} defaultValue={album.artist} />
                        </Grid>
                    </div>
                    <div className="change_details_items">
                        <Grid container spacing={2} alignItems="center">
                            <TextField id="standard-basic" label="Release Date" variant="standard" onChange={handleInputChangeRelease_Date} defaultValue={album.release_date}/>
                        </Grid>
                    </div>
                    <div className="change_details_items">
                        <Grid container spacing={2} alignItems="center">
                            <TextField id="standard-basic" label="Genre" variant="standard" onChange={handleInputChangeGenre} defaultValue={album.genre}/>
                        </Grid>
                    </div>
                </div>
            )}

            <div className="boxTitle" onClick={toggle}>
                Change Details
            </div>

            <div className="boxTitle" onClick={toggleSongs}>
                Show songs
            </div>
                
            {displaySongs && (
                <>
                <h1>Rate Songs</h1>
                {songArrayFinal.map((item, key) => (
                     <Box sx={{ width: 250 }}>
                         <Grid container spacing={2} alignItems="center">
                                 <Grid item xs>
                                     <Typography id="song-input" gutterBottom>
                                         {item.title}
                                     </Typography>
                                 </Grid>
                                 <Grid item xs>
                                     <Input
                                         defaultValue={item.score}
                                         size="small"
                                         onChange={songArray = songArrayFinal, (e) => songArray[key].score = Number(e.target.value)}
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
                                defaultValue={album.originality}
                            />
                            </Grid>
                            <Grid item>
                            <Input
                                value={originality}
                                size="small"
                                onChange={handleInputChangeOriginality}
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
                            <TextField id="outlined-multiline-flexible" color="info" label="Notes" variant="outlined" multiline onChange={handleInputChangeNotes} defaultValue = {album.notes}/>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
                <Button variant="Contained" onClick = {handleUpdate}>Update Rating</Button>
            </div>
            )}
                            
        </header>
    </div>
    )
} 


export default AlbumDetails