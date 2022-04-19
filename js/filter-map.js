import { createMarker } from './leaflet-map.js';
import { debounce } from './util.js';

const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;
const DEBOUNCE_DELAY = 500;

const mapFilter = document.querySelector('.map__filters');
const houseTypeFilter = document.querySelector('#housing-type');
const priceFilter = document.querySelector('#housing-price');
const houseRoomsAmount = document.querySelector('#housing-rooms');
const houseGuestsAmount = document.querySelector('#housing-guests');
const houseFeatures = document.querySelectorAll('.map__checkbox');


const checkPrice = (data) => {
  if (+data.offer.price > LOW_PRICE && +data.offer.price < HIGH_PRICE) {
    return 'middle';
  }
  if (+data.offer.price < LOW_PRICE) {
    return 'low';
  }
  if (+data.offer.price > HIGH_PRICE) {
    return 'high';
  }
};


const checkConformity = (data) => {
  let rank = 0;
  const filterFeaturesValues = [];

  if (data.offer.type === houseTypeFilter.value) {
    rank += 1;
  }

  if (+data.offer.rooms === +houseRoomsAmount.value) {
    rank += 1;
  }

  if (+data.offer.guests === +houseGuestsAmount.value) {
    rank += 1;
  }

  if (checkPrice(data) ===  priceFilter.value) {
    rank += 1;
  }

  houseFeatures.forEach((filterItem) => {
    if(filterItem.checked){
      filterFeaturesValues.push(filterItem.value);
    }
  });

  if(data.offer.features !== undefined){
    for(let i = 0; i < filterFeaturesValues.length; i++) {
      for(let j = 0; j < data.offer.features.length; j++){
        if(filterFeaturesValues[i] === data.offer.features[j]){
          rank += 1;
        }
      }
    }
  }

  data.rank = rank;

  return rank;
};


const getMaxRank = () => {
  let maxRank = 0;
  if (houseTypeFilter.value !== 'any') {
    maxRank += 1;
  }
  if (houseRoomsAmount.value !== 'any') {
    maxRank += 1;
  }
  if (houseGuestsAmount.value !== 'any') {
    maxRank += 1;
  }
  if (priceFilter.value !== 'any') {
    maxRank += 1;
  }

  houseFeatures.forEach((item) => {
    if(item.checked){
      maxRank += 1;
    }
  });

  return maxRank;
};


const sortMarkers = (data) => {
  const maxRank = getMaxRank();

  const filtered = data.filter((el)=>checkConformity(el) === maxRank);

  createMarker(filtered);

};

const addFilterListener = (data) => {
  mapFilter.addEventListener('change', debounce(() => sortMarkers(data), DEBOUNCE_DELAY));
};


export {addFilterListener};
