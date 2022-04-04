import { pristine } from './form-validation.js';
import { sendData } from './data-api.js';
import { onSuccessSubmit, onErrorSubmit } from './control-msg.js';
import { startLatData, startLngData, map, mainMarker } from './leaflet-map.js';

const mainForm = document.querySelector('.ad-form');
const mainFormChildren = mainForm.querySelectorAll('fieldset');
const mapFilter = document.querySelector('.map__filters');
const mapFilterChildren = mapFilter.querySelectorAll('.map__filter');
const submitButton = mainForm.querySelector('.ad-form__submit');
const resetButton = mainForm.querySelector('.ad-form__reset');

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

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const resetForms = () => {
  document.querySelector('.ad-form').reset();
  document.querySelector('.map__filters').reset();
  mainMarker.setLatLng({
    lat: startLatData,
    lng: startLngData,
  });
  map.setView({
    lat: startLatData,
    lng: startLngData,
  }, 12);
  document.querySelector('[name="address"]').value = `${startLatData}, ${startLngData}`;
};

const resetFormByButton = () => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForms();
  });
};

const sendUserForm = () => {
  mainForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    blockSubmitButton();
    if (isValid) {
      sendData(
        () => {
          onSuccessSubmit();
          unblockSubmitButton();
          resetForms();
        },
        () => {
          onErrorSubmit();
          unblockSubmitButton();
        },
        new FormData(evt.target));
    } else {
      unblockSubmitButton();
    }
  });
};


export {enableInactiveState, enableActiveState, sendUserForm, resetFormByButton};
