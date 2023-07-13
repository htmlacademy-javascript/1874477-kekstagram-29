import { MAX_HASHTAG_COUNT, MAX_TEXT_LENGTH } from './data.js';

const formUploadPhoto = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const hashtagRegExp = /^#[a-zа-яё0-9]{1,19}$/i;
let errorHashtagMessage = '';

const pristine = new Pristine(formUploadPhoto, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
  errorTextTag: 'p'
}, false);

const validateComment = (value) => value.length <= MAX_TEXT_LENGTH;

const validateHashtags = () => {
  const hashtags = hashtagInput.value.trim().split(/\s+/);
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
      if (!hashtagRegExp.test(hashtag)) {
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
  validateComment,
  'Длина комментария не может составлять больше 140 символов'
);

export {
  hashtagInput,
  commentInput,
  errorHashtagMessage,
  validateComment,
  validateHashtags,
  pristine
};
