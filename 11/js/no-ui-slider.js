const mainForm = document.querySelector('.ad-form');
const rangeElement = mainForm.querySelector('.ad-form__slider');
const price = mainForm.querySelector('[name="price"]');

noUiSlider.create(rangeElement, {
  range: {
    min: 1000,
    max: 100000
  },
  step: 1,
  start: 1000,
  conect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  }
});

rangeElement.noUiSlider.on('update', () => {
  price.value = rangeElement.noUiSlider.get();
});

const updateSlider = (evt) => {
  if (evt.target.matches('[name="type"]')) {
    rangeElement.noUiSlider.updateOptions({
      range: {
        min: +price.dataset.startPrice,
        max: 100000
      },
      start: +price.dataset.startPrice
    });
  }
};

mainForm.addEventListener('change', updateSlider);
