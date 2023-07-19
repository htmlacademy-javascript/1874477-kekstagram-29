const ALERT_TIME = 2000; // Время показа Alert об ошибке в API
const RERENDER_DELAY = 500; // Время задержки перерисовки миниатюр
const COMMENT_PER_PORTION = 5; // Количество комментариев в порции открытой полноразмерного фото
const SCALE_PER_STEP = 25; // Шаг маштабирования фото в форме загрузки фото
const MAX_SCALE = 100; // Максимальное маштабирование фото в форме загрузки фото
const MIN_SCALE = 25; // Минимальное маштабирование фото в форме загрузки фото
const MAX_HASHTAG_COUNT = 5; // Максимальное число хэштегов
const HASHTAG_REX_EXP = /^#[a-zа-яё0-9]{1,19}$/i; // Регулярка для теста Хэш-Тэга
const MAX_TEXT_LENGTH = 140; // Максимальная длина комментария в форме загрузки фото
const FILE_TYPES = ['gif', 'webp', 'jpeg', 'png', 'avif', 'jpg', 'svg']; // Типы файлов для публикации
const THUMBNAILS_AMOUNT = 10; // Фильтр «Случайные» — 10 случайных, не повторяющихся фотографий;

export {
  ALERT_TIME,
  RERENDER_DELAY,
  SCALE_PER_STEP,
  MAX_SCALE,
  MIN_SCALE,
  COMMENT_PER_PORTION,
  MAX_HASHTAG_COUNT,
  HASHTAG_REX_EXP,
  MAX_TEXT_LENGTH,
  FILE_TYPES,
  THUMBNAILS_AMOUNT
};
