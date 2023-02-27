import './style.css';
import {getWeatherData} from '/modules/weatherData.js';
import {populateSelect, toggleVisibility} from './modules/formDisplay.js';
import {validateInput, isValid} from './modules/formValidation.js';
import {displayWeather} from './modules/displayData.js';

const inputs = document.querySelectorAll('input, select');
const form = document.querySelector('form');
const displayContainer = document.getElementById('display-container');

async function formSubmit(inputs) {
  if(isValid(inputs)) {
    toggleVisibility(form);
    const weatherData = await getWeatherData(document.querySelector('#city-name').value, document.querySelector('#country-select').value, document.querySelector('#state-select').value);
    console.log(weatherData);
    displayWeather(weatherData);
    toggleVisibility(displayContainer);

  }
}

inputs.forEach((input) => {
  input.addEventListener('input', () => {
    validateInput(input);
  })
})

form.addEventListener('submit', (e) => {
  e.preventDefault();
  formSubmit(inputs);
})

populateSelect('country');
populateSelect('state');