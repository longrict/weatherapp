import './weather.css'
import { fetchWeatherInfo } from './api.js';

function WeatherModule(){
    const days = [0,1,2,3,4,5];

    return (
        <div id="weather-container">
            <div className="weather-component" id="current-temperature">
                <div>22<span id="degrees">&deg;C</span></div>
                <div id="desc"> Weather description
                    <div className="small">Feels: number</div>
                    <div className="small">H:_ &deg;C  L:_ &deg;C</div>
                </div>
            </div>
            <div className="weather-component" id="next-days">
                {days.map((day) => (
                    <div className="day small" key={day}>
                        Day
                        datetime
                        temperature
                        precip
                    </div>
                ))}
                
            </div>
            <div className="weather-component"></div>
        </div>
    )

}

export {WeatherModule}