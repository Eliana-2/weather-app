async function getCountryCodes(countryName, stateName = '') {
  try {
    if(countryName === 'United States of America') {
      const response = await fetch('state_codes.json');
      const responseData = await response.json();
      const stateData = await responseData.find(state => state.country === 'US' && state.name === stateName);
      return stateData.code;
    }
    else {
      const response = await fetch('country_codes.json');
      const responseData = await response.json();
      const countryData = await responseData.find(country => country.name === countryName);
      return countryData.alpha2;
    }
  } catch(error) {
    console.log('Could not find country code');
  }
}

async function getLocationCoordinates(cityName, countryCode) {
  try {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${countryCode}&limit=1&appid=f3fbe20627eff09cace90cdb9fbe9ee1`);
    const responseData = await response.json();
    return [responseData[0].lat, responseData[0].lon];
  } catch (error) {
    console.log('Error retrieving location coordinates');
  }
}

async function getLocalForecast(coordinateArray) {
  try {
    const lat = coordinateArray[0], lon = coordinateArray[1];
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=f3fbe20627eff09cace90cdb9fbe9ee1`);
    const responseData = await response.json();
    const weather = responseData.weather[0].main,
    weatherDescription = responseData.weather[0].description,
    temp = responseData.main.temp,
    maxTemp = responseData.main.temp_max,
    minTemp = responseData.main.temp_min;
    return {
      'weather': weather,
      'weatherDescription': weatherDescription,
      'temp' : temp,
      'maxTemp': maxTemp,
      'minTemp': minTemp
      }
    } catch (error) {
    console.log('Error retrieving local forecast');
  }
}

async function getWeatherData(cityName, countryName, stateName = '') {
  try {
    const countryCode = await getCountryCodes(countryName, stateName);
    const locationCoordinates = await getLocationCoordinates(cityName, countryCode);
    const localForecast = await getLocalForecast(locationCoordinates);
    return localForecast;
  } catch(error) {
    console.log('Error getting weather data');
  }
}

export {getWeatherData};