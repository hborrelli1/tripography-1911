import $ from 'jquery';
import domUpdates from './domUpdates';
var moment = require('moment');

import './css/base.scss';

import './images/turing-logo.png';
import './images/tripography-logo.svg';
import './images/favicon-32x32.png';
import './images/close-button.png';
import './images/check-mark.png';
import './images/plus.png';

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
  let allUsers = await dataController.getAllUsers();

  domUpdates.populateUserWidget(currentUser);
  domUpdates.populateTripsWidgetFilter(currentUser, allUsers);
  domUpdates.populateTripsList(currentUser, currentUser.myTrips, allUsers);
}

const populateAgentDashboard = async () => {
  let allTrips = await dataController.getUsersTrips();
  let allUsers = await dataController.getAllUsers();

  allTrips = allTrips.trips.map(trip => {
    let tripDestination = allDestinations.destinations.find(destination => destination.id === trip.destinationID)
    return new Trip(trip, tripDestination);
  });

  agent = new Agent('agent', allTrips);

  agent.getTodaysTravelers(allTrips);
  domUpdates.populateUserWidget(agent);
  domUpdates.populateTripsWidgetFilter(agent, allUsers);

  let pendingTrips = await dataController.getPendingTrips();
  pendingTrips = pendingTrips.map(trip => {
    let tripDestination = allDestinations.destinations.find(destination => destination.id === trip.destinationID)
    return new Trip(trip, tripDestination);
  });

  domUpdates.populateTripsList(agent, pendingTrips, allUsers);

  $('#search').on('change', async function() {
    let allUsers = await dataController.getAllUsers();
    domUpdates.searchForUser(allTrips, allUsers, allDestinations);
  });
}

const makeEstimatedCostHTML = (destinationInfo, tripEstimate) => {
  return `<div class="trip-estimate-img" style="background-image:url(${destinationInfo.image})"></div>
    <h4>Confirm Trip Booking:</h4>
    <h2><span>To:</span>${destinationInfo.destination}</h2>
    <p class="trip-total"><span>Total:</span> ${tripEstimate}</p>
    <button id="confirmTripBooking" class="confirm" type="button"><img src="./images/check-mark.png" alt="confirm trip booking">Confirm Booking</button>
  `;
}

const calculateEstimatedTotalTripRequest = (allDestinations, currentTraveler) => {
  let durationValue = $('#tripDuration').val() != '';
  let travelersValue = $('#tripDuration').val() != '';
  let selectValue = $('#tripDestination').val() != '';

  if ( durationValue && travelersValue && selectValue) {
    $('.trip-estimate-container').empty();

    let tripDate = $( "#datePicker" ).val();
    let formattedDate = moment(tripDate).format('YYYY/MM/DD');
    let destinationID = Number($( "#tripDestination option:selected" ).val());
    let numOfTravelers = Number($( "#numTravelers" ).val());
    let tripDuration = Number($( "#tripDuration" ).val());

    let destinationInfo = allDestinations.destinations.find(place => place.id === destinationID);
    let flightCost = destinationInfo.estimatedFlightCostPerPerson * numOfTravelers;
    let lodgingCost = (destinationInfo.estimatedLodgingCostPerDay * numOfTravelers) * tripDuration;
    let tripTotal = flightCost + lodgingCost;
    let totalPlusAgentFee = tripTotal + (tripTotal * .10);

    let tripEstimate = totalPlusAgentFee.toLocaleString("en-US", { style: "currency", currency: "USD" });
    let generatedHTML = makeEstimatedCostHTML(destinationInfo, tripEstimate);

    $('.trip-estimate-container').append(`${generatedHTML}`);
    $('#confirmTripBooking').on('click', async function() {

      confirmTripBooking(currentUser, destinationInfo, numOfTravelers, formattedDate, tripDuration);
    });
  }
}

const confirmTripBooking = async (currentUser, destinationInfo, numOfTravelers, formattedDate, tripDuration) => {
  let tripPost = {
    "id": Date.now(),
    "userID": currentUser.id,
    "destinationID": destinationInfo.id,
    "travelers": numOfTravelers,
    "date": formattedDate,
    "duration": tripDuration,
    "status": "pending",
    "suggestedActivities": []
  }

  let bookingResponse = await dataController.bookTrip(tripPost);

  $('#confirmTripBooking').remove();
  $('.trip-total').append(`<p>${bookingResponse.message}</p>`);
}

const displayTripRequestModal = (currentUser) => {
  if (event.target.id === 'requestTripButton') {
    $('body').addClass('js-modal-open');
    domUpdates.showTripRequestModal(allDestinations);

    $(document).on("change", "#tripRequestForm input, #tripRequestForm select", function () {
      calculateEstimatedTotalTripRequest(allDestinations, currentUser);
    });
  }
}

const approveTripRequest = async (event) => {
  let tripID = Number(event.target.id);
  let approvePost = {
     "id": tripID,
     "status": "approved"
  }

  await dataController.approveTrip(approvePost);
}

const denyTripRequest = (event) => {
  let tripID = Number(event.target.id);
  let deletePost = {
     "id": tripID,
  }

  dataController.denyTrip(deletePost);
}

const regenerateTrips = async () => {
  $('.traveler-trip-list').empty();

  let allTrips = await dataController.getUsersTrips();
  let allUsers = await dataController.getAllUsers();

  return allTrips = allTrips.trips.map(trip => {
    let tripDestination = allDestinations.destinations.find(destination => destination.id === trip.destinationID)
    return new Trip(trip, tripDestination);
  });
}

const agentActions = async (event) => {
  if (event.target.dataset.status === 'approve') {
    let allUsers = await dataController.getAllUsers();
    await approveTripRequest(event);

    let updatedTrips = await regenerateTrips();
    await domUpdates.populateTripsList(agent, updatedTrips, allUsers);
  }

  if (event.target.dataset.status === 'deny' || event.target.dataset.status === 'delete') {
    let allUsers = await dataController.getAllUsers();
    await denyTripRequest(event);

    let updatedTrips = await regenerateTrips();
    await domUpdates.populateTripsList(agent, updatedTrips, allUsers);
  }
}

// Start App
getAllDestinations();

$('#loginButton').on('click', login);
$('#userName, #password').on('keyup', domUpdates.validateForm);
$('main').on('click', function(event) {
  displayTripRequestModal();
  agentActions(event);
});

export default instantiateTraveler;
