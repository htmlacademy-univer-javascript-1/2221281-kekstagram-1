const randomNumber = (min, max) => {
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

export {randomNumber};
