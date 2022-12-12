import { getRandomNumber } from './util.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const ALLOWED_SYMBOLS = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const MAX_COMMENT_NUMBER = 5;

const ErrorMessages = {
  STARTS_WITH_HASH: 'Хэш-тег начинается с символа #',
  NO_PROHIBITED_SYMBOLS: 'В хэш-теги используются запрещённые символы (пробелы, спецсимволы, символы пунктуации, эмодзи и т.д.',
  MAX_HASH_LENGTH: `Максимальная длина одного хэш-тега ${MAX_HASHTAG_LENGTH} символов, включая решётку`,
  NO_REPEAT: 'Хэш-теги не должны повторяться',
  MAX_HASH_COUNT: `Максимальное количество хэш-тегов: ${MAX_HASHTAG_COUNT}.`,
  HASH_SPACE: 'Хэш-теги разделяются пробелами',
  MAX_COMM_LENGTH: `Максимальная длина комментария - ${MAX_COMMENT_LENGTH} символов.`,
  EMPTY_HASHTAG: 'Хэш-тег не может быть пустым',
};

const NAMES = [
  'Mike Wazowski',
  'James Sullivan',
  'Buzz Lightyear'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Увлекаюсь фотографией!',
  'Случайный снимок',
  'Снимок с новой камеры!'
];

const COUNT_PUBLICATIONS = 25;

const arrayPublications = [];

const commentsArray = (count) => {
  const array = [];
  for (let i = 0; i <= count; i++) {
    array.push({
      id: i,
      avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
      message: MESSAGES[getRandomNumber(0, MESSAGES.length - 1)],
      name: NAMES[getRandomNumber(0, NAMES.length - 1)]
    });
  }
  return array;
};

const addPublication = () => {
  for (let i = 0; i < COUNT_PUBLICATIONS; i++) {
    arrayPublications[i] = {
      id: i,
      url: `photos/${i + 1}.jpg`,
      description: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length - 1)],
      likes: getRandomNumber(15, 100),
      comments: commentsArray(getRandomNumber(1, 20)),
    };
  }
  return arrayPublications;
};

addPublication();

export {arrayPublications, MAX_COMMENT_LENGTH, MAX_HASHTAG_COUNT,
  MAX_HASHTAG_LENGTH, ErrorMessages, ALLOWED_SYMBOLS, MAX_COMMENT_NUMBER};
