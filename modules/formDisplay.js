async function populateSelect(selectType) {
  try {
  const select = document.getElementById(`${selectType}-select`);

  const response = await fetch(`data/${selectType}_codes.json`);
  let responseData = await response.json();
  if(selectType === 'state') {responseData = responseData.filter(state => state.country === 'US')};

  for(let i = 0; i < responseData.length; i++) {
    const optionName = responseData[i].name;

    const option = document.createElement('option');
    option.textContent = optionName;
    option.value = optionName;

    select.appendChild(option);
  }
} catch(error) {
  console.log(`Error populating ${selectType} select element`);
}
}

function showError(input, message) {
  const inputErrorMessage = input.nextElementSibling;
  inputErrorMessage.textContent = message;
  input.classList.add('form-value-error');
}

function clearError(input) {
  const inputErrorMessage = input.nextElementSibling;
  inputErrorMessage.textContent = '';
  input.classList.remove('form-value-error');
}

function validateInput(input) {
  clearError(input);
  console.log(document.getElementById('country-select'))
  if(input.id === 'state-select' && document.getElementById('country-select').value !== 'United States of America') {return;}
  if(input.validity.valueMissing) {showError(input, 'Required Field');}
}

export {populateSelect, validateInput};