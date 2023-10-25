import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import HomePage from './components/homepage';
import NewAlbum from './components/newAlbum';
import AddAlbum from './components/addAlbum';
import AlbumDetails from './components/albumDetails';
import SongDetails from './components/songDetails';
import ProfileDetails from './components/profileDetails';
import CreateAccount from './components/createAccount';
import AddFriends from './components/addFriends';


class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/homepage/:profile" element={<HomePage/>} />
          <Route path="/newalbum/:album" element={<NewAlbum/>} />
          <Route path="/addalbum/:albumId" element={<AddAlbum/>} />
          <Route path="/albumdetails/:albumId" element={<AlbumDetails/>} />
          <Route path="/songdetails/:songId" element={<SongDetails/>} />
          <Route path="/profiledetails" element={<ProfileDetails/>} />
          <Route path="/createAccount" element={<CreateAccount/>} />
          <Route path="/addfriends" element={<AddFriends/>} />
        </Routes>
      </Router>
    );
  }
}


export default App;