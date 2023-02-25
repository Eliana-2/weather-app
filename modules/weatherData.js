async function getCountryCodes(countryName, stateName = '') {
  try {
    if(countryName === 'United States of America') {
      const response = await fetch('data/state_codes.json');
      const responseData = await response.json();
      const stateData = await responseData.find(state => state.country === 'US' && state.name === stateName);
      return stateData.code;
    }
    else {
      const response = await fetch('data/country_codes.json');
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
  const currentDate = new Date(responseList[0].dt * 1000);
  let forecastData = {};
  forecastData.currentWeather = {
    'weather' : responseList[0].weather[0].main,
    'icon' : responseList[0].weather[0].icon,
    'temp' : responseList[0].main.temp,
    'date' : currentDate.toDateString().slice(0, 10)
  };
  forecastData.forecast = [];

  const INTERVAL_HOURS = 3;
  const DAILY_3_HOUR_INTERVALS = 8;
  const CURRENT_DAY_INTERVALS = Math.floor((24 - currentDate.getHours()) / INTERVAL_HOURS) + 1;

  for(let index = CURRENT_DAY_INTERVALS; index < responseList.length - (DAILY_3_HOUR_INTERVALS - CURRENT_DAY_INTERVALS); index += DAILY_3_HOUR_INTERVALS) {
    const dayList = responseList.slice(index, index + DAILY_3_HOUR_INTERVALS);
    const dayWeatherList = [];
    let dayMaxTemp = responseList[index].main.temp_max,
        dayMinTemp = responseList[index].main.temp_min;

    for(let dayListIndex = 0; dayListIndex < dayList.length; dayListIndex++) {
      if(dayWeatherList.find(weatherType => weatherType.weather === dayList[dayListIndex].weather[0].main) !== undefined) {
        dayWeatherList.find(weatherType => weatherType.weather === dayList[dayListIndex].weather[0].main).frequency += 1;
      }
      else {
        dayWeatherList.push({
          'weather' : dayList[dayListIndex].weather[0].main,
          'icon' : dayList[dayListIndex].weather[0].icon,
          'frequency' : 1
        });
      }
      if(dayList[dayListIndex].main.temp_max > dayMaxTemp) {dayMaxTemp = dayList[dayListIndex].main.temp_max};
      if(dayList[dayListIndex].main.temp_min < dayMinTemp) {dayMinTemp = dayList[dayListIndex].main.temp_min};
    }

    const weatherMode = Math.max.apply(null, dayWeatherList.map(element => element.frequency));
    const weatherObject = dayWeatherList.find(element => element.frequency === weatherMode);
    const weather = weatherObject.weather;
    const icon = weatherObject.icon;

    const date = new Date(dayList[0].dt * 1000).toDateString().slice(0, 10);

    forecastData.forecast.push({
      'maxTemp' : dayMaxTemp,
      'minTemp' : dayMinTemp,
      'weather' : weather,
      'icon' : icon,
      'date' : date
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