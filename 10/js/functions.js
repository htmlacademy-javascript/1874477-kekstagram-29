import {
  NAMES,
  MESSAGES,
  DESCRIPTIONS,
  COMMENT_COUNT
} from './data.js';

import {
  getRandomInteger,
  createRandomIdFromRangeGenerator,
  getRandomArrayElement
} from './util.js';

const validateStringLength = (string, validLength) => string.length <= validLength;

validateStringLength('проверяемая строка', 20);

function validatePalindrome(string) {
  const normalizeString = string.replaceAll(' ', '').toLowerCase();
  let resultString = '';
  for (let i = normalizeString.length - 1; i >= 0; i--) {
    resultString += normalizeString[i];
  }
  return normalizeString === resultString;
}

validatePalindrome('Лёша на полке клопа нашёл ');

function getNumbersFromString(string) {
  string = typeof string === 'number' ? string.toString() : string; // если в качестве параметра пришло число.

  let result = '';
  for (let i = 0; i <= string.length - 1; i++) {
    const number = parseInt(string[i], 10);

    if (!Number.isNaN(number)) {
      result += number;
    }
  }
  return result.length > 0 ? Number(result) : NaN;
}

getNumbersFromString('1 кефир, 0.5 батона');


const createComments = (count) => {
  const comments = [];

  const generateRandomCommentId = createRandomIdFromRangeGenerator(1, COMMENT_COUNT);

  /**
   * Функция для получения сообщения в комментарий
   * @param {number} numberOfMessages - рандомно получаем 1 или 2 сообщения
   * @returns в случае получения 1 сообщения возвращаем его
    * @returns в случае получения 2 сообщений проверяем методом filter на уникальность сообщения и возвращаем их
   */
  const createMessage = () => {
    const numberOfMessages = getRandomInteger(1, 2);
    if (numberOfMessages === 1) {
      return getRandomArrayElement(MESSAGES);
    } else {
      const firstMessage = getRandomArrayElement(MESSAGES);
      const secondMessage = getRandomArrayElement(MESSAGES.filter((msg) => msg !== firstMessage));
      return `${firstMessage} ${secondMessage}`;
    }
  };

  for (let i = 0; i < count; i++) {
    const generateRandomAvatarId = getRandomInteger(1, 6);

    const comment = {
      id: generateRandomCommentId(),
      avatar: `img/avatar-${generateRandomAvatarId}.svg`,
      message: createMessage(),
      name: getRandomArrayElement(NAMES)
    };

    comments.push(comment);
  }

  return comments;
};

/**
 * Функция для создания уникальных карточек фото
 * @param {number} count - количество уникальных фото
 * @param {number} generateRandomCardId - генерация уникального неповторяющего id для карточки
 * @param {number} generateRandomPhotoId - генерация уникального неповторяющего id для url фото
 * @returns возвращает массив с объектами уникальных карточек фото с описанием
 */
const createCardPhoto = (count) => {
  const photos = [];

  const generateRandomCardId = createRandomIdFromRangeGenerator(1, 25);
  const generateRandomPhotoId = createRandomIdFromRangeGenerator(1, 25);

  for (let i = 0; i < count; i++) {

    const photo = {
      id: generateRandomCardId(),
      url: `photos/${generateRandomPhotoId()}.jpg`,
      description: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomInteger(15, 200),
      comments: createComments(getRandomInteger(0, COMMENT_COUNT)),
    };

    photos.push(photo);
  }

  return photos;
};

const MINUTES_IN_HOUR = 60;

function getTimeInMinutes(time) {
  return time.split(':')
    .reduce((acc, cur, index) => index ? acc + Number(cur) : acc + Number(cur) * MINUTES_IN_HOUR, 0);
}

function isAtWorktime(startTime, endTime, meetingTime, duration) {
  const startTimeInMinutes = getTimeInMinutes(startTime);
  const endTimeInMinutes = getTimeInMinutes(endTime);
  const meetingTimeInMinutes = getTimeInMinutes(meetingTime);

  const isMeetingAfterStart = meetingTimeInMinutes >= startTimeInMinutes;
  const isMeetingBeforeEnd = meetingTimeInMinutes + duration <= endTimeInMinutes;

  return isMeetingAfterStart && isMeetingBeforeEnd;
}

isAtWorktime('08:00', '17:30', '14:00', 90);

export {
  createComments,
  createCardPhoto
};
