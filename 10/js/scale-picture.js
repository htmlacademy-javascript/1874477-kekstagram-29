import { photoPreview } from './upload-picture.js';
import { SCALE_PER_STEP, MAX_SCALE, MIN_SCALE } from './data.js';

const uploadScale = document.querySelector('.img-upload__scale');
const scaleControlValue = uploadScale.querySelector('.scale__control--value');
const buttonSmaller = uploadScale.querySelector('.scale__control--smaller');
const buttonBigger = uploadScale.querySelector('.scale__control--bigger');

const changePhotoScale = (evt) => {
  let value = scaleControlValue.value.replace('%', '');
  value = Number(value);
  if (buttonSmaller.contains(evt.target) && value > MIN_SCALE) {
    value -= SCALE_PER_STEP;
  }
  if (buttonBigger.contains(evt.target) && value < MAX_SCALE) {
    value += SCALE_PER_STEP;
  }
  scaleControlValue.value = `${value}%`;
  photoPreview.style.transform = `scale(${value * 0.01})`;
};

const resetPhotoScale = () => {
  scaleControlValue.value = '100%';
  photoPreview.style.transform = '';
};

export {
  uploadScale,
  changePhotoScale,
  resetPhotoScale
};
