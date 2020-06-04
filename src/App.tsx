import React from 'react';
import ReactGA from 'react-ga';
import logo from './logo.svg';
import './App.css';


// Google analytics
ReactGA.initialize('UA-168532476-1', { testMode: true });
ReactGA.pageview('/homepage');


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          The beginning of HyperPlanner!
        </p>
      </header>
    </div>
  );
}

export default App;
