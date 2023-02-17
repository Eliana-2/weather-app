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
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=40&units=metric&appid=f3fbe20627eff09cace90cdb9fbe9ee1`);
    const responseData = await response.json();
    return responseData.list;

  } catch (error) {
    console.log('Error retrieving local forecast');
  }
}

async function processLocalForecast(responseList) {
  try {
  const DAILY_3_HOUR_INTERVALS = 8;
  const NUMBER_OF_DAYS = 5;
  let forecastData = {};
  forecastData.threeHourCurrentForecast =[];
  forecastData.fiveDayForecast = [];
  for(let index = 0; index < DAILY_3_HOUR_INTERVALS; index++) {
    const weather = responseList[index].weather[0].main,
          weatherDescription = responseList[index].weather[0].description,
          temp = responseList[index].main.temp,
          humidity = responseList[index].main.humidity;
    forecastData.threeHourCurrentForecast.push({
      'weather' : weather,
      'weatherDescription' : weatherDescription,
      'temp' : temp,
      'humidity': humidity
    })
  }
  const dayListSize = DAILY_3_HOUR_INTERVALS;
  for(let index = 0; index < responseList.length; index += dayListSize) {
    const dayList = responseList.slice(index, index + dayListSize);
    let maxTemp = responseList[index].main.temp,
        minTemp = responseList[index].main.temp;
    for(let dayListIndex = 0; dayListIndex < dayList.length; dayListIndex++) {
      if(dayList[dayListIndex].main.temp > maxTemp) {maxTemp = dayList[dayListIndex].main.temp};
      if(dayList[dayListIndex].main.temp < minTemp) {minTemp = dayList[dayListIndex].main.temp};
    }
    forecastData.fiveDayForecast.push({
      'maxTemp' : maxTemp,
      'minTemp' : minTemp
    })
  }
  return forecastData;
  } catch(error) {
    console.log('Error processing local forecast');
  }
}

async function getWeatherData(cityName, countryName, stateName = '') {
  try {
    const countryCode = await getCountryCodes(countryName, stateName);
    const locationCoordinates = await getLocationCoordinates(cityName, countryCode);
    const localForecast = await getLocalForecast(locationCoordinates);
    const weatherInfo = await processLocalForecast(localForecast);
    return weatherInfo;
  } catch(error) {
    console.log('Error getting weather data');
  }
}

export {getWeatherData};