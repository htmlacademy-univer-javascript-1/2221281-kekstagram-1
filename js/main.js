import './util.js';
import { arrayPublications } from './data.js';
import { renderThumbnails } from './pictures.js';
import {uploadPhoto} from './form.js';

renderThumbnails(arrayPublications);

uploadPhoto();
