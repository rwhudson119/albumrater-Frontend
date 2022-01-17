import logo from './album_logo.png';
import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import HomePage from './components/homepage';
import Genres from './SpotifyAPITutorial/SpotifyGenres';
import TestPage from './components/testPage';


class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/homepage/:profile" element={<HomePage/>} />
          <Route path="/testpage" element={<TestPage/>} />
        </Routes>
      </Router>
    );
  }
}

export default App;