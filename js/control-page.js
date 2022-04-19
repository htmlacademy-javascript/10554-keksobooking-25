const mainForm = document.querySelector('.ad-form');
const mainFormChildren = mainForm.querySelectorAll('fieldset');
const mapFilter = document.querySelector('.map__filters');
const mapFilterChildren = mapFilter.querySelectorAll('.map__filter');

const enableInactiveState = () => {
  mainForm.classList.add('ad-form--disabled');
  mainFormChildren.forEach((item) => {
    item.disabled = true;
  });
  mapFilter.classList.add('map__filters--disabled');
  mapFilterChildren.forEach((item) => {
    item.disabled = true;
  });
};

enableInactiveState();
