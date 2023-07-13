import { isEscapeKey } from './util.js';
import { pristine, commentInput, hashtagInput } from './validate-form.js';
import { uploadScale, changePhotoScale, resetPhotoScale } from './scale-picture.js';
import { effectLevelSlider, effectsList, onFilterChange, init } from './filter-picture.js';

const formUploadPhoto = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const photoEditor = document.querySelector('.img-upload__overlay');
const closeButtonEditor = document.querySelector('.img-upload__cancel');
const photoPreview = document.querySelector('.img-upload__preview img');

const onSubmitForm = (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
  pristine.validate();
};

const closePhotoEditor = () => {
  uploadInput.value = '';
  commentInput.value = '';
  URL.revokeObjectURL(photoPreview.src);
  photoEditor.classList.add('hidden');
  document.body.classList.remove('.modal-open');
  formUploadPhoto.reset();
  pristine.reset();
  effectLevelSlider.noUiSlider.destroy();

  resetPhotoScale();
  removeEvent();
};

const uploadPhoto = () => {
  uploadInput.addEventListener('change', () => {
    const file = uploadInput.files[0];
    const url = URL.createObjectURL(file);

    photoEditor.classList.remove('hidden');
    document.body.classList.add('.modal-open');
    photoPreview.src = url;

    init();
    addEvent();
  });
};

const onOverlayClick = (evt) => {
  if (evt.target === photoEditor || evt.target === closeButtonEditor) {
    closePhotoEditor();
  }
};

const onPictureEsc = (evt) => {
  if (isEscapeKey(evt) && !hashtagInput.contains(evt.target) && !commentInput.contains(evt.target)) {
    evt.preventDefault();
    closePhotoEditor();
  }
};

function addEvent() {
  formUploadPhoto.addEventListener('submit', onSubmitForm);
  uploadScale.addEventListener('click', changePhotoScale);
  effectsList.addEventListener('change', onFilterChange);
  closeButtonEditor.addEventListener('click', closePhotoEditor);
  document.addEventListener('click', onOverlayClick);
  document.addEventListener('keydown', onPictureEsc);
}

function removeEvent() {
  formUploadPhoto.removeEventListener('submit', onSubmitForm);
  uploadScale.removeEventListener('click', changePhotoScale);
  effectsList.removeEventListener('change', onFilterChange);
  closeButtonEditor.removeEventListener('click', closePhotoEditor);
  document.removeEventListener('keydown', onPictureEsc);
  document.removeEventListener('click', onOverlayClick);
}

export {
  photoPreview,
  uploadPhoto
};
