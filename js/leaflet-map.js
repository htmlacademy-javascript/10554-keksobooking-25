import { enableActiveStateForm, enableActiveStateFilter, listenUserForm} from './control-form.js';
import { createCard } from './create-card.js';
import { getData } from './data-api.js';
import {onErrorGetServer} from './control-msg.js';
import {addFilterListener} from './filter-map.js';

const START_LAT_DATA = 35.69756;
const START_LNG_DATA = 139.76655;
const MAX_MARKERS = 10;
const MAP_ZOOM = 12;
const addressCoordinates = document.querySelector('[name="address"]');


const map = L.map('map-canvas');

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (data) => {
  markerGroup.clearLayers();
  const markers = data.slice(0, MAX_MARKERS);
  markers.forEach((item) => {
    const marker = L.marker({
      lat: item.location.lat,
      lng: item.location.lng
    },
    {
      icon,
    });

    marker
      .addTo(markerGroup)
      .bindPopup(createCard(item));
  });

};

const onGetDataFromServer = (data) => {
  createMarker(data);
  addFilterListener(data);
  listenUserForm(data);
  enableActiveStateFilter();
};

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: START_LAT_DATA,
    lng: START_LNG_DATA,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainMarker.addTo(map);

mainMarker.on('move', (evt) => {
  addressCoordinates.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

const loadMap = () => {
  map.on('load', () => {
    getData(onGetDataFromServer, onErrorGetServer);
    addressCoordinates.value = `${START_LAT_DATA}, ${START_LNG_DATA}`;
  })
    .setView({
      lat: START_LAT_DATA,
      lng: START_LNG_DATA,
    }, MAP_ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  map.whenReady(enableActiveStateForm);
};

const resetMap = () => {
  mainMarker.setLatLng({
    lat: START_LAT_DATA,
    lng: START_LNG_DATA,
  });
  map.setView({
    lat: START_LAT_DATA,
    lng: START_LNG_DATA,
  }, MAP_ZOOM);
  map.closePopup();
};


export {START_LAT_DATA, START_LNG_DATA, resetMap, createMarker, loadMap};
