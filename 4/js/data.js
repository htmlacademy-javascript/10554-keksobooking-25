import {getRandomInteger, getArrayRandElement, getArrayRandElementsList, createRandomLat, createRandomLng} from './util.js';

const apartmentTypes = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const checkTimeItems = ['12:00', '13:00', '14:00'];
const featureItems = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const photoLinks = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const SIMILAR_OBJECT_COUNT = 10;


const createAuthor = () => {
  let randomNum = String(getRandomInteger(1, 10));

  randomNum = randomNum.length < 2 ? 0 + randomNum : randomNum;

  return {
    avatar: `img/avatars/user${randomNum}.png`
  };
};

const createLocation = (randomLat, randomLng) => ({
  lat: randomLat,
  lng: randomLng
});

const createOffer = (randomLat, randomLng) => ({
  title: 'Cute flat',
  address: `${randomLat}, ${randomLng}`,
  price: getRandomInteger(0, 99999),
  type: getArrayRandElement(apartmentTypes),
  rooms: getRandomInteger(1, 6),
  quests: getRandomInteger(1, 50),
  checkin: getArrayRandElement(checkTimeItems),
  checkout: getArrayRandElement(checkTimeItems),
  features: getArrayRandElementsList(featureItems),
  description: 'Description about cute flat',
  photos: getArrayRandElementsList(photoLinks)
});

const createObject = () => {
  const randomLat = createRandomLat(35.65000, 35.70000, 5);
  const randomLng = createRandomLng(139.70000, 139.80000, 5);

  return {
    author: createAuthor(),
    location: createLocation(randomLat, randomLng),
    offer: createOffer(randomLat, randomLng)
  };
};

const getSimilarObjects = () => Array.from({length: SIMILAR_OBJECT_COUNT}, createObject);

export {getSimilarObjects};
