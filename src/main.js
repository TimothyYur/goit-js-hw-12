import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  showMessage,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadmore,
  hideLoadmore,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const loadmore = document.querySelector('.loadmore');

let query = '';
let page = 1;
let totalHits = 0;
const perPage = 15;

form.addEventListener('submit', async event => {
  event.preventDefault();

  query = form.elements['search-text'].value.trim();

  if (!query) {
    showMessage('Please enter a search query.');
    return;
  }

  page = 1;
  clearGallery();
  hideLoader();
  hideLoadmore();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;
    if (totalHits === 0) {
      showMessage(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      return;
    }

    createGallery(data.hits);
    checkPaginationStatus();
  } catch (error) {
    showMessage('An error occurred while fetching images.');
    console.error(error);
  } finally {
    hideLoader();
    form.reset();
  }
});

loadmore.addEventListener('click', async () => {
  page += 1;
  showLoader();
  hideLoadmore();

  try {
    const data = await getImagesByQuery(query, page);

    createGallery(data.hits);
    smoothScroll();
    checkPaginationStatus();
  } catch (error) {
    showMessage('An error occurred while loading more images.');
    console.error(error);
  } finally {
    hideLoader();
  }
});

function checkPaginationStatus() {
  const maxPage = Math.ceil(totalHits / perPage);

  if (page >= maxPage) {
    hideLoadmore();
    // Повідомлення про кінець колекції показуємо тільки якщо ми щось знайшли (totalHits > 0)
    // і ми вже довантажили останню сторінку.
    if (totalHits > 0) {
      showMessage("We're sorry, but you've reached the end of search results.");
    }
  } else {
    showLoadmore();
  }
}

function smoothScroll() {
  const galleryItem = document.querySelector('.gallery-item');
  if (galleryItem) {
    const { height: cardHeight } = galleryItem.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}