import {debounce} from './util.js';
import {renderThumbnails} from './pictures.js';
import {setUserFormSubmit, closeUploadForm} from './form.js';
import {getData} from './api.js';
import './renderBigPicture.js';
import {showError, showSuccess} from './alerts.js';
import {setFilter, showFilters} from './filterPublications.js';
import { TIMEOUT_DELAY } from './data.js';

getData((data) => {
  renderThumbnails(data);
  showFilters();
  setFilter(debounce((filterData) => renderThumbnails(filterData(data)), TIMEOUT_DELAY));
});

setUserFormSubmit(() => {
  closeUploadForm();
  showSuccess();
}, () => {
  closeUploadForm(null, false);
  showError();
});
