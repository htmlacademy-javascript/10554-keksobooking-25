import { createCard } from './create-card.js';
import { getSimilarObjects } from './data.js';

const similarCards = getSimilarObjects();

createCard(similarCards[0]);

