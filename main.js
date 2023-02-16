//f3fbe20627eff09cace90cdb9fbe9ee1
import './style.css';
import {getWeatherData} from '/modules/weatherData.js'

const weatherObject = await getWeatherData('Camarillo', 'United States of America', 'California');
console.log(weatherObject);