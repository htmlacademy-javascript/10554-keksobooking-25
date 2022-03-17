
const mainForm = document.querySelector('.ad-form');
const numberRooms = mainForm.querySelector('[name="rooms"]');
const numberGests = mainForm.querySelector('[name="capacity"]');

const pristine = new Pristine(mainForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});

function validateTitle (value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator(
  mainForm.querySelector('#title'),
  validateTitle,
  'От 30 до 100 символов'
);

function validatePrice (value) {
  return value >= '0' && value <= '100000';
}

pristine.addValidator(
  mainForm.querySelector('#price'),
  validatePrice,
  'Цена может быть от 0 руб до 100000 руб'
);

const roomOptions = {
  '1' : ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

const errorMessages = {
  '1': 'комната расчитана для одного гостя',
  '2': 'комнаты расчитаны для одного или двух гостей',
  '3': 'комнаты расчитаны для одного, двух или трех гостей',
  '100': 'комнат расчитано не для гостей'
};

function validateRoom () {
  return roomOptions[numberRooms.value].includes(numberGests.value);
}

function getRoomErrorMessage () {
  return `
  ${numberRooms.value}
  ${errorMessages[numberRooms.value]}
  `;
}

pristine.addValidator(numberRooms, validateRoom, getRoomErrorMessage);
pristine.addValidator(numberGests, validateRoom, getRoomErrorMessage);

mainForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
