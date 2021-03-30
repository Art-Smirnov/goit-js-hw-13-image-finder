export default function getRefs() {
  return {
    inputContainer: document.querySelector('#input-container'),
    gallery: document.querySelector('.gallery'),
    searchForm: document.querySelector('.search-form'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
  };
}
