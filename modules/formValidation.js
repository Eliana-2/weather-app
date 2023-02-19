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
  if(input.id === 'state-select' && document.getElementById('country-select').value !== 'United States of America') {return true;}
  else if(input.validity.valueMissing) {
    showError(input, 'Required Field');
    return false;
  }
  else {return true;}

}

function isValid(inputs) {
  inputs.forEach((input) => {
    if(!validateInput(input)) {return false}
  });
  return true;
}

export {validateInput, isValid};