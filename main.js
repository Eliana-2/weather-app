//f3fbe20627eff09cace90cdb9fbe9ee1
import './style.css';
import {getWeatherData} from '/modules/weatherData.js';
import {populateSelect, validateInput} from './modules/formDisplay';

//switch to 5 day forecast

const inputs = document.querySelectorAll('input, select');
const form = document.querySelector('form');

inputs.forEach((input) => {
  input.addEventListener('input', () => {
    validateInput(input);
    console.log('done')
  })
})

form.addEventListener('submit', (e) => {
  e.preventDefault();
  inputs.forEach((input) => {
    validateInput(input);
  })
})

populateSelect('country');
populateSelect('state');