const getRandomInteger = (min, max) => {
  if(min >= max){
    const numSaver = min;
    min = max;
    max = numSaver;
  }
  const randNum = min + Math.random() * (max + 1 - min);
  return Math.floor(randNum);
};

const getRandomFractional = (min, max, symbolsCount = 1) => {
  if(min >= max){
    const numSaver = min;
    min = max;
    max = numSaver;
  }
  return (min + Math.random() * (max - min)).toFixed(symbolsCount);
};

const getArrayRandElement = (arrayItems) => {
  const randomIndex = Math.floor(Math.random() * arrayItems.length);
  return arrayItems[randomIndex];
};

const getArrayRandElementsList = (arrayItems) => {
  const randomElements = [];

  for(let i = 0; i < getRandomInteger(1, arrayItems.length); i++){
    randomElements.push(arrayItems[i]);
  }

  return randomElements;
};

const createRandomLat = (startRange, endRange, symbolsCount) => {
  const randomLat = +getRandomFractional(startRange, endRange, symbolsCount);
  return randomLat;
};

const createRandomLng = (startRange, endRange, symbolsCount) => {
  const randomLng = +getRandomFractional(startRange, endRange, symbolsCount);
  return randomLng;
};


export {getRandomInteger, getArrayRandElement, getArrayRandElementsList, createRandomLat, createRandomLng};
