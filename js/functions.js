function validateStringLength(string, validLength) {
  return string.length <= validLength;
}

// console.log(validateStringLength ('проверяемая строка', 20));

function validatePalindrome(string) {
  const normalizeString = string.replaceAll(' ', '').toLowerCase();
  let resultString = '';
  for (let i = normalizeString.length - 1; i >= 0; i--) {
    resultString += normalizeString[i];
  }
  return normalizeString === resultString;
}

// console.log(validatePalindrome('Лёша на полке клопа нашёл '))

function getNumbersFromString(string) {
  string = typeof string === 'number' ? string.toString() : string; // если в качестве параметра пришло число.

  let result = '';
  for (let i = 0; i <= string.length - 1; i++) {
    const number = parseInt(string[i], 10);

    if (Number.isNaN(number) === false) {
      result += number;
    }
  }
  return result.length > 0 ? Number(result) : NaN;
}

// console.log(getNumbersFromString('1 кефир, 0.5 батона'))
