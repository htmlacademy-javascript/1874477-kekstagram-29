import { EFFECTS } from './data.js';
import { photoPreview } from './upload-picture.js';

const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');
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
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  });
};

const createEffect = () => {
  if (currentEffect === 'none') {
    photoPreview.style.removeProperty('filter');
    return;
  }

  const style = EFFECTS[currentEffect].style;
  const unit = EFFECTS[currentEffect].unit;

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
    updateOptionsSlider(EFFECTS[currentEffect]);
  } else {
    sliderContainer.classList.remove('hidden');
    currentEffect = evt.target.value;
    updateOptionsSlider(EFFECTS[currentEffect]);
  }
};

const init = () => {
  effectsList.querySelector('.effects__radio#effect-none').checked = true;
  createSlider(effectLevelSlider);
  getSliderValue();
  sliderContainer.classList.add('hidden');
  photoPreview.style.removeProperty('filter');
};

export {
  effectLevelSlider,
  effectsList,
  onFilterChange,
  init
};
