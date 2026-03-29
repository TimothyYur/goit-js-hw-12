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

  const query = form.elements['search-text'].value.trim();

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
    createGallery(data.hits);
    checkLoadMoreStatus();
  } catch (error) {
    showMessage('An error occurred while fetching images. Please try again.');
    console.error(error);
  } finally {
    hideLoader();
    form.reset();
  }

  form.reset();
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
    showMessage("We're sorry, but you've reached the end of search results.");
  } else {
    showLoadmore();
  }
}

function checkLoadMoreStatus() {
  const maxPage = Math.ceil(totalHits / 15);
  if (page >= maxPage) {
    hideLoadmore();
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