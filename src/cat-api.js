import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_dpyRMg7hpAmVr4K3q5ppsjVQpN4BjcPKOBii9lY72h4gMfvur2QDc6zb8P80dbfF';

export async function fetchBreeds() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}