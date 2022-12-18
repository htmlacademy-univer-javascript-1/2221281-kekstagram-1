import { SCALE_STEP, MIN_SCALE_VALUE, MAX_SCALE_VALUE } from './data.js';

const scaleImage = (scaleControlValue, imgPreview) => {
  let scaleValue;

  const applyChanges = () => {
    scaleControlValue.value = `${scaleValue}%`;
    imgPreview.style.transform = `scale(${scaleValue / 100})`;
  };

  const initializeScale = () => {
    scaleValue = MAX_SCALE_VALUE;
    applyChanges();
  };

  initializeScale();

  const increaseValue = () => {
    if (scaleValue !== MAX_SCALE_VALUE) {
      scaleValue += SCALE_STEP;
      applyChanges();
    }
  };

  const decreaseValue = () => {
    if (scaleValue !== MIN_SCALE_VALUE) {
      scaleValue -= SCALE_STEP;
      applyChanges();
    }
  };

  return {
    initializeScale,
    increaseValue,
    decreaseValue,
  };
};

export {scaleImage};
