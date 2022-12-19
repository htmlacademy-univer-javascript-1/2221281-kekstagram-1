const getRandomNumber = (min, max) => {
  const arrayNumbers = [min, max];
  if (min > max) {
    min = arrayNumbers[1];
    max = arrayNumbers[0];
  }
  if (min < 0 || max < 0) {
    return -1;
  }
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const throttle = (callback, delayBetweenFrames) => {
  let lastTime = 0;

  return (...rest) => {
    const now = new Date();

    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
};

const shuffleArray = (array) => {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  for (let count = 25; count !== 10; count--) {
    array.pop();
  }

  return array;
};

const getLineLength = (string, maxSymbols) => string.length <= maxSymbols;

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomNumber, getLineLength, isEscapeKey, debounce, throttle, shuffleArray};
