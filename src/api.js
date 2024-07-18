const connect = async function(location) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=${process.env.REACT_APP_API_KEY}`);
        if (!response) {
            throw new Error('')
        }
        const data = await response.json(); 

        console.log(data);

    } catch (error){

    }


}

export {connect};