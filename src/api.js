const fetchWeatherInfo = async function(location) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=${process.env.REACT_APP_API_KEY}`);
        if (!response) {
            throw new Error('Error fetching data');
        }
        const data = await response.json(); 
        console.log(data);

        return extractWeatherInfo(data);

    } catch (error){
        console.log(error);
    }


}

const extractWeatherInfo = function (jsonFile){
    try {
        // parse json file
        const parsedData = JSON.parse(jsonFile);

        if (!parsedData){
            throw new Error('Error accessing file');
        }

        // extract data
        const {cloudcover,conditions,datetime,feelslike,humidity,precip,precipprob,preciptype} = parsedData;
        
        return {cloudcover,conditions,datetime,feelslike,humidity,precip,precipprob,preciptype} 

    } catch (error){
        console.log(error);
    }
}

export {fetchWeatherInfo,extractWeatherInfo};