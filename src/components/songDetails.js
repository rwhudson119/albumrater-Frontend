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
import NavBar from './navBar';




const Input = styled(MuiInput)`
width: 42px;
`;


const SongDetails = (props) => {


    let params = useParams()

    const [song, setSong] = useState("");
    const [score, setScore] = useState(5);


    const profile = localStorage.profile
    const navigate  = useNavigate ();



        const handleSliderChangeScore = (event, newValue) => {
            setScore(newValue);
        };
        
        const handleInputChangeScore = (event) => {
            setScore(event.target.value === '' ? '' : Number(event.target.value));
        };


        const handleUpdate = (e) => {
            e.preventDefault();
            axios.post(`/song/update/${song._id}`, 
            {score: score} ).then((res) => {
                console.log(res)
            })
            navigate(`/homepage/${profile}`);

    }

    useEffect(() => {


        const getSongData = async () => {
                axios.get(`/song/${params.songId}`)
                .then((res) => {
                    setSong(res.data)
                    setScore(res.data.score)
                })
            console.log(song)
        }
        getSongData()

    }, []);


    if (song == null){
        console.log("Returning null");
        return null;
    }
    if (song instanceof Error) {
        console.error(song);
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
            <div className="albumInfo">
                <p> {song.title}</p>
                <p> {song.artist}</p>
            </div>



            <div className="Song details">
                <Typography id="input-slider" gutterBottom>
                    Change Score
                </Typography>
                <Box sx={{ width: 250 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs>
                        <Slider
                            value={typeof score === 'number' ? score : 5}
                            onChange={handleSliderChangeScore}
                            aria-labelledby="input-slider"
                            min={0}
                            max={10}
                        />
                        </Grid>
                        <Grid item>
                        <Input
                            value={score}
                            size="small"
                            onChange={handleInputChangeScore}
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
            </div>

            <Button variant="Contained" onClick = {handleUpdate}>Update Rating</Button>
        
        </header>
    </div>
    )
} 


export default SongDetails