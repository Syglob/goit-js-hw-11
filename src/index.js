// import lightbox from 'lightbox';
import { Notify } from 'notiflix';
// Описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

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
btnMore.addEventListener('click', () => {
  fetchPictures(searchValue, page).then(data => {
    console.log('do', page);
    page += 1;
    if (data.hits.length === 0) {
      Notify.info('Нет больше картинок');
      btnMore.className = 'hide';
    }
    data.hits.forEach(item => {
      const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = item;
      const template = ` <div class="gallery-card">
    <div class="photo-card">
    <a href="${largeImageURL}"><img src="${webformatURL}" alt = "${tags}"/></a>
    </div>
      <div class="info">
      <p class="info-item">${tags}</p>
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

</div>`;
      galleryEl.insertAdjacentHTML('beforeend', template);
      const lighbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 100,
        animationSpeed: 100,
        close: true,
        enableKeyboard: true,
      });
    });
  });
});
//
function ressetPage() {
  page = 1;
}
inputEl.addEventListener('submit', getInputValue);
//
function getInputValue(event) {
  event.preventDefault();
  searchValue = InputSearch.value;
  console.log(searchValue);
  console.log('posle', page);
  galleryEl.innerHTML = '';
  fetchPictures(searchValue, page).then(data => {
    btnMore.classList.remove('hide');
    if (data.hits.length === 0) {
      Notify.info('"Sorry, there are no images matching your search query. Please try again."');
    } else {
      data.hits.forEach(item => {
        const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = item;
        const template = ` <div class="gallery-card">
    <div class="photo-card">
    <a href="${largeImageURL}"><img src="${webformatURL}" alt = "${tags}"/></a>
    </div>
      <div class="info">
      <p class="info-item">${tags}</p>
        <p class="info-item">
           Likes: <b>${likes}</b>
        </p>
        <p class="info-item">
           Views: <b>${views}</b>
        </p>
        <p class="info-item">
           Comments: <b>${comments}</b>
        </p>
        <p class="info-item">
           Downloads: <b>${downloads}</b>
        </p>
      </div>
</div>`;
        galleryEl.insertAdjacentHTML('beforeend', template);
        const lighbox = new SimpleLightbox('.gallery a', {
          captionsData: 'alt',
          captionDelay: 100,
          animationSpeed: 100,
          close: true,
          enableKeyboard: true,
        });
      });
    }
  });
}
