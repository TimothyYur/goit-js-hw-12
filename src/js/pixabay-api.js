import axios from 'axios';

const API_KEY = '55201834-b2019b61559684ce41de74b7e';
const BASE_URL = 'https://pixabay.com/api/';

export function getImagesByQuery(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  return axios
    .get(BASE_URL, { params })
    .then(response => response.data.hits)
    .catch(error => {
      throw new Error('Failed to fetch images');
    });
}
