import React, { useState, useEffect, PureComponent } from "react";
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
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import urlencode from 'urlencode';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import Foot from './footer';



const Input = styled(MuiInput)`
width: 42px;
`;


const AlbumDetails = (props) => {



    const [displayDetails, setDisplayDetails] = useState(false);
      
    function toggle() {
        setDisplayDetails(wasDetails => !wasDetails);
    }

    const [displaySongs, setDisplaySongs] = useState(false);

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
    const [ratingData, setRatingData] = useState([]);

    const ratingDataTesttt = [{name: '15/03/2022, 12:08:43', score: 65.8}, {name: '15/03/2022, 12:09:43', score: 60.8}]

    const [averageRating, setAverageRating] = useState(0);


    const profile = localStorage.profile
    const navigate  = useNavigate ();
    var songArray = []


    function toggleSongs() {
        setDisplaySongs(wasSongs => !wasSongs);
        console.log(songArrayFinal)
    }


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

        const getAverageRating = (allUserAlbum) => {
            var totalRat = 0
            
            allUserAlbum.map((item, key) => (
                totalRat = totalRat + (item.originality + item.flow + item.lyrics + item.how_captivating + item.timelessness)/5
            ));
            setAverageRating(totalRat/allUserAlbum.length);
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

          const handleBlurTest = () => {
            songArray.map((item, key) => {
                if(item > 10){
                    songArray[key] = "10"
                }if(item < 0){
                    songArray[key] = "0"
                }
                return 0
            })
            setSongArrayFinal(songArray)
            return 0
          }



        const handleUpdate = (e) => {
            e.preventDefault();
            const totalScore = (originality + flow + lyrics + howCaptivating + timelessness)/5
            axios.post("/rating/add",
                {date: time, total_score: totalScore, notes: notes} ).then((res) => {
            });

            console.log("songs: " + songArrayFinal)

            songArrayFinal.map((item, key) => (
                axios.post(`/song/update/${item._id}`, 
                {score: item.score} ).then((res) => {
                })))


            var ratings = []
            album.ratings.map((item, key) => (
                ratings.push(item)
            ))
            ratings.push(time)
            axios.post(`/album/update/${params.albumId}`, 
                {title: title, artist: artist, genre: genre, release_date: release_date, originality: originality, flow: flow, lyrics: lyrics, how_captivating: howCaptivating, timelessness: timelessness, ratings: ratings, notes: notes} ).then((res) => {
                    navigate(`/homepage/${profile}`);
                });
    }

    class CustomizedLabel extends PureComponent {
        render() {
          const { x, y, stroke, value } = this.props;
      
          return (
            <text className="graphText" x={x} y={y} dy={-4} fill={stroke} stroke="white" strokeWidth=".5px" textAnchor="middle">
              {value}
            </text>
          );
        }
      }


    useEffect(() => {


        const getSongData = async (albumSongs) => {
            console.log("GETTING SONGS")
            var songArrayTest = []
            albumSongs.map((item, key) => (
                axios.get(`/song/${item}`)
                .then((res) => {
                    songArrayTest[key] = res.data
                    console.log(res.data)
                })

            ))
            setSongArrayFinal(songArrayTest)
            console.log("got SONGS")
            console.log(songArrayTest)
        }

        const getAllAlbumData = async (title) => {
            await axios({
                method: 'get',
                url: `/album/allAlbumsTitle/${title}`,
                headers: {
                  'Access-Control-Allow-Origin': '*',
                },
            }).then((res) => {
                getAverageRating(res.data)
                
            })
        }

        const getRating = async (rating) => {
            await axios({
                method: 'get',
                url: `/rating/date/${urlencode(rating)}`,
                headers: {
                'Access-Control-Allow-Origin': '*',
                },
            }).then((res) => {
                console.log(res.data.total_score) 
                var ratingDataTest = ratingData
                ratingDataTest.push({name: rating.split(' ')[0], score: res.data.total_score})
                setRatingData(ratingDataTest)

            })
        }

        const getAllRatings = async (ratings) => {
            ratings.map((rating, key) => (
                getRating(rating)
            ))
            var ratingDataSorted = ratingData
            ratingDataSorted.sort((a, b) => {
                return new Date(a.name) - new Date(b.name);
            });
            setRatingData(ratingDataSorted)
            console.log("Sorted")
            console.log(ratingDataSorted)
        }
        


        const getAlbumData = async () => {
            await axios({
                method: 'get',
                url: `/album/oneAlbum/${params.albumId}`,
                headers: {
                  'Access-Control-Allow-Origin': '*',
                },
            }).then((res) => {
                getAllRatings(res.data.ratings)
                setAlbum(res.data);
                setOriginality(res.data.originality)
                setFlow(res.data.flow)
                setLyrics(res.data.lyrics)
                setHowCaptivating(res.data.how_captivating)
                setTimelessness(res.data.timelessness)
                setTitle(res.data.title)
                setArtist(res.data.artist)
                setGenre(res.data.genre)
                setNotes(res.data.notes)
                setRelease_Date(res.data.release_date)
                getSongData(res.data.songs)
                getAllAlbumData(res.data.title)
                
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
            <img className="album_deets_image" src= {album.cover_photo} alt= ""/>
            {!displayDetails && (
                <div className="albumInfo">
                    <p> {album.title}</p>
                    <p> {album.artist}</p>
                    <p> {album.release_date}</p>
                    <p> {album.genre}</p>
                    <div className="alterDetails" onClick={toggle}>
                        <SettingsSuggestIcon />
                    </div>
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
                    <div className="boxTitle" onClick={toggle}>
                        Done
                    </div>
                </div>
            )}

            <div className="alterDetails" onClick={toggleSongs}>
                <p>Rate songs</p>
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
                                         onBlur={handleBlurTest}
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
                <p>Current Total: {((originality + flow + lyrics + howCaptivating + timelessness)/5).toFixed(2)} </p>
                {averageRating !== 0 && (
                    <p>Average Rating {averageRating.toFixed(2)}</p>
                )}
                <div className="notes">
                    <Box sx={{ width: 250 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs>


                            <TextField id="outlined-multiline-flexible" value={notes} label="Notes" inputProps={{ style: { color: "white" } }} multiline focused onChange={handleInputChangeNotes} />
                            </Grid>
                        </Grid>
                    </Box>
                </div>
                <Button variant="text" onClick = {handleUpdate}>Update Rating</Button>
                
            </div>
            )}

            {ratingData[1] && (
                console.log("DADTATD"),
                 console.log(ratingData),
                 console.log(ratingDataTesttt),
                <>
                    <LineChart width={500} height={300} data={ratingData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{fontSize: "15px"}} padding={{ left: 10, right: 10 }}/>
                        <YAxis yAxisId="left" domain={[0, 100]} tick={{fontSize: "18px"}}/>
                        <Line yAxisId="left" type="Cardinal" dataKey= "score" stroke="#1976d2" strokeWidth="3px" label={<CustomizedLabel />}/>
                    </LineChart>
                </>
            )}
           
                            
        </header>
        <Foot />
    </div>
    )
} 


export default AlbumDetails