/**
* Получение случайного числа заданого интервала
* @param {number} min - начало интервала
* @param {number} max - конец интервала
* @returns {number} - Возвращает случайное целое число из интервала
*/
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

/**
*
* @param {number} min - начало интервала
* @param {number} max - конец интервала
* @param {array} previousValues - вспомогательный массив, для исключения уже полученных уникальных чисел
* @param if используется для остановки цикла, когда перебраны все числа из заданного диапозона min, max
* @returns {number} - Возвращает случайное уникальное целое число из интервала
*/
const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

/**
* Функция для получения случайного элемента из переданного массива
* @param {array} elements - переданный массив
* @param {number} getRandomInteger - генерация случайного числа в интервале от 0 до elements.length
* @returns array[i] , где i случайный индекс элемента массива
*/
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

export {
  getRandomInteger,
  createRandomIdFromRangeGenerator,
  getRandomArrayElement,
  isEscapeKey
};
