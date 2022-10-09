import { randomNumber } from './util';

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

const pushArray = (count) => {
  const array = [];
  for (let i = 1; i <= count; i++) {
    array.push(i);
  }
  return array;
};

const pushArraySplice = (array) => {
  const number = array[randomNumber(0, array.length - 1)];
  array.splice(array.indexOf(number), 1);
  return number;
};

const arrayURL = pushArray(25);
const arrayID = pushArray(25);
const arrayIDComments = pushArray(100);
const commentsArray = (count) => {
  const arrayComments = [];
  for (let i = 0; i < count; i++) {
    arrayComments[i] = {
      id: pushArraySplice(arrayIDComments),
      avatar: `img/avatar-${randomNumber(1, 6)}.svg`,
      message: MESSAGES[randomNumber(0, MESSAGES.length - 1)],
      name: NAMES[randomNumber(0, NAMES.length - 1)]
    };
  }
  return arrayComments;
};

const addPublication = () => {
  for (let i = 0; i < COUNT_PUBLICATIONS; i++) {
    arrayPublications[i] = {
      id: pushArraySplice(arrayID),
      URL: `photos/${pushArraySplice(arrayURL)}.jpg`,
      description: DESCRIPTIONS[randomNumber(0, DESCRIPTIONS.length - 1)],
      likes: randomNumber(15, 100),
      comments: commentsArray(2),
    };
  }
  return arrayPublications;
};

addPublication();

export {arrayPublications};
