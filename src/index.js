import $ from 'jquery';
import domUpdates from './domUpdates';

import './css/base.scss';

import './images/turing-logo.png'
import './images/tripography-logo.svg'
import './images/favicon-32x32.png'

import DataController from './data-controller';
import Traveler from './traveler';
import Trip from './trip';

let dataController = new DataController();
let currentUser;
let currentUsersTrips;
let allDestinations;

const getAllDestinations = async () => {
  let response = await fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/destinations/destinations');
  allDestinations = await response.json();
}

getAllDestinations();

domUpdates.eventListeners();

const instantiateTraveler = async (newUserID) => {
  currentUser = await dataController.getSingleUser(newUserID);
  currentUsersTrips = await dataController.getUsersTrips(newUserID);
  currentUsersTrips = currentUsersTrips.map(trip => {
    let tripDestination = allDestinations.destinations.find(destination => destination.id === trip.destinationID);
    return new Trip(trip, tripDestination);
  });
  currentUser = new Traveler(currentUser, currentUsersTrips);

  console.log(currentUser);
  populateDom(currentUser);
}

const populateDom = (currentUser) => {
  domUpdates.populateUserWidget(currentUser);
  domUpdates.populateTripsWidgetFilter(currentUser);
  domUpdates.populateTripsList(currentUser);
}

export default instantiateTraveler;
