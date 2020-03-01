import $ from 'jquery';
import domUpdates from './domUpdates';

import './css/base.scss';

import './images/turing-logo.png'
import './images/tripography-logo.svg'
import './images/favicon-32x32.png'

import DataController from './data-controller';
import User from './user';
import Traveler from './traveler';
import Trip from './trip';
import Agent from './agent';

let dataController = new DataController();
let currentUser;
let currentUsersTrips;
let allDestinations;
let agent;

const getAllDestinations = async () => {
  let response = await fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/destinations/destinations');
  allDestinations = await response.json();
}

const login = () => {
  const agencyUser = $('#userName').val() === 'agency';
  const travelerUser = $('#userName').val().match(/traveler/);
  const password = $('#password').val() === 'travel2020';

  if (!password) {
    $('.js-error-message').text('Your password is incorrect, please try again.');
    $('#password').addClass('js-error');
    return;
  }

  if (agencyUser && password) {
    invokeAgentAccount();
  } else if (travelerUser && password) {
    invokeTravelerAccount($('#userName').val());
  }

  $('#loginView').remove();
}

const invokeAgentAccount = () => {
  console.log('agency');
  populateAgentDashboard();
}

const invokeTravelerAccount = (username) => {
  let numberPattern = /\d+/g;
  let newUserID = Number(username.match(numberPattern)[0]);
  instantiateTraveler(newUserID);
}

const instantiateTraveler = async (newUserID) => {
  currentUser = await dataController.getSingleUser(newUserID);
  currentUsersTrips = await dataController.getUsersTrips(newUserID);

  currentUsersTrips = currentUsersTrips.map(trip => {
    let tripDestination = allDestinations.destinations.find(destination => destination.id === trip.destinationID);
    return new Trip(trip, tripDestination);
  });

  currentUser = new Traveler('traveler', currentUsersTrips, currentUser);
  populateTravelDashboard(currentUser, newUserID);
}

const populateTravelDashboard = async (currentUser, newUserID) => {
  currentUsersTrips = await dataController.getUsersTrips(newUserID);

  domUpdates.populateUserWidget(currentUser);
  domUpdates.populateTripsWidgetFilter(currentUser);
  domUpdates.populateTripsList(currentUser);
}

const populateAgentDashboard = async () => {
  let allTrips = await dataController.getUsersTrips();

  allTrips = allTrips.trips.map(trip => {
    let tripDestination = allDestinations.destinations.find(destination => destination.id === trip.destinationID)
    return new Trip(trip, tripDestination);
  });

  agent = new Agent('agent', allTrips);
  console.log(agent);
  domUpdates.populateUserWidget(agent);
  domUpdates.populateTripsWidgetFilter(agent)

  let pendingTrips = await dataController.getPendingTrips();
  pendingTrips = pendingTrips.map(trip => {
    let tripDestination = allDestinations.destinations.find(destination => destination.id === trip.destinationID)
    return new Trip(trip, tripDestination);
  });
  // Display
  domUpdates.populatePendingTrips(pendingTrips);
}

// Start App
getAllDestinations();

$('#loginButton').on('click', login);
$('#userName, #password').on('keyup', domUpdates.validateForm);

export default instantiateTraveler;
