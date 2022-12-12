import { isEscapeKey } from './util.js';
import { MAX_COMMENT_NUMBER } from './data.js';

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

let commentsNumber;

const closeModal = (evt) => {
  if (isEscapeKey(evt) || evt.type === 'click') {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', closeModal);
    bigPictureCancel.removeEventListener('click', closeModal);
  }
};

const drawComment = (comment) => {
  const listItem = document.createElement('li');
  listItem.classList.add('social__comment');
  const image = document.createElement('img');
  image.classList.add('social__picture');
  image.src = comment.avatar;
  image.alt = comment.name;
  image.width = 35;
  image.height = 35;
  listItem.append(image);
  const paragraph = document.createElement('p');
  paragraph.classList.add('social__text');
  paragraph.textContent = comment.message;
  listItem.append(paragraph);
  socialComments.append(listItem);
};

const drawComments = (comments, count) => {
  socialComments.innerHTML = '';
  comments.forEach((comment, index) => {
    if (count > index) {
      drawComment(comment);
    }
  });
};

const showCommentsCount = (image) => {
  drawComments(image.comments, commentsNumber);
  socialCommentCount.innerHTML = `${commentsNumber > commentsCount.textContent ? commentsCount.textContent : commentsNumber} из `;
  socialCommentCount.append(commentsCount);
  socialCommentCount.innerHTML += ' комментариев';
  if (commentsNumber > commentsCount.textContent) {
    commentsLoader.classList.add('hidden');
  }
};

const openModal = (evt, photos) => {
  commentsNumber = MAX_COMMENT_NUMBER;
  const photo = photos[evt.target.closest('.picture').dataset.index];
  bigPicturePhoto.src = photo.url;
  bigPicturePhoto.alt = photo.description;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;

  commentsLoader.classList.remove('hidden');
  showCommentsCount(photo, commentsNumber);

  commentsLoader.addEventListener('click', () => {
    commentsNumber += MAX_COMMENT_NUMBER;
    showCommentsCount(photo, commentsNumber);
  });

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', closeModal);
  bigPictureCancel.addEventListener('click', closeModal);
};

const thumbnailClickHandler = (element) => {
  pictures.addEventListener('click', (evt) => openModal(evt, element));
  bigPictureCancel.addEventListener('click', closeModal);
  commentsNumber = 5;
};

export {thumbnailClickHandler};
