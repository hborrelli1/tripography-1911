import $ from 'jquery';
import domUpdates from './domUpdates';
import dashboardConstructor from './dashboard';

import './css/base.scss';

import './images/turing-logo.png'
import './images/tripography-logo.svg'
import './images/favicon-32x32.png'

import DataController from './data-controller';
import Traveler from './traveler';

let dataController = new DataController();
let currentUser;
let currentUsersTrips;

// Fire function to instantiate traveler
const currentTraveler = async (newUserID) => {
  // call dataController to get all users
  currentUser = await dataController.getSingleUser(newUserID);
  currentUser = new Traveler(currentUser, getCurrentUsersTrips(newUserID));


}

const getCurrentUsersTrips = async (newUserID) => {
  currentUsersTrips = await dataController.getUsersTrips(newUserID);

  currentUser.myTrips = currentUsersTrips;
}

export default currentTraveler;
