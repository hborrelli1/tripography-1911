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
  domUpdates.populateTripsList(currentUser, currentUser.myTrips);
}

const populateAgentDashboard = async () => {
  let allTrips = await dataController.getUsersTrips();

  allTrips = allTrips.trips.map(trip => {
    let tripDestination = allDestinations.destinations.find(destination => destination.id === trip.destinationID)
    return new Trip(trip, tripDestination);
  });

  agent = new Agent('agent', allTrips);
  console.log(agent);
  console.log(allTrips);
  agent.getTodaysTravelers(allTrips);
  domUpdates.populateUserWidget(agent);
  domUpdates.populateTripsWidgetFilter(agent)

  let pendingTrips = await dataController.getPendingTrips();
  pendingTrips = pendingTrips.map(trip => {
    let tripDestination = allDestinations.destinations.find(destination => destination.id === trip.destinationID)
    return new Trip(trip, tripDestination);
  });
  domUpdates.populateTripsList(agent, pendingTrips);
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
    console.log(formattedDate);
    let destinationID = Number($( "#tripDestination option:selected" ).val());
    let numOfTravelers = Number($( "#numTravelers" ).val());
    let tripDuration = Number($( "#tripDuration" ).val());

    let destinationInfo = allDestinations.destinations.find(place => place.id === destinationID);
    console.log(destinationInfo);

    let flightCost = destinationInfo.estimatedFlightCostPerPerson * numOfTravelers;
    let lodgingCost = (destinationInfo.estimatedLodgingCostPerDay * numOfTravelers) * tripDuration;
    let tripTotal = flightCost + lodgingCost;
    let totalPlusAgentFee = tripTotal + (tripTotal * .10);

    let tripEstimate = totalPlusAgentFee.toLocaleString("en-US", { style: "currency", currency: "USD" });

    let generatedHTML = makeEstimatedCostHTML(destinationInfo, tripEstimate);

    $('.trip-estimate-container').append(`${generatedHTML}`);

    $('#confirmTripBooking').on('click', async function() {

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
      console.log('trip to post: ', tripPost);

      let bookingResponse = await dataController.bookTrip(tripPost);
      console.log(bookingResponse);

      $('#confirmTripBooking').remove();
      $('.trip-total').append(`<p>${bookingResponse.message}</p>`);
    })
  }
}

const displayTripRequestModal = (currentUser) => {
  if (event.target.id === 'requestTripButton') {
    // Loop through all destinations
    console.log(allDestinations);
    // create a select input with all destinations

    $('body').addClass('js-modal-open');
    domUpdates.showTripRequestModal(allDestinations);

    $(document).on("change", "#tripRequestForm input, #tripRequestForm select", function () {
      calculateEstimatedTotalTripRequest(allDestinations, currentUser);
    });
  }
}

// Start App
getAllDestinations();

$('#loginButton').on('click', login);
$('#userName, #password').on('keyup', domUpdates.validateForm);
$('main').on('click', displayTripRequestModal);

export default instantiateTraveler;
