import './weather.css'
import weatherData from './testfiles/samplequery.json';

function WeatherModule(props){
    const now = new Date().getHours();
    const {days, resolvedAddress} = weatherData;
    const currentday = days[0];
    const currentConditions = currentday.hours[now];
    // need round-robin next hours system
    const firsthours = currentday.hours.slice(5,10);
    const nextdays = days.slice(1,7);

    // converts 24 hour system to 12 hour system
    const to12System = (time,includeMinutes) => {
        let hour = parseInt(time.slice(0,2));
        let minutes = time.slice(2,5);
        let period;

        if(hour % 12 === 0){
            period = (hour === 0) ? "am": "pm";
            hour = "12";
        } else {
            period = (hour > 12) ? 'pm': 'am';
            hour = ( hour > 12) ? (hour%12): hour;
        }

        return (includeMinutes ? `${hour}${minutes} ${period}`: `${hour} ${period}`);
    }

    const ___ = function(){

    }


    // converts datetime into day of the month
    const toDay = (datetime) => {
        const temp = new Date(datetime);
        return temp.toDateString().split(' ').slice(0,3).join(' ');
    }

    return (
        <div id="weather-container" className="fc">
            <div style={{color:'white'}}>{props.location}</div>

            <div className="weather-component bg" id="current-temperature">
                <img 
                    className="icon-Big" 
                    src={`/images/weatherIcon/${currentday.icon}.svg`} 
                    alt="placeholder">
                </img>        
                <div>{currentConditions.temp}<span id="degrees">&deg;C</span></div>
                
                <div id="desc"> {currentConditions.conditions}
                    <div className="medium grey-font grey-font">Feels: {currentConditions.feelslike}&deg;C<br></br>
                        H: {currentday.tempmax}&deg;C  L: {currentday.tempmin}&deg;C
                    </div>
                </div>
                
            </div>

            <div className="weather-component" id="hourly">
                {firsthours.map((hour,index) => (
                    <div className="day medium fc" id={index} style={{ 
                        backgroundColor: `rgba(0, 0, 0, ${(index+1)*0.05})`
                      }}>
                        {to12System(hour.datetime,false)}
                        <img src={`/images/weatherIcon/${hour.icon}.svg`} alt="placeholder"></img>
                        <div className="larger">{hour.temp}&deg;C</div>
                        <div>Feels {hour.feelslike}&deg;C</div>
                        <div>
                            <img src="images/weatherIcon/rain.svg" alt="placeholder" width="15" height="13"></img>
                            {hour.precipprob}%
                        </div>
                    </div>
                ))}
            </div>

            <div className="weather-component" id="detailed-observations">
                <div id="UV" className="fc day medium bg">
                    <div className="obs-header left">
                        <div className="grey-font">UV Index</div>
                        <div className="larger">{currentday.uvindex}</div>
                    </div>
                    <img 
                        src={`/images/observations/uv/uv-index-${currentday.uvindex}.svg`} 
                        alt="placeholder">
                    </img>
                    
                </div>

                <div id="wind" className="fc day medium left bg">
                    <div className="obs-header left">
                        <div className="grey-font">Wind</div>
                        <div className='larger'>{currentday.windspeed} km/h</div>   
                    </div>
                    <img 
                        src="/images/observations/wind/windsock.svg" 
                        alt="placeholder">
                    </img>
                    
                </div>
                <div id="pressure" className="fc day medium left bg">
                    <div className="obs-header left">
                        <div className="grey-font">Pressure</div>
                        <div className="larger">{(currentday.pressure)/1000} bar</div>
                    </div>
                    <img 
                        src="/images/observations/barometer.svg" 
                        alt="placeholder">
                    </img>
                    
                </div>
                <div id="visibility" className="fc day medium left bg">
                    <div className="obs-header left">
                        <div className="grey-font">Visibility</div>
                        <div className="larger">{currentday.visibility} km</div>
                    </div>
                    <img 
                        src="/images/observations/haze.svg" 
                        alt="placeholder">
                    </img>
                    
                </div>
                <div id="humidity" className="fc day medium left bg">
                    <div className="obs-header">
                        <div className="grey-font">Humidity</div>
                        <div className="larger">{currentday.humidity} %</div>    
                    </div>
                    <img 
                        src="/images/observations/humidity.svg" 
                        alt="placeholder">
                    </img>
                    
                </div>
            </div>

            <div className="weather-component bg" id="next-days">
                {nextdays.map((day) => (
                    <div className="fc day medium">
                        <div className="obs-header">
                            <div className="medium">{toDay(day.datetime)}</div>
                            <div className="small-font">{day.conditions}</div>
                        </div>
                        <img src={`/images/weatherIcon/${day.icon}.svg`} alt="placeholder"></img>
                        <div className="obs-footer smaller-font">
                            <div>{day.temp}&deg;C</div>
                            <div>night {day.tempmin}&deg;C</div>
                            <div className="smaller-font">
                                <img src="images/weatherIcon/rain.svg" alt="placeholder" width="15" height="13"></img> 
                                {day.precipprob}%
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export {WeatherModule}