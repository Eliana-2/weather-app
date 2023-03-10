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

function toggleVisibility(element) {
  element.classList.toggle('hidden');
}

export {populateSelect, toggleVisibility};