import {MAX_COMMENT_NUMBER} from './data.js';

const socialComments = document.querySelector('.social__comments');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const commentTemplate = document.querySelector('#comment').content;
const documentFragment = document.createDocumentFragment();

const commentsHandler = () => {
  let commentsNumber = 0;
  let commentsCount = 0;
  let comments = [];

  const renderComments = (activeComments) => {
    socialComments.innerHTML = '';

    activeComments.forEach((comment) => {
      const commentNode = commentTemplate.cloneNode(true);
      commentNode.querySelector('.social__picture').src = comment.avatar;
      commentNode.querySelector('.social__picture').alt = comment.name;
      commentNode.querySelector('.social__text').textContent = comment.message;
      documentFragment.append(commentNode);
    });

    socialComments.append(documentFragment);
  };

  const eventListenerHandler = () => {
    const newCommentNumber = commentsNumber + MAX_COMMENT_NUMBER;
    commentsNumber = newCommentNumber >= commentsCount ? commentsCount : newCommentNumber;

    renderComments(comments.slice(0, commentsNumber));

    socialCommentCount.textContent = `${commentsNumber} из ${commentsCount} комментариев`;

    if (commentsNumber === commentsCount) {
      commentsLoader.classList.add('hidden');
    }
  };

  const addEventListener = () => {
    commentsLoader.addEventListener('click', eventListenerHandler);
  };

  const removeEventListener = () => {
    commentsLoader.removeEventListener('click', eventListenerHandler);
  };

  const initializeComments = (totalComments) => {
    commentsNumber = 0;
    commentsCount = totalComments.length;
    comments = totalComments;
    commentsLoader.classList.remove('hidden');
    eventListenerHandler();
    addEventListener();
  };

  return {
    removeEventListener, initializeComments
  };
};

export {commentsHandler};
