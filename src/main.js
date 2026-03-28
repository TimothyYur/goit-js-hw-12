import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  showMessage,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const query = form.elements['search-text'].value.trim();

  if (!query) {
    showMessage('Please enter a search query.');
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(images => {
      createGallery(images);
    })
    .catch(error => {
      showMessage('An error occurred while fetching images. Please try again.');
      console.error(error);
    })
    .finally(() => {
      hideLoader();
    });

  form.reset();
});
