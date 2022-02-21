function getRandomInteger(min, max) {
  if(min >= max){
    const numSaver = min;
    min = max;
    max = numSaver;
  }
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

getRandomInteger(25, 10);


function getRandomFractional(min, max, symbolsCount) {
  if(min >= max){
    const numSaver = min;
    min = max;
    max = numSaver;
  }
  return (min + Math.random() * (max - min)).toFixed(symbolsCount);
}

getRandomFractional(1, 2.58, 6);
