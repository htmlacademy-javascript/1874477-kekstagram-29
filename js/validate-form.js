import { MAX_HASHTAG_COUNT, HASHTAG_REX_EXP } from './config.js';
import { validateString } from './utils.js';
import { postData } from './api.js';
import { showSuccessPopup, showErrorPopup } from './render-notifications.js';
import { closeUploadPhoto } from './form-upload-picture.js';

const formUploadPhoto = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');
const SubmitButtonText = {
  DEFAULT: 'Опубликовать',
  SENDING: 'Публикую...'
};
let errorHashtagMessage = '';

const pristine = new Pristine(formUploadPhoto, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
  errorTextTag: 'p'
});

const validateHashtags = () => {
  const hashtags = hashtagInput.value.trim().toLowerCase().split(/\s+/);
  const uniqueHashtags = new Set(hashtags.map((item) => item.toLowerCase()));
  let isValid = true;

  if (hashtags.length === 0) {
    return true;
  }

  if (uniqueHashtags.size > MAX_HASHTAG_COUNT) {
    isValid = false;
    errorHashtagMessage = 'Нельзя указать больше пяти хэш-тегов';
  } else {
    for (const hashtag of hashtags) {
      if (hashtag === '') {
        continue;
      }
      if (!HASHTAG_REX_EXP.test(hashtag)) {
        isValid = false;
        errorHashtagMessage = `Хэш-тег "${hashtag}" некорректен`;
        break;
      }
      if (hashtags.indexOf(hashtag) !== hashtags.lastIndexOf(hashtag)) {
        isValid = false;
        errorHashtagMessage = `Один и тот же хэш-тег "${hashtag}" не может быть использован дважды`;
        break;
      }
    }
  }

  return isValid;
};

pristine.addValidator(
  hashtagInput,
  validateHashtags,
  () => errorHashtagMessage || 'Хэш-тег некорректен'
);

pristine.addValidator(
  commentInput,
  validateString,
  'Длина комментария не может составлять больше 140 символов'
);

const initSuccesForm = () => {
  closeUploadPhoto();
  showSuccessPopup();
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.DEFAULT;
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    blockSubmitButton();
    postData(new FormData(evt.target))
      .then(() => {
        initSuccesForm();
      })
      .catch(() => {
        showErrorPopup();
      })
      .finally(unblockSubmitButton);
  }
};

export {
  hashtagInput,
  commentInput,
  validateString,
  validateHashtags,
  pristine,
  onFormSubmit
};
