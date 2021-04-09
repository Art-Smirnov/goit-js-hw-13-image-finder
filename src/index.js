import {
  alert,
  defaultModules,
} from '../node_modules/@pnotify/core/dist/PNotify.js';

import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
defaultModules.set(PNotifyMobile, {});

import '../node_modules/@pnotify/core/dist/PNotify.css';
import '../node_modules/@pnotify/mobile/dist/PNotifyMobile.css';

import ApiService from './js/apiService.js';
import getRefs from './js/get-refs.js';
import * as basicLightbox from 'basiclightbox';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
// import inputTpl from './templates/input.hbs';

import './styles.scss';
import './js/apiService';
import cardTpl from './templates/card.hbs';

const refs = getRefs();

const apiService = new ApiService();

refs.searchForm.addEventListener('submit', onInputChange);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.gallery.addEventListener('click', onImageClick);

async function onInputChange(e) {
  e.preventDefault();
  try {
    apiService.query = e.currentTarget.elements.query.value;
    apiService.resetPage();

    const result = await apiService.fetchImages();

    clearGallery();

    appendImagesMarkup(result);
  } catch (e) {
    alert({
      title: 'Oh No!',
      text: 'Something went wrong! Please enter a more specific query!',
    });
  }
}

//  Варіант без використання async/await

/**
 * function onInputChange(e) {
 e.preventDefault();
 
 apiService.query = e.currentTarget.elements.query.value;
 apiService.resetPage();
 apiService
 .fetchImages()
 .then(hits => {
   clearGallery();
   appendImagesMarkup(hits);
  })
  .catch(e => {
    console.log(
      'There has been a problem with your fetch operation: ' + e.message,
      );
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
  */

async function onLoadMore(e) {
  const result = await apiService.fetchImages();
  appendImagesMarkup(result);

  window.scrollTo({
    top: e.pageY,
    left: 0,
    behavior: 'smooth',
  });

  //  Варіант без використання async/await

  // apiService
  //   .fetchImages()
  //   .then(appendImagesMarkup)
  //   .then(data => {
  //     window.scrollTo({
  //       top: e.pageY,
  //       left: 0,
  //       behavior: 'smooth',
  //     });
  //   });
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

// const test = document.querySelector('.card-image');
// console.log(test);
