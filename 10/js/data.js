import {createComments, createCardPhoto} from './functions.js';

const COMMENT_COUNT = 30;
const PHOTO_COUNT = 25;
const COMMENT_PER_PORTION = 5; // Количество комментариев в порции открытой полноразмерного фото
const SCALE_PER_STEP = 25; // Шаг маштабирования фото в форме загрузки фото
const MAX_SCALE = 100; // Максимальное маштабирование фото в форме загрузки фото
const MIN_SCALE = 25; // Минимальное маштабирование фото в форме загрузки фото
const MAX_HASHTAG_COUNT = 5; // Максимальное число хэштегов
const MAX_TEXT_LENGTH = 140; // Максимальная длина комментария в форме загрузки фото

const NAMES = [
  'Петя',
  'Вася',
  'Саша',
  'Паша',
  'Даша',
  'Юлия',
  'Люда',
  'Гоша',
  'Маша',
];

const MESSAGES = [
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Всё отлично!',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.'
];

const DESCRIPTIONS = [
  'Я в космосе.Зацените моё селфи!!!',
  'Как проходит мой отпуск. Найди меня на фото!'
];

const EFFECTS = {
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

createComments(COMMENT_COUNT);
createCardPhoto(PHOTO_COUNT);

export {
  NAMES,
  MESSAGES,
  DESCRIPTIONS,
  EFFECTS,
  COMMENT_COUNT,
  PHOTO_COUNT,
  SCALE_PER_STEP,
  MAX_SCALE,
  MIN_SCALE,
  COMMENT_PER_PORTION,
  MAX_HASHTAG_COUNT,
  MAX_TEXT_LENGTH,
  createCardPhoto
};
