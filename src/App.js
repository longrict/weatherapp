import './App.css';
import React, {useState} from 'react';
import { WeatherModule } from './weatherinfo.js';
import {fetchWeatherInfo} from './api.js';

function App() {
  const [location,setLocation] = useState(null);
  const [unknownLocation, setUnknownLocation] = useState("");

  async function changeLocation() {
    let data = await fetchWeatherInfo(document.querySelector('#location-input').value);
    console.log(data);
    if(data){
      setLocation(data);
    } else {
      // error message
      setUnknownLocation(`Unknown location ${document.querySelector('#location-input').value}, please try again`);
    }
  }

  const handleEnter = (event) => {
    if(event.key === "Enter"){
      document.querySelector('#submit-button').click();
    }
  }

  return (
    <div className="App">
      <div className="App-header"><img src="./favicon.svg" alt="icon" style={{height:'100%'}}></img>Weather</div>
      <div className="App-content">
        <div className="search-bar">
          <input id="location-input" type="text" placeholder="Please enter a location" onKeyDown={handleEnter}></input>
          <button id="submit-button" onClick={changeLocation}></button>
        </div>
        {location === null ? <div>{unknownLocation}</div> : <WeatherModule location={location}></WeatherModule>}
      </div>
    </div>
  );
}

export default App;
