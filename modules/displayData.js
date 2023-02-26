

function createPanel(dayWeatherData) {
  const displayContainer = document.getElementById('container');
  const panel = document.createElement('div');
  const date = document.createElement('h3');
  date.textContent = dayWeatherData.date;
  const img = document.createElement('img');
  img.src = `https://openweathermap.org/img/wn/${dayWeatherData.icon}@2x.png`

  panel.appendChild(date);
  panel.appendChild(img);
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