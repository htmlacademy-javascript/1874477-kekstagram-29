import { photoPreview } from './form-upload-picture.js';

const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');
const effectsPreviews = document.querySelectorAll('.effects__preview');
const Effects = {
  'none': {
    style: 'none',
    unit: '',
    min: 0,
    max: 0,
    step: 0,
  },
  'chrome': {
    style: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1
  },
  'sepia': {
    style: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1
  },
  'marvin': {
    style: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    step: 1
  },
  'phobos': {
    style: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1
  },
  'heat': {
    style: 'brightness',
    unit: '',
    min: 1,
    max: 3,
    step: 0.1
  },
};
let currentEffect = 'none';

const createSlider = (element) => {
  noUiSlider.create(element, {
    range: {
      min: 0,
      max: 100,
    },
    start: '',
    step: 1,
    connect: 'lower',
  });
};

const createEffect = () => {
  if (currentEffect === 'none') {
    photoPreview.style.removeProperty('filter');
    return;
  }

  const style = Effects[currentEffect].style;
  const unit = Effects[currentEffect].unit;

  photoPreview.style.filter = `${style}(${effectValue.value}${unit})`;
};

const updateOptionsSlider = ({ min, max, step }) => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: { min, max },
    step,
    start: max,
  });
};

const getSliderValue = () => {
  effectLevelSlider.noUiSlider.on('update', () => {
    effectValue.value = effectLevelSlider.noUiSlider.get();
    createEffect();
  });
};

const onFilterChange = (evt) => {
  if (evt.target.value === 'none') {
    sliderContainer.classList.add('hidden');
    currentEffect = evt.target.value;
    updateOptionsSlider(Effects[currentEffect]);
  } else {
    sliderContainer.classList.remove('hidden');
    currentEffect = evt.target.value;
    updateOptionsSlider(Effects[currentEffect]);
  }
};

const initSlider = () => {
  effectsList.querySelector('.effects__radio#effect-none').checked = true;
  createSlider(effectLevelSlider);
  getSliderValue();
  sliderContainer.classList.add('hidden');
  photoPreview.style.removeProperty('filter');
};

export {
  effectLevelSlider,
  effectsList,
  effectsPreviews,
  onFilterChange,
  initSlider
};
