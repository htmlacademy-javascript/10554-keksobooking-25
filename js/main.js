import { createCard } from './create-card.js';
import { getSimilarObjects } from './data.js';
import './form-validation.js';

const similarCards = getSimilarObjects();

createCard(similarCards[0]);

