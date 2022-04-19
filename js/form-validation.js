const PRICE_RANGE = {
  'bungalow': '0',
  'flat': '1000',
  'hotel': '3000',
  'house': '5000',
  'palace': '10000'
};
const MIN_NUMBER_OF_CHARACTERS = 30;
const MAX_NUMBER_OF_CHARACTERS = 100;
const MAX_PRICE = 100000;
const roomOptions = {
  '1' : ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};
const roomErrorMessages = {
  '1': 'комната расчитана для одного гостя',
  '2': 'комнаты расчитаны для одного или двух гостей',
  '3': 'комнаты расчитаны для одного, двух или трех гостей',
  '100': 'комнат расчитано не для гостей'
};
const mainForm = document.querySelector('.ad-form');
const title = mainForm.querySelector('[name="title"]');
const numberRooms = mainForm.querySelector('[name="rooms"]');
const numberGests = mainForm.querySelector('[name="capacity"]');
const price = mainForm.querySelector('[name="price"]');
const timeinSelect = mainForm.querySelector('[name="timein"]');
const timeoutSelect = mainForm.querySelector('[name="timeout"]');

const pristine = new Pristine(mainForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});

const validateTitle = (value) => value.length >= MIN_NUMBER_OF_CHARACTERS && value.length <= MAX_NUMBER_OF_CHARACTERS;

pristine.addValidator(title, validateTitle, `От ${MIN_NUMBER_OF_CHARACTERS} до ${MAX_NUMBER_OF_CHARACTERS} символов`);

const validatePrice = (value) => +value >= +price.dataset.startPrice && +value <= MAX_PRICE;

const getPriceErrorMessage = () => `Цена может быть от ${price.dataset.startPrice} руб до ${MAX_PRICE} руб`;

pristine.addValidator(price, validatePrice, getPriceErrorMessage);


const validateRoom = () => roomOptions[numberRooms.value].includes(numberGests.value);

const getRoomErrorMessage = () => `${numberRooms.value} ${roomErrorMessages[numberRooms.value]}`;


pristine.addValidator(numberRooms, validateRoom, getRoomErrorMessage);
pristine.addValidator(numberGests, validateRoom, getRoomErrorMessage);

const onTimeSelectChange = (evt) => {
  if (evt.target.matches('[name="timein"]') || evt.target.matches('[name="timeout"]')) {
    timeinSelect.value = evt.target.value ;
    timeoutSelect.value = evt.target.value;
  }
};

mainForm.addEventListener('change', onTimeSelectChange);


const onPriceInputChange = (evt) => {
  if (evt.target.matches('[name="type"]')) {
    price.placeholder = `От ${PRICE_RANGE[evt.target.value]}`;
    price.dataset.startPrice = PRICE_RANGE[evt.target.value];
  }
};

mainForm.addEventListener('change', onPriceInputChange);

export {pristine};
