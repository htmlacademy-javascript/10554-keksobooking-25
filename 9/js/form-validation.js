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

const validateTitle = (value) => value.length >= 30 && value.length <= 100;

pristine.addValidator(title, validateTitle, 'От 30 до 100 символов');

const validatePrice = (value) => +value >= +price.dataset.startPrice && +value <= 100000;

const getPriceErrorMessage = () => `Цена может быть от ${price.dataset.startPrice} руб до 100000 руб`;

pristine.addValidator(price, validatePrice, getPriceErrorMessage);

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

const validateRoom = () => roomOptions[numberRooms.value].includes(numberGests.value);

const getRoomErrorMessage = () => `${numberRooms.value} ${roomErrorMessages[numberRooms.value]}`;


pristine.addValidator(numberRooms, validateRoom, getRoomErrorMessage);
pristine.addValidator(numberGests, validateRoom, getRoomErrorMessage);

const onSelectChange = (evt) => {
  if (evt.target.matches('[name="timein"]') || evt.target.matches('[name="timeout"]')) {
    timeinSelect.value = evt.target.value ;
    timeoutSelect.value = evt.target.value;
  }
};

mainForm.addEventListener('change', onSelectChange);

const PRICE_RANGE = {
  'bungalow': '0',
  'flat': '1000',
  'hotel': '3000',
  'house': '5000',
  'palace': '10000'
};

const priceTermChange = (evt) => {
  if (evt.target.matches('[name="type"]')) {
    price.placeholder = `От ${PRICE_RANGE[evt.target.value]}`;
    price.dataset.startPrice = PRICE_RANGE[evt.target.value];
  }
};

mainForm.addEventListener('change', priceTermChange);

mainForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
