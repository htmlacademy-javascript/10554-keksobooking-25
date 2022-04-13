import { pristine } from './form-validation.js';
import { sendData, getData } from './data-api.js';
import { onSuccessPost, onErrorPost, onErrorGetServer } from './control-msg.js';
import { START_LAT_DATA, START_LNG_DATA, map, mainMarker, createMarker } from './leaflet-map.js';
import { getAvatarPreviewDefault,  getImagesPreviewDefault} from './image-preview.js';

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

const enableActiveStateForm = () => {
  mainForm.classList.remove('ad-form--disabled');
  mainFormChildren.forEach((item) => {
    item.removeAttribute('disabled');
  });
};

const enableActiveStateFilter = () => {
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
  getAvatarPreviewDefault();
  getImagesPreviewDefault();
  getData(createMarker, onErrorGetServer);
  map.closePopup();
  mainMarker.setLatLng({
    lat: START_LAT_DATA,
    lng: START_LNG_DATA,
  });
  map.setView({
    lat: START_LAT_DATA,
    lng: START_LNG_DATA,
  }, 12);
  document.querySelector('[name="address"]').value = `${START_LAT_DATA}, ${START_LNG_DATA}`;
};

const resetFormByButton = () => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    getAvatarPreviewDefault();
    getImagesPreviewDefault();
    resetForms();
  });
};

const onSuccessSubmit = () => {
  onSuccessPost();
  unblockSubmitButton();
  resetForms();
};

const onErrorSubmit = () => {
  onErrorPost();
  unblockSubmitButton();
};

const listenUserForm = () => {
  mainForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    blockSubmitButton();
    if (isValid) {
      sendData(onSuccessSubmit, onErrorSubmit, new FormData(evt.target));
    } else {
      unblockSubmitButton();
    }
  });
};


export {enableInactiveState, enableActiveStateForm, enableActiveStateFilter, listenUserForm, resetFormByButton};
