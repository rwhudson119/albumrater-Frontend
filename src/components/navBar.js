import { useState } from "react";
import React from "react";
import logo from '../album_logo.png';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';



var profile = localStorage.profile


function NavBar() {
 
 
  const navigate  = useNavigate ();

/* VISUALS
import { alpha, styled } from '@mui/material/styles';
import classes from '@mui/material/StepConnector/stepConnectorClasses';
  const styles = theme => ({
        multilineColor:{
            color:'red'
        }
    });

    const CssTextField = styled(TextField)({
        '& label.Mui-focused': {
            color: 'white',
          },
        
        '& .MuiInput-underline:after': {
          borderBottomColor: 'green',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'white',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'white',
          },
        },
      }); 


const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});*/

    const [search, setSearch] = useState("");


    const onChangeSearch = (e) => {
        const search = e.target.value;
        setSearch(search)
    }


    return (
        <div className="App">
            <nav className="nav-bar">
                
                <h1 className = "nav-logo"><a href={`/homepage/${profile}`}><img src={logo} className="nav-logo-2" alt="logo" /></a></h1>
                <TextField 
                id="standard-basic" 
                onKeyPress={(ev) => {
                  if (ev.key === 'Enter' && search !== "") {
                    console.log("SEARCHING... " + search)
                    navigate(`/newalbum/${search}`);
                    ev.preventDefault();
                    window.location.reload();
                  }
                }}
                sx={{ label: { color: 'white' }}} 
                label="Add Album" 
                variant="outlined" 
                onChange={onChangeSearch}/>
                
                <ul class="nav-links">
                    <li><a href={`/profiledetails/`}>Profile</a></li>
                    <li><a href={`/`}>Logout</a></li>
                    
                </ul>
            </nav>
        </div>
    )
}




export default NavBar;