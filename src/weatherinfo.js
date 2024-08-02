import './weather.css'

function WeatherModule(props){
    const {days, resolvedAddress} = props.location;
    const currentday = days[0];
    
    // need to handle time zones
    const now = new Date().getHours();

    // conditions for the current hour
    const currentConditions = currentday.hours[now];

    /* 
        today and tomorrow's weather for next hours system.
        system at most would only need info up to early morning of the next day 
        (when user fetches weather data very late in the current day)
    */
    const next2days = days[0].hours.concat(days[1].hours);

    // information for next 5 hours
    const nextHours = next2days.slice(now,now+5);

    // current day to same day next week (next 7 days)
    const nextDays = days.slice(1,8);

    // converts 24 hour system to 12 hour system
    const to12System = (time,includeMinutes) => {
        let hour = parseInt(time.slice(0,2));
        let minutes = time.slice(2,5);
        let period;

        // find out whether if its 12 am or pm
        if(hour % 12 === 0){
            period = (hour === 0) ? "am": "pm";
            hour = "12";
        } else {
            period = (hour > 12) ? 'pm': 'am';
            hour = ( hour > 12) ? (hour%12): hour;
        }

        return (includeMinutes ? `${hour}${minutes} ${period}`: `${hour} ${period}`);
    }

    // converts datetime into day of the months
    const toDay = (datetime) => {
        // form string in format ${day month year}, then exclude year
        return new Date(datetime).toDateString().split(' ').slice(0,3).join(' ');
    }

    
    return (
        <div id="weather-container" className="fc">
            <div style={{color:'white',fontSize:'50px'}}>{resolvedAddress}</div>

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
            <div>
                <div className="left component-label">Hourly</div>
                <div className="weather-component" id="hourly">
                    {nextHours.map((hour,index) => (
                        <div className="day medium fc" id={index} style={{ 
                            backgroundColor: `rgba(0, 0, 0, ${(index + 5)*0.05})`,
                            borderTopLeftRadius: index === 0 ? '10px' : '0',
                            borderBottomLeftRadius: index === 0 ? '10px' : '0',
                            borderTopRightRadius: index === nextHours.length - 1 ? '10px' : '0',
                            borderBottomRightRadius: index === nextHours.length - 1 ? '10px' : '0',
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
            </div>
            <div>
                <div className="left component-label">Detailed Observations</div>
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
            </div>
            <div>
                <div className="left component-label">Next 7 days</div>
                <div className="weather-component bg" id="next-days">
                    {nextDays.map((day) => (
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
        </div>
    )
}

export {WeatherModule}