import {enableInactiveState, enableActiveStateForm, enableActiveStateFilter} from './control-form.js';
import { createCard } from './create-card.js';
import { getData } from './data-api.js';
import {onErrorGetServer} from './control-msg.js';

enableInactiveState();

const START_LAT_DATA = 35.69756;
const START_LNG_DATA = 139.76655;


const map = L.map('map-canvas')
  .on('load', () => {
    enableActiveStateForm();
    document.querySelector('[name="address"]').value = `${START_LAT_DATA}, ${START_LNG_DATA}`;
  })
  .setView({
    lat: START_LAT_DATA,
    lng: START_LNG_DATA,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


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
  document.querySelector('[name="address"]').value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});


const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (data) => {
  markerGroup.clearLayers();
  const markers = data.slice(0, 10);
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
  enableActiveStateFilter();
};

getData(createMarker, onErrorGetServer);

export {START_LAT_DATA, START_LNG_DATA, map, mainMarker, createMarker};
