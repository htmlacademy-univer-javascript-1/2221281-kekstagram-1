const getRandom = (min, max) => {
  if (min > max) {
    [min, max] = [max, min];
  }
  if (min < 0 || max < 0) {
    return -1;
  }
  return Math.round(Math.random() * (max - min) + min);
};

const checkMaxSymbols = (string, maxSymbols) => {
  if (string.lenght <= maxSymbols) {
    return true;
  }
  return false;
};
