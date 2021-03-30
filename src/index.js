import ApiService from './js/apiService.js';
import getRefs from './js/get-refs.js';
import * as basicLightbox from 'basiclightbox';

// import inputTpl from './templates/input.hbs';

// console.log(inputTpl);
import './styles.scss';
import './js/apiService';
import cardTpl from './templates/card.hbs';

const refs = getRefs();

const apiService = new ApiService();

refs.searchForm.addEventListener('submit', onInputChange);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.gallery.addEventListener('click', onImageClick);

function onInputChange(e) {
  e.preventDefault();

  apiService.query = e.currentTarget.elements.query.value;
  apiService.resetPage();
  apiService.fetchImages().then(hits => {
    clearGallery();
    appendImagesMarkup(hits);
  });
}

function onLoadMore(e) {
  apiService
    .fetchImages()
    .then(appendImagesMarkup)
    .then(data => {
      window.scrollTo({
        top: e.pageY,
        left: 0,
        behavior: 'smooth',
      });
    });
}

function onImageClick(e) {
  const image = e.target;

  if (!image.classList.contains('card-image')) {
    return;
  }

  const instance = basicLightbox.create(
    `<img src="${image.dataset.source}" width="800" height="600">`,
    {
      closable: true,
    },
  );

  instance.show();
}

function appendImagesMarkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', cardTpl(hits));
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}
