const fetchWeatherInfo = async function(location) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=${process.env.REACT_APP_API_KEY}&iconSet=icons2&unitGroup=metric`);
        
        if (!response) {
            throw new Error('Error fetching data');
        }
        const data = await response.json(); 
        console.log(data);

        return data;

    } catch (error){
        console.log(error);
        return null;
    }


}

export {fetchWeatherInfo};