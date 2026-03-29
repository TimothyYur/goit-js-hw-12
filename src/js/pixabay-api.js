import axios from 'axios';

const API_KEY = '55201834-b2019b61559684ce41de74b7e';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page = 1) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15, // Вимога: 15 об'єктів
    page: page,
  };

  const response = await axios.get(BASE_URL, { params });
  // Повертаємо весь об'єкт data, щоб у main.js мати доступ до totalHits
  return response.data;
}