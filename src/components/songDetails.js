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
import Foot from './footer';




const Input = styled(MuiInput)`
width: 42px;
`;


const SongDetails = (props) => {


    let params = useParams()

    const [song, setSong] = useState("");
    const [score, setScore] = useState(5);
    const [parentAlbum, setParentAlbum] = useState({});

    var tempParentAlbum = [];
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


    const getSongData = async (albarr) => {
        axios.get(`/song/${params.songId}`)
        .then((res) => {
            console.log(res.data)
            
            setSong(res.data)
            setScore(res.data.score)
            getDaddyAlbum(res.data);
        })
        console.log(song)
    }
    
    const findChildSong = (albumArray, song) => {
        console.log(song)
        albumArray.map((item) => {
            var songArray = item.songs
            
            if(songArray.indexOf(song.id.toString()) > -1) {
                tempParentAlbum.push(item);
            }
        })
        setParentAlbum(tempParentAlbum[0])
    }

    const getDaddyAlbum = async (song) => {
        axios.get(`/album/${localStorage.profile}`)
        .then((res) => {
            findChildSong(res.data, song)
        })
    }
    

    useEffect(() => {

        

        getSongData();
        
        
        
        
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
    if(parentAlbum == null){
        console.log("Returning null");
    return null;
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
            
            <Typography id="input-slider" gutterBottom>
                    From: 
                    <a href={`/albumdetails/${parentAlbum._id}`}>
                    <div> 
                        <p>{parentAlbum.title}</p>
                    </div>
                </a>
                </Typography>
        
        </header>
        <Foot />
    </div>
    )
} 


export default SongDetails