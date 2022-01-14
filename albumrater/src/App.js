import logo from './album_logo10.png';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/login.js';

function App() {
  return (
    /*
    <>
      <Router>
        <Routes>
          <Route path="/login" exact component={HomePage} />
        </Routes>
      </Router>
      </>
      */

    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="/login"
          target="_blank"
          rel="noopener noreferrer"
        >
          Login
        </a>
      </header>
    </div>
  );
}

export default App;
