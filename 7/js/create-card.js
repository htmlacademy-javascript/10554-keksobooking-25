const cardsList = document.querySelector('#map-canvas');
const similarCardTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarPhotoTemplate = similarCardTemplate.querySelector('.popup__photo');
const typeHousing = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель'
};

const generateFeatures = (items, data) => {
  const modifiers = data.offer.features.map((feature) => `popup__feature--${feature}`);
  items.forEach((item) => {
    const modifier = item.classList[1];
    if (!modifiers.includes(modifier)) {
      item.remove();
    }
  });
};

const generatePhotos = (parentBlock, data) => {
  parentBlock.innerHTML = '';
  data.offer.photos.forEach((item) => {
    const photoElement = similarPhotoTemplate.cloneNode(true);
    photoElement.src = item;
    parentBlock.append(photoElement);
  });
};

const createCard = (data) => {
  const cardElement = similarCardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = data.author.avatar;
  cardElement.querySelector('.popup__title').textContent = data.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = data.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${data.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = typeHousing[data.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;
  generateFeatures(cardElement.querySelectorAll('.popup__features .popup__feature'), data);
  cardElement.querySelector('.popup__description').textContent = data.offer.description;
  generatePhotos(cardElement.querySelector('.popup__photos'), data);
  cardsList.append(cardElement);
};

export {createCard};
