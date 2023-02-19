import './style.css';
import {getWeatherData} from '/modules/weatherData.js';
import {populateSelect, validateInput} from './modules/formDisplay';

const inputs = document.querySelectorAll('input, select');
const form = document.querySelector('form');

inputs.forEach((input) => {
  input.addEventListener('input', () => {
    validateInput(input);
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
console.log(await getWeatherData('Camarillo', 'United States of America', 'California'))