import {enableInactiveState, enableActiveState} from './control-form.js';
import { createCard } from './create-card.js';
import { getSimilarObjects } from './data.js';

enableInactiveState();

const map = L.map('map-canvas')
  .on('load', () => {
    enableActiveState();
  })
  .setView({
    lat: 35.697567,
    lng: 139.766556,
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
    lat: 35.697567,
    lng: 139.766556,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  document.querySelector('[name="address"]').value = evt.target.getLatLng();
});


const points = getSimilarObjects();

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (data) => {
  const marker = L.marker({
    lat: data.location.lat,
    lng: data.location.lng
  },
  {
    icon,
  });

  marker
    .addTo(markerGroup)
    .bindPopup(createCard(data));
};

points.forEach((point) => {
  createMarker(point);
});
