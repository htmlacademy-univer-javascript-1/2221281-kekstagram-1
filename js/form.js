import { ALLOWED_SYMBOLS, MAX_HASHTAG_COUNT } from './data.js';
import {isEscapeKey} from './util.js';
import {smartSlider} from './slider.js';
import {scaleImage} from './scaling.js';
import {sendData} from './api.js';
import { showError } from './alerts.js';
import { checkFileType } from './correctFile.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');

const smartSliderFilters = smartSlider('none', effectLevelSlider, effectLevelValue);
const scaleUploadImage = scaleImage(scaleControlValue, imgPreview);
const imgUploadSubmit = document.querySelector('.img-upload__submit');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text'
});

const getHashtags = (value) => value.toLowerCase().trim().split(/\s+/);

const applyChanges = (value) => {
  imgPreview.classList.remove(`effects__preview--${smartSliderFilters.getCurrentFilter()}`);
  smartSliderFilters.setCurrentFilter(value);
  imgPreview.classList.add(`effects__preview--${smartSliderFilters.getCurrentFilter()}`);
  effectLevelSlider.noUiSlider.updateOptions(smartSliderFilters.getOptions());
  imgPreview.style.filter = smartSliderFilters.getStyles();
};

pristine.addValidator(textHashtags, (value) => {
  if (value !== '') {
    const hashTagsArray = getHashtags(value);
    const hashTagsSet = new Set(hashTagsArray);

    if (hashTagsSet.size !== hashTagsArray.length) {
      return false;
    }
  }
  return true;
}, 'Хештеги регистронезависимы и не должны повторяться');

pristine.addValidator(textHashtags, (value) => {
  if (value !== '') {
    const hashTagsArray = getHashtags(value);

    if (hashTagsArray.length > MAX_HASHTAG_COUNT) {
      return false;
    }
  }
  return true;
}, `Максимальное число хештегов - ${MAX_HASHTAG_COUNT}`);

pristine.addValidator(textHashtags, (value) => {
  if (value === '') {
    return true;
  }

  const hashTagsArray = getHashtags(value);
  return hashTagsArray.every((hashtag) => ALLOWED_SYMBOLS.test(hashtag));
}, 'Один из введённых вами хештегов некорректен');

const closeUploadForm = (evt = null, clear = true) => {
  if (evt === null || (isEscapeKey(evt) && document.activeElement !== textHashtags && document.activeElement !== textDescription) || evt.type === 'click') {
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', closeUploadForm);
    uploadCancel.removeEventListener('click', closeUploadForm);

    if (clear) {
      imgUploadForm.reset();
      scaleUploadImage.initializeScale();
      applyChanges('none');
    }
  }
};

uploadFile.addEventListener('change', (evt) => {
  const file = evt.target.files[0];
  const isCorrectFileType = checkFileType(file);

  if (isCorrectFileType) {
    imgPreview.src = URL.createObjectURL(file);
    imgUploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', closeUploadForm);
    uploadCancel.addEventListener('click', closeUploadForm);
  } else {
    showError();
  }
});

const blockSubmitButton = () => {
  imgUploadSubmit.disabled = true;
  imgUploadSubmit.textContent = 'Публикация...';
};

const unblockSubmitButton = () => {
  imgUploadSubmit.disabled = false;
  imgUploadSubmit.textContent = 'Опубликовать';
};

const setUserFormSubmit = (onSuccess, onError) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          onError();
          unblockSubmitButton();
        },
        new FormData(imgUploadForm)
      );
    }
  });
};

scaleControlSmaller.addEventListener('click', scaleUploadImage.decreaseValue);
scaleControlBigger.addEventListener('click', scaleUploadImage.increaseValue);

noUiSlider.create(effectLevelSlider, smartSliderFilters.getOptions());

effectLevelSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  imgPreview.style.filter = smartSliderFilters.getStyles();
});

effectsList.addEventListener('click', (evt) => {
  const effectsItems = evt.target.closest('.effects__item');
  if (effectsItems) {
    const value = effectsItems.querySelector('.effects__radio').value;
    applyChanges(value);
  }
});

export {setUserFormSubmit, closeUploadForm};
