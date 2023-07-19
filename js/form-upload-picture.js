import { isEscapeKey, normalizeString } from './utils.js';
import { FILE_TYPES } from './config.js';
import { pristine, commentInput, hashtagInput, onFormSubmit } from './validate-form.js';
import { uploadScale, changePhotoScale, resetPhotoScale } from './scale-picture.js';
import { effectLevelSlider, effectsList, effectsPreviews, onFilterChange, initSlider } from './effects-picture.js';

const formUploadPhoto = document.querySelector('.img-upload__form');
const uploadInput = formUploadPhoto.querySelector('.img-upload__input');
const uploadOverlay = formUploadPhoto.querySelector('.img-upload__overlay');
const closeButtonEditor = formUploadPhoto.querySelector('.img-upload__cancel');
const photoPreview = formUploadPhoto.querySelector('.img-upload__preview img');

const closeUploadPhoto = () => {
  uploadInput.value = '';
  commentInput.value = '';
  URL.revokeObjectURL(photoPreview.src);
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  formUploadPhoto.reset();
  pristine.reset();
  effectLevelSlider.noUiSlider.destroy();

  resetPhotoScale();
  removeEvent();
};

const uploadPhoto = () => {
  uploadInput.addEventListener('change', () => {
    const file = uploadInput.files[0];
    const fileName = normalizeString(file.name);

    const isMatching = FILE_TYPES.some((extention) => fileName.endsWith(extention));

    if (isMatching) {
      photoPreview.src = URL.createObjectURL(file);
      effectsPreviews.forEach((preview) => {
        preview.style.backgroundImage = `url(${photoPreview.src})`;
      });
    }

    uploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');

    initSlider();
    addEvent();
  });
};

const onOverlayClick = (evt) => {
  if (evt.target === uploadOverlay || evt.target === closeButtonEditor) {
    closeUploadPhoto();
  }
};

const onPictureEsc = (evt) => {
  if (isEscapeKey(evt) && !hashtagInput.contains(evt.target) && !commentInput.contains(evt.target) && !evt.target.contains(document.querySelector('.error'))) {
    evt.preventDefault();
    closeUploadPhoto();
  }
};

function addEvent() {
  formUploadPhoto.addEventListener('submit', onFormSubmit);
  uploadScale.addEventListener('click', changePhotoScale);
  effectsList.addEventListener('change', onFilterChange);
  closeButtonEditor.addEventListener('click', closeUploadPhoto);
  uploadOverlay.addEventListener('click', onOverlayClick);
  document.addEventListener('keydown', onPictureEsc);
}

function removeEvent() {
  formUploadPhoto.removeEventListener('submit', onFormSubmit);
  uploadScale.removeEventListener('click', changePhotoScale);
  effectsList.removeEventListener('change', onFilterChange);
  closeButtonEditor.removeEventListener('click', closeUploadPhoto);
  document.removeEventListener('keydown', onPictureEsc);
  uploadOverlay.removeEventListener('click', onOverlayClick);
}

export {
  photoPreview,
  uploadPhoto,
  closeUploadPhoto
};
