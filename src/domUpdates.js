import $ from 'jquery';
import DataController from './data-controller';
import Traveler from './traveler';
import Trip from './trip';
import instantiateTraveler from './index.js';
let dataController = new DataController();
import datepicker from 'js-datepicker';
var moment = require('moment');

const domUpdates = {
  userType: null,

  validateForm() {
    if ( ($('#userName').val() !== '') && ($('#password').val() !== '') ) {
      $('#loginButton').removeAttr('disabled');
    } else {
      $('#loginButton').attr('disabled', 'true');
    }
  },

  populateUserWidget(userInfo) {
    let money = userInfo.userType === 'traveler'
      ? `<p id="totalSpent">Total spent this year: <span>${userInfo.totalSpent}</span></p>`
      : `<p id="totalRevenue">Total revenue this year: <span>${userInfo.totalRevenue}</span></p>`;

    let counter = userInfo.userType === 'traveler'
      ? `<p id="tripCounter">Trip Counter: <span>${userInfo.myTrips.length}</span></p>`
      : `<p id="numberOfTravelersToday">Number of Travelers today: <span>${userInfo.todaysTravelers}</span></p>`;

    let userWidget = `<section class="user-profile-widget widget">
      <h2>User Info</h2>
      <h4 id="userTitle">${userInfo.name}</h4>
      ${money}
      ${counter}
    </section>`;

    $('main').addClass('travel-dashboard').append('<div class="margin-wrapper"></div>');
    $('.margin-wrapper').append(userWidget);
  },

  populateTripsWidgetFilter(userInfo, allUsers) {
    let filterButtons = `<div class="trip-filter-bar">
        <p class="trip-status">Filter By Status:</p>
        <div class="filter-buttons">
        <button class="filter-button" id="allTrips" data-status="all">All</button>
        <button class="filter-button" id="upcomingTrips" data-status="upcoming">Upcoming</button>
        <button class="filter-button" id="pendingTrips" data-status="pending">Pending</button>
        <button class="filter-button" id="currentTrips" data-status="current">Current</button>
        <button class="filter-button" id="pastTrips" data-status="past">Past</button>
      </div>
      <button id="requestTripButton" class="confirm" type="button"><img src="./images/plus.png" alt="request a trip">Request Trip</button>
    </div>`;

    let datalist = '';
    allUsers.travelers.forEach(user => {
      datalist += `<option value="${user.name}">`;
    });

    let tripSearchBar = `<div class="trip-search-bar">
      <label for="search">Search the site:</label>
      <input list="search-users-list" type="search" id="search" name="search bar"
       aria-label="Search through travelers">
      <datalist id="search-users-list">
        ${datalist}
      </datalist>
    </div>`;

    let tripWidgetHeader = userInfo.userType === 'traveler'
      ? filterButtons
      : tripSearchBar;

    let tripWidget = `<section class="trip-widget widget">
      ${tripWidgetHeader}
    </div>`;

    $('.margin-wrapper').append(tripWidget);
  },

  populateTripsList(userInfo, tripsToList, allUsers) {
    let listOfTrips = '';

    let tripsToDisplay = userInfo === 'traveler'
      ? userInfo.myTrips
      : tripsToList;

    tripsToDisplay.forEach(trip => {
      let now = moment().format('YYYY/MM/DD');
      let userName = allUsers.travelers.find(user => user.id === trip.userID).name;

      let approveButton = (userInfo.userType === 'agent' && trip.status !== 'approved')
        ? `<button id="${trip.id}" class="approve" data-status="approve">Approve Trip</button>`
        : '';

      let denyButton = ((userInfo.userType === 'agent') && (trip.status === 'pending'))
        ? `<button id="${trip.id}" class="deny" data-status="deny">Deny Trip</button>`
        : '';

      let deleteButton = ((moment(now).isBefore(trip.date)) && (trip.status === 'approved'))
        ? `<button id="${trip.id}" class="delete" data-status="delete">Delete Trip</button>`
        : '';


      let buttonList = userInfo.userType === 'agent'
        ? `<div class="button-block">${approveButton}${denyButton}${deleteButton}</div>`
        : '';

      listOfTrips += `<li class="trip">
        <div class="img-wrap" style="background-image:url('${trip.destinationInfo.image}');"></div>
        <div class="trip-content">
          <h3>${trip.destinationInfo.destination}</h3>
          <p>Reservation: ${userName}</p>
          <p>Number of travelers: ${trip.travelers}</p>
          <p>Trip dates: ${trip.date} - ${moment(trip.date).add(trip.duration, 'days').format('YYYY/MM/DD')}</p>
          <p>Trip length: ${trip.duration}</p>
          <p>Trip status: ${trip.status}</p>
          <p>Suggested activities: ${trip.suggestedActivities}</p>
          ${buttonList}
        </div>
      </li>`;
    });

    $('.trip-widget').append(`<ul class="traveler-trip-list">${listOfTrips}</ul>`);
  },

  showTripRequestModal(allDestinations) {
    let locationOptions = '';
    allDestinations.destinations.forEach(location => {
      return locationOptions += `<option value="${location.id}">${location.destination}</option>`;
    });

    $('main').append(`
      <div class="request-trip-modal-bg">
        <div class="modal" aria-label="tripRequestModal">
          <h2>New Trip Request Form:</h2>
          <form id="tripRequestForm" class="request-trip-form" action="" method="">
            <div class="form-row">
              <label for="datePicker">Select a start date:</label>
              <input id="datePicker" type="text" name="datepicker" value="">
            </div>
            <div class="form-row">
              <label for="tripDuration">Trip duration (days):</label>
              <input id="tripDuration" type="number" name="tripDuration">
            </div>
            <div class="form-row">
              <label for="numTravelers">Number of travelers:</label>
              <input id="numTravelers" type="number" name="numTravelers">
            </div>
            <div class="form-row">
              <label for="tripDestination">Where would you like to go?</label>
              <select name="pets" id="tripDestination">
                <option value="">--Please choose an option--</option>
                ${locationOptions}
              </select>
            </div>
          </form>
          <button id="closeModal" aria-control="tripRequestModal"><img src="./images/close-button.png" alt="close-button"></button>
          <div class="trip-estimate-container"></div>
        </div>
      </div>
    `);
    let now = Date.now();
    const picker = datepicker('#datePicker', { minDate: new Date(now) }, {
      formatter: (input, date, instance) => {
        const value = date.toLocaleDateString()
        input.value = value // => '1/1/2099'
      }
    });

    $('#closeModal').on('click', function() {
      $('body').removeClass('js-modal-open');
      $('.request-trip-modal-bg').remove();
    });
  },

  async searchForUser(allTrips, allUsers, allDestinations) {
    let searchTerm = $('#search').val().toLowerCase();
    let searchedUser = allUsers.travelers.find(user => user.name.toLowerCase().includes(searchTerm));

    let usersTrips = await dataController.getUsersTrips(searchedUser.id);
    usersTrips = usersTrips.map(trip => {
      let tripDestination = allDestinations.destinations.find(destination => destination.id === trip.destinationID)
      return new Trip(trip, tripDestination);
    })

    searchedUser = new Traveler('agent', usersTrips, searchedUser);

    $('.traveler-trip-list').empty();
    domUpdates.populateTripsList(searchedUser, searchedUser.myTrips, allUsers)
  },

  makeEstimatedCostHTML(destinationInfo, tripEstimate) {
    return `<div class="trip-estimate-img" style="background-image:url(${destinationInfo.image})"></div>
      <h4>Confirm Trip Booking:</h4>
      <h2><span>To:</span>${destinationInfo.destination}</h2>
      <p class="trip-total"><span>Total:</span> ${tripEstimate}</p>
      <button id="confirmTripBooking" class="confirm" type="button"><img src="./images/check-mark.png" alt="confirm trip booking">Confirm Booking</button>`;
  }
}

export default domUpdates;
