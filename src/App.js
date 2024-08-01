import './App.css';
import React, {useState, useEffect} from 'react';
import { WeatherModule } from './weatherinfo.js';

function App() {
  const [location,setLocation] = useState("");

  function changeLocation() {
    setLocation(document.querySelector('#location-input').value);
  }

  const handleEnter = (event) => {
    if(event.key === "Enter"){
      document.querySelector('#submit-button').click();
    }
  }

  const handleSubmit = () => {
    //fetchWeatherInfo(document.querySelector('#location-input').textContent);
    changeLocation();
  }

  return (
    <div className="App">
      <div className="App-header"><img src="./favicon.ico" alt="icon"></img>Weather</div>
      <div className="App-content">
        <div className="search-bar">
          <input id="location-input" type="text" placeholder={location} onKeyDown={handleEnter}></input>
          <button id="submit-button" onClick={handleSubmit}></button>
        </div>
        <WeatherModule location={location}></WeatherModule>
      </div>
    </div>
  );
}

export default App;
