

function createPanel(dayWeatherData) {
  const displayContainer = document.getElementById('display-container');
  const panel = document.createElement('div');
  panel.classList.add('weather-panel');
  
  const date = document.createElement('h3');
  date.textContent = dayWeatherData.date;
  panel.appendChild(date);
  
  const img = document.createElement('img');
  img.src = `https://openweathermap.org/img/wn/${dayWeatherData.icon}@2x.png`;
  img.classList.add('panel-icon');
  panel.appendChild(img);

  const temp = document.createElement('p');
  temp.innerHTML = (dayWeatherData.temp !== undefined) ? `${dayWeatherData.temp} &#8451;` : `${dayWeatherData.minTemp} &#8451; / ${dayWeatherData.maxTemp} &#8451;`;
  panel.appendChild(temp);

  const weather = document.createElement('p');
  weather.textContent = dayWeatherData.weather;
  panel.appendChild(weather);

  displayContainer.appendChild(panel);
}

function displayWeather(weatherData) {
  createPanel(weatherData.currentWeather);
  for(let i = 0; i < weatherData.forecast.length; i++)
  {
    createPanel(weatherData.forecast[i]);
  }
}

export {displayWeather};