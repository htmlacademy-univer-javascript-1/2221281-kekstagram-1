import { isEscapeKey } from './util.js';
import { commentsHandler } from './commentsBigPicture.js';


const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPicturePhoto = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const socialCaption = document.querySelector('.social__caption');
const bigPictureCancel = document.querySelector('.big-picture__cancel');

const comments = commentsHandler();

function onCloseModalButton(evt) {
  evt.preventDefault();
  closeModal();
}

function onEscapeKeydown(evt) {
  if (isEscapeKey(evt)) {
    closeModal();
  }
}

function closeModal() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscapeKeydown);
  bigPictureCancel.removeEventListener('click', onCloseModalButton);
  comments.removeEventListener();
}


const openModal = (evt, photos) => {
  const photo = photos[evt.target.closest('.picture').dataset.index];
  bigPicturePhoto.src = photo.url;
  bigPicturePhoto.alt = photo.description;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;
  comments.initializeComments(photo.comments);
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', closeModal);
  bigPictureCancel.addEventListener('click', closeModal);
};

const thumbnailClickHandler = (element) => {
  pictures.addEventListener('click', (evt) => openModal(evt, element));
  bigPictureCancel.addEventListener('click', closeModal);
};

export {thumbnailClickHandler};
