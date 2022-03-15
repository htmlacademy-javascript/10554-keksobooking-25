const mainForm = document.querySelector('.ad-form');
const mainFormChildren = mainForm.querySelectorAll('fieldset');
const mapFilter = document.querySelector('.map__filters');
const mapFilterChildren = mapFilter.querySelectorAll('.map__filter');

const enableInactiveState = () => {
  mainForm.classList.add('ad-form--disabled');
  mainFormChildren.forEach((item) => {
    item.setAttribute('disabled', 'disabled');
  });
  mapFilter.classList.add('ad-form--disabled');
  mapFilterChildren.forEach((item) => {
    item.setAttribute('disabled', 'disabled');
  });
};

const enableActiveState = () => {
  mainForm.classList.remove('ad-form--disabled');
  mainFormChildren.forEach((item) => {
    item.removeAttribute('disabled');
  });
  mapFilter.classList.remove('ad-form--disabled');
  mapFilterChildren.forEach((item) => {
    item.removeAttribute('disabled');
  });
};

export {enableInactiveState, enableActiveState};
