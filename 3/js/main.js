const apartmentTypes = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const checkTime = ['12:00', '13:00', '14:00'];
const featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const photosList = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const SIMILAR_OBJECT_COUNT = 10;

const getRandomInteger = (min, max) => {
  if(min >= max){
    const numSaver = min;
    min = max;
    max = numSaver;
  }
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const getRandomFractional = (min, max, symbolsCount = 1) => {
  if(min >= max){
    const numSaver = min;
    min = max;
    max = numSaver;
  }
  return (min + Math.random() * (max - min)).toFixed(symbolsCount);
};

const getArrayRandElement = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const getArrayRandElementsList = (array) => {
  const randomElementsList = [];

  for(let i = 0; i < getRandomInteger(1, array.length); i++){
    randomElementsList.push(array[i]);
  }

  return randomElementsList;
};

const createRandomLat = () => {
  const randomLat = +getRandomFractional(35.65000, 35.70000, 5);
  return randomLat;
};

const createRandomLng = () => {
  const randomLng = +getRandomFractional(139.70000, 139.80000, 5);
  return randomLng;
};


const createAuthor = () => {
  let randomNum = String(getRandomInteger(1, 10));

  if(randomNum.length < 2){
    randomNum = 0 + randomNum;
  }

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
  checkin: getArrayRandElement(checkTime),
  checkout: getArrayRandElement(checkTime),
  features: getArrayRandElementsList(featuresList),
  description: 'Description about cute flat',
  photos: getArrayRandElementsList(photosList)
});

const createObject = () => {
  const randomLat = createRandomLat();
  const randomLng = createRandomLng();

  return {
    author: createAuthor(),
    location: createLocation(randomLat, randomLng),
    offer: createOffer(randomLat, randomLng)
  };
};

const similarObjects = Array.from({length: SIMILAR_OBJECT_COUNT}, createObject);
