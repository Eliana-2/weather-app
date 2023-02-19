import './style.css';
import {getWeatherData} from '/modules/weatherData.js';
import {populateSelect} from './modules/formDisplay.js';
import {validateInput, isValid} from './modules/formValidation.js';

const inputs = document.querySelectorAll('input, select');
const form = document.querySelector('form');

async function formSubmit(inputs) {
  if(isValid(inputs)) {
    console.log(await getWeatherData(document.querySelector('#city-name').value, document.querySelector('#country-select').value, document.querySelector('#state-select').value));
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