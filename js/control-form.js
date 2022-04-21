import { pristine } from './form-validation.js';
import { sendData} from './data-api.js';
import { onSuccessPost, onErrorPost} from './control-msg.js';
import { START_LAT_DATA, START_LNG_DATA, resetMap, createMarker } from './leaflet-map.js';
import { getAvatarPreviewDefault,  getImagesPreviewDefault} from './image-preview.js';

const mainForm = document.querySelector('.ad-form');
const mainFormChildren = mainForm.querySelectorAll('fieldset');
const mapFilter = document.querySelector('.map__filters');
const mapFilterChildren = mapFilter.querySelectorAll('.map__filter');
const submitButton = mainForm.querySelector('.ad-form__submit');
const resetButton = mainForm.querySelector('.ad-form__reset');
const addressCoordinates = document.querySelector('[name="address"]');


const enableActiveStateForm = () => {
  mainForm.classList.remove('ad-form--disabled');
  mainFormChildren.forEach((item) => {
    item.disabled = false;
  });
};

const enableActiveStateFilter = () => {
  mapFilter.classList.remove('map__filters--disabled');
  mapFilterChildren.forEach((item) => {
    item.disabled = false;
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

const resetForms = (data) => {
  mainForm.reset();
  mapFilter.reset();
  getAvatarPreviewDefault();
  getImagesPreviewDefault();
  createMarker(data);
  addressCoordinates.value = `${START_LAT_DATA}, ${START_LNG_DATA}`;
  resetMap();
};

const resetFormByButton = (data) => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    getAvatarPreviewDefault();
    getImagesPreviewDefault();
    resetForms(data);
  });
};

const onSuccessSubmit = (data) => {
  onSuccessPost();
  unblockSubmitButton();
  resetForms(data);
};

const onErrorSubmit = () => {
  onErrorPost();
  unblockSubmitButton();
};

const listenUserForm = (data) => {
  resetFormByButton(data);
  mainForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    blockSubmitButton();
    if (isValid) {
      sendData(()=>{onSuccessSubmit(data);}, onErrorSubmit, new FormData(evt.target));
    } else {
      unblockSubmitButton();
    }
  });
};


export { enableActiveStateForm, enableActiveStateFilter, listenUserForm};
