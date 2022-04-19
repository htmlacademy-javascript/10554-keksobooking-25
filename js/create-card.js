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
  if(data.offer.features !== undefined){
    const modifiers = data.offer.features.map((feature) => `popup__feature--${feature}`);

    items.forEach((item) => {
      const modifier = item.classList[1];
      if (!modifiers.includes(modifier)) {
        item.remove();
      }
    });
  } else {
    items[0].parentNode.classList.add('hidden');
  }
};

const generatePhotos = (parentBlock, data) => {
  if(data.offer.photos !== undefined){
    parentBlock.innerHTML = '';
    data.offer.photos.forEach((item) => {
      const photoElement = similarPhotoTemplate.cloneNode(true);
      photoElement.src = item;
      parentBlock.append(photoElement);
    });
  } else {
    parentBlock.classList.add('hidden');
  }
};


const createCard = (data) => {
  const cardElement = similarCardTemplate.cloneNode(true);
  if(data.author.avatar !== undefined){
    cardElement.querySelector('.popup__avatar').src = data.author.avatar;
  } else {
    cardElement.querySelector('.popup__avatar').classList.add('hidden');
  }

  if(data.offer.title !== undefined){
    cardElement.querySelector('.popup__title').textContent = data.offer.title;
  } else {
    cardElement.querySelector('.popup__title').classList.add('hidden');
  }

  if(data.offer.address !== undefined){
    cardElement.querySelector('.popup__text--address').textContent = data.offer.address;
  } else {
    cardElement.querySelector('.popup__text--address').classList.add('hidden');
  }

  if(data.offer.price !== undefined){
    cardElement.querySelector('.popup__text--price').textContent = `${data.offer.price} ₽/ночь`;
  } else {
    cardElement.querySelector('.popup__text--price').classList.add('hidden');
  }

  if(data.offer.type !== undefined){
    cardElement.querySelector('.popup__type').textContent = typeHousing[data.offer.type];
  } else {
    cardElement.querySelector('.popup__type').classList.add('hidden');
  }

  if(data.offer.rooms !== undefined && data.offer.guests !== undefined){
    cardElement.querySelector('.popup__text--capacity').textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;
  } else {
    cardElement.querySelector('.popup__text--capacity').classList.add('hidden');
  }

  if(data.offer.checkin !== undefined && data.offer.checkout !== undefined){
    cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;
  } else {
    cardElement.querySelector('.popup__text--time').classList.add('hidden');
  }

  generateFeatures(cardElement.querySelectorAll('.popup__features .popup__feature'), data);

  if(data.offer.description !== undefined){
    cardElement.querySelector('.popup__description').textContent = data.offer.description;
  } else {
    cardElement.querySelector('.popup__description').classList.add('hidden');
  }

  generatePhotos(cardElement.querySelector('.popup__photos'), data);

  return cardElement;
};

export {createCard};
