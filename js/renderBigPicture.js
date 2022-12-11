import { isEscapeKey } from './util.js';

const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPicturePhoto = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const socialComments = document.querySelector('.social__comments');
const socialCaption = document.querySelector('.social__caption');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const bigPictureCancel = document.querySelector('.big-picture__cancel');

const closeModal = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEscapeKeydown);
};

function onModalEscapeKeydown(evt){
  if (isEscapeKey(evt)) {
    closeModal();
  }
}

const openModal = (evt, data) => {
  const picture = evt.target.closest('.picture');

  if (picture) {
    const photo = data[picture.dataset.index];
    bigPicture.classList.remove('hidden');
    bigPicturePhoto.src = photo.url;
    bigPicturePhoto.alt = photo.description;
    likesCount.textContent = photo.likes;
    commentsCount.textContent = photo.comments.length;
    socialComments.innerHTML = '';
    photo.comments.forEach((comment) => {
      socialComments.insertAdjacentHTML('beforeend', `
          <li class="social__comment">
            <img
                class="social__picture"
                src="${comment.avatar}"
                alt="${comment.name}"
                width="35" height="35">
            <p class="social__text">${comment.message}</p>
          </li>
        `);
    });
    socialCaption.textContent = photo.description;
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    document.body.classList.add('modal-open');

    document.addEventListener('keydown', onModalEscapeKeydown);
  }
};

const thumbnailClickHandler = (element) => {
  pictures.addEventListener('click', (evt) => openModal(evt, element));
  bigPictureCancel.addEventListener('click', closeModal);
};

export {thumbnailClickHandler};
