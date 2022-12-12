import {isEscapeKey, getLineLength} from './util.js';
import {MAX_COMMENT_LENGTH, MAX_HASHTAG_COUNT, MAX_HASHTAG_LENGTH, ErrorMessages, ALLOWED_SYMBOLS} from './data.js';

const uploadForm = document.querySelector('.img-upload__form');
const photoLoader = document.querySelector('#upload-file');
const photoEditor = document.querySelector('.img-upload__overlay');
const closeEditorButton = document.querySelector('#upload-cancel');
const submitButton = document.querySelector('.img-upload__submit');
const fieldWrapper = document.querySelector('.img-upload__text');
const hashtagText = uploadForm.querySelector('.text__hashtags');
const descriptionText = uploadForm.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text'
});

let errorMessage = '';

const getErrorMessage = () => errorMessage;

const isUniqueHashtags = (hashtags) => {
  for (let i = hashtags.length - 1; i >= 0; i--) {
    if (hashtags.length === 1) {
      return true;
    }
    for (let j = hashtags.length - 2; j >= 0; j--) {
      if (hashtags[i] === hashtags[j]) {
        return false;
      }
    }
    hashtags.pop();
  }
};

const isValidHashtag = (value) => {
  errorMessage = '';
  const inputHashtag = value.toLowerCase();
  if (inputHashtag.length === 0) {
    return true;
  }
  const hashtags = inputHashtag.split(/\s+/);
  const hashtagsCopy = hashtags.slice();
  if (hashtags.length === 0) {
    return true;
  }

  const errorCheckers = [
    {
      checker: hashtags.some((hash) => hash[0] !== '#'),
      error: ErrorMessages.STARTS_WITH_HASH,
    },
    {
      checker: hashtags.some((hash) => hash.length > MAX_HASHTAG_LENGTH),
      error: ErrorMessages.MAX_HASH_LENGTH,
    },
    {
      checker: hashtags.some((hash) => hash.indexOf('#', 1) >= 1),
      error: ErrorMessages.HASH_SPACE,
    },
    {
      checker: hashtags.length > MAX_HASHTAG_COUNT,
      error: ErrorMessages.MAX_HASH_COUNT,
    },
    {
      checker: hashtags.some((hash) => hash.length === 1),
      error: ErrorMessages.EMPTY_HASHTAG,
    },
    {
      checker: hashtags.some((hash) => !ALLOWED_SYMBOLS.test(hash)),
      error: ErrorMessages.NO_PROHIBITED_SYMBOLS,
    },
    {
      checker: !isUniqueHashtags(hashtagsCopy),
      error: ErrorMessages.NO_REPEAT,
    }
  ];
  return errorCheckers.every((check) => {
    const isInvalid = check.checker;
    if (isInvalid){
      errorMessage = check.error;
    }
    return !isInvalid;
  });
};

const isValidComment = (value) => {
  errorMessage = '';
  const comment = value;
  if (comment.length === 0) {
    return true;
  }

  const errorChecker = {
    checker: !getLineLength(comment, MAX_COMMENT_LENGTH),
    error: ErrorMessages.MAX_COMM_LENGTH,
  };
  const isInvalid = errorChecker.checker;
  if (isInvalid) {
    errorMessage = errorChecker.error;
  }
  return !isInvalid;
};

const validateForm = () => {
  pristine.addValidator(hashtagText, isValidHashtag, getErrorMessage);
  pristine.addValidator(descriptionText, isValidComment, getErrorMessage);
};

const uploadPhoto = () => {
  photoLoader.addEventListener('change', onUploadPhoto);
  validateForm();
};

const closeEditor = () => {
  document.body.classList.remove('modal-open');
  photoEditor.classList.add('hidden');
  photoLoader.value = '';
  hashtagText.value = '';
  closeEditorButton.removeEventListener('click', onCloseEditorButton);
  window.removeEventListener('keydown', onEscapeKeydown);
};

const onSubmitButton = () => {
  let isActive = true;
  for (const elem of fieldWrapper.children) {
    if (elem.classList.contains('has-danger')) {
      isActive = false;
    }
  }
  submitButton.disabled = !isActive;
};

const removeEscEvent = (field) => {
  field.addEventListener('focus', () => {
    window.removeEventListener('keydown', onEscapeKeydown);
  });
  field.addEventListener('blur', () => {
    window.addEventListener('keydown', onEscapeKeydown);
  });
};

function onUploadPhoto() {
  document.body.classList.add('modal-open');
  photoEditor.classList.remove('hidden');
  hashtagText.addEventListener('input', onSubmitButton);
  descriptionText.addEventListener('input', onSubmitButton);
  closeEditorButton.addEventListener('click', onCloseEditorButton);
  window.addEventListener('keydown', onEscapeKeydown);
  removeEscEvent(hashtagText);
  removeEscEvent(descriptionText);
}

function onCloseEditorButton(evt) {
  evt.preventDefault();
  closeEditor();
}

function onEscapeKeydown(evt) {
  if (isEscapeKey(evt)) {
    closeEditor();
  }
}

export {uploadPhoto};
