import './util.js';
import {renderThumbnails} from './pictures.js';
import {setUserFormSubmit, closeUploadForm} from './form.js';
import {getData} from './api.js';
import './renderBigPicture.js';
import {showError, showSuccess} from './alerts.js';

getData(renderThumbnails);

setUserFormSubmit(() => {
  closeUploadForm();
  showSuccess();
}, () => {
  closeUploadForm(null, false);
  showError();
});
