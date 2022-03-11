import {getSimilarObjects} from './data.js';

const similarCards = getSimilarObjects();
const similarCardData = similarCards[0];
const cardsList = document.querySelector('#map-canvas');
const similarCardTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarPhotoTemplate = similarCardTemplate.querySelector('.popup__photo');
const typeHousingObj = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель'
};

const generateFeatures = (items) => {
  const modifiers = similarCardData.offer.features.map((feature) => `popup__feature--${feature}`);
  items.forEach((item) => {
    const modifier = item.classList[1];
    if (!modifiers.includes(modifier)) {
      item.remove();
    }
  });
};

const generatePhotos = (parentBlock) => {
  parentBlock.innerHTML = '';
  for(let i = 0; i < similarCardData.offer.photos.length; i++){
    const photoElement = similarPhotoTemplate.cloneNode(true);
    photoElement.src = similarCardData.offer.photos[i];
    parentBlock.append(photoElement);
  }
};

const createCard = () => {
  const cardElement = similarCardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = similarCardData.author.avatar;
  cardElement.querySelector('.popup__title').textContent = similarCardData.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = similarCardData.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${similarCardData.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = typeHousingObj[similarCardData.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${similarCardData.offer.rooms} комнаты для ${similarCardData.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${similarCardData.offer.checkin}, выезд до ${similarCardData.offer.checkout}`;
  generateFeatures(cardElement.querySelectorAll('.popup__features .popup__feature'));
  cardElement.querySelector('.popup__description').textContent = similarCardData.offer.description;
  generatePhotos(cardElement.querySelector('.popup__photos'));
  cardsList.append(cardElement);
};

export {createCard};
