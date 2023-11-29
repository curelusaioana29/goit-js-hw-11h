// index.js

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorElement = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

// Function to hide and show loader
function toggleLoader(showLoader) {
  loader.style.display = showLoader ? 'block' : 'none';
}

// Function to hide and show error message
function toggleError(showError) {
  errorElement.style.display = showError ? 'block' : 'none';
}

// Function to populate breed options in the select element
async function populateBreeds() {
  try {
    toggleLoader(true);
    const breeds = await fetchBreeds();
    breedSelect.innerHTML = breeds.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join('');
  } catch (error) {
    toggleError(true);
  } finally {
    toggleLoader(false);
  }
}

// Function to display cat information based on the selected breed
async function displayCatInfo(breedId) {
  try {
    toggleLoader(true);
    const catData = await fetchCatByBreed(breedId);
    const cat = catData[0];
    catInfo.innerHTML = `
      <img src="${cat.url}" alt="${cat.breeds[0].name}">
      <p><strong>Breed:</strong> ${cat.breeds[0].name}</p>
      <p><strong>Description:</strong> ${cat.breeds[0].description}</p>
      <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
    `;
    // Reset error message if cat information is successfully loaded
    toggleError(false);
  } catch (error) {
    toggleError(true);
  } finally {
    toggleLoader(false);
  }
}

// Event listener for breed selection
breedSelect.addEventListener('change', (event) => {
  const selectedBreedId = event.target.value;
  displayCatInfo(selectedBreedId);
});

// Initialize the page
populateBreeds();