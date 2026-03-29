import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  showMessage,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('#loadmore-button');

let query = '';
let page = 1;
let totalHits = 0;

// Спочатку ховаємо кнопку
hideLoadMoreButton();

form.addEventListener('submit', async event => {
  event.preventDefault();

  query = form.elements['search-text'].value.trim();
  if (!query) {
    showMessage('Please enter a search query.');
    return;
  }

  page = 1; // Скидаємо сторінку для нового пошуку
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      showMessage('Sorry, there are no images matching your search query.');
    } else {
      createGallery(data.hits);
      checkLoadMoreStatus();
    }
  } catch (error) {
    showMessage('Something went wrong. Please try again later.');
  } finally {
    hideLoader();
    form.reset();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();
  hideLoadMoreButton(); // Ховаємо на час завантаження

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);
    
    // Плавний скрол
    smoothScroll();
    
    checkLoadMoreStatus();
  } catch (error) {
    showMessage('Error loading more images.');
  } finally {
    hideLoader();
  }
});

function checkLoadMoreStatus() {
  const totalPages = Math.ceil(totalHits / 15);
  
  if (page >= totalPages) {
    hideLoadMoreButton();
    if (totalHits > 0) {
        showMessage("We're sorry, but you've reached the end of search results.");
    }
  } else {
    showLoadMoreButton();
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