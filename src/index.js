import { Notify } from 'notiflix';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

//npm i --save-dev @types/simplelightbox
//
const inputEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const btnSubmit = document.querySelector('[type="submit"]');
const btnMore = document.querySelector('.load-more');
const InputSearch = document.querySelector('.input_js');
// //
// //
import { fetchPictures } from './fetch_gallery';
// //

//
let searchValue = '';
let page = 1;

inputEl.addEventListener('submit', getInputValue);
//
function getInputValue(event) {
  event.preventDefault();
  searchValue = InputSearch.value;
  console.log(searchValue);
  page = 1;
  galleryEl.innerHTML = '';
  fetchPictures(searchValue, page).then(data => {
    if (data.hits.length === 0) {
      Notify.info('"Sorry, there are no images matching your search query. Please try again."');
    } else {
      data.hits.forEach(item => {
        const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = item;
        const template = ` <div class="gallery-card">
    <div class="photo-card">
    <a href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}"  width="300px" " />
      </a>
      <div class="info">
        <p class="info-item">
          <b> Likes: ${likes}</b>
        </p>
        <p class="info-item">
          <b> Views: ${views}</b>
        </p>
        <p class="info-item">
          <b> Comments: ${comments}</b>
        </p>
        <p class="info-item">
          <b> Downloads: ${downloads}</b>
        </p>
      </div>
    </div>
</div>`;
        galleryEl.insertAdjacentHTML('beforeend', template);
        const lighbox = new SimpleLightbox('.gallery a', {
          captionsData: 'alt',
          captionDelay: 100,
          animationSpeed: 100,
          animationSlide: false,
          close: true,
          enableKeyboard: true,
        });
      });
    }
  });
}
