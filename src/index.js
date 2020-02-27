import $ from 'jquery';
import domUpdates from './domUpdates';

import './css/base.scss';

import './images/turing-logo.png'
import './images/tripography-logo.svg'
import './images/favicon-32x32.png'

import DataController from './data-controller';
import Traveler from './traveler';

let dataController = new DataController();

// Fire function to instantiate traveler
const currentTraveler = (newUserID, allUsers) => {
  return new Traveler(newUserID);
}
