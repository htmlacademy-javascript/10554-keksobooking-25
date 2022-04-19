const mainForm = document.querySelector('.ad-form');
const rangeElement = mainForm.querySelector('.ad-form__slider');
const price = mainForm.querySelector('[name="price"]');
const MIN_VALUE = 1000;
const MAX_VALUE = 100000;

noUiSlider.create(rangeElement, {
  range: {
    min: MIN_VALUE,
    max: MAX_VALUE
  },
  step: 1,
  start: MIN_VALUE,
  conect: 'lower',
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(0);
    },
    from: (value) => parseFloat(value),
  }
});

rangeElement.noUiSlider.on('update', () => {
  price.value = rangeElement.noUiSlider.get();
});

const onChangeSlider = (evt) => {
  if (evt.target.matches('[name="type"]')) {
    rangeElement.noUiSlider.updateOptions({
      range: {
        min: +price.dataset.startPrice,
        max: MAX_VALUE
      },
      start: +price.dataset.startPrice
    });
  }
};

mainForm.addEventListener('change', onChangeSlider);
