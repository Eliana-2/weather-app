//f3fbe20627eff09cace90cdb9fbe9ee1
import './style.css';
import {getWeatherData} from '/modules/weatherData.js'
import {populateSelect} from './modules/display';

console.log(await getWeatherData('Camarillo', 'United States of America', 'California'));
populateSelect('country');
populateSelect('state');
//switch to 5 day forecast