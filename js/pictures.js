import { thumbnailClickHandler } from './renderBigPicture.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const fragment = document.createDocumentFragment();

const renderThumbnails = (element) => {
  element.forEach((photo) => {
    const picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = photo.url;
    picture.querySelector('.picture__likes').textContent = photo.likes;
    picture.querySelector('.picture__comments').textContent = photo.comments.length;
    picture.querySelector('.picture').dataset.index = photo.id;
    fragment.append(picture);
  });
  pictures.append(fragment);

  thumbnailClickHandler(element);
};

export {renderThumbnails};
