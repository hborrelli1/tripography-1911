import $ from 'jquery';
import DataController from './data-controller';
import instantiateTraveler from './index.js';
let dataController = new DataController();
import datepicker from 'js-datepicker';

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
      ? `<p id="totalSpent">Total spent this year: ${userInfo.totalSpent}</p>`
      : `<p id="totalRevenue">Total revenue this year: ${userInfo.totalRevenue}</p>`;

    let counter = userInfo.userType === 'traveler'
      ? `<p id="tripCounter">Trip Counter: ${userInfo.myTrips.length}</p>`
      : `<p id="numberOfTravelersToday">Number of Travelers today: ${userInfo.todaysTravelers}</p>`;

    // let bookTripButton = userInfo.userType === 'traveler'
    //   ? `<button id="requestTripButton">Request Trip</button>`
    //   : ``;

    let userWidget = `<section class="user-profile-widget widget">
      <h2>User Info</h2>
      <h4 id="userTitle">${userInfo.name}</h4>
      ${money}
      ${counter}
    </section>`;

    $('main').addClass('travel-dashboard').append('<div class="margin-wrapper"></div>');
    $('.margin-wrapper').append(userWidget);
  },

  populateTripsWidgetFilter(userInfo) {
    let filterButtons = `<div class="trip-filter-bar">
        <p class="trip-status">Filter By Status:</p>
        <div class="filter-buttons">
        <button id="upcomingTrips">Upcoming</button>
        <button id="pendingTrips">Pending</button>
        <button id="currentTrips">Current</button>
        <button id="pastTrips">Past</button>
      </div>
      <button id="requestTripButton" class="confirm" type="button"><img src="./images/plus.png" alt="request a trip">Request Trip</button>
    </div>`;

    let tripSearchBar = `<div class="trip-search-bar">
      <label for="search">Search the site:</label>
      <input type="search" id="search" name="search bar"
       aria-label="Search through travelers">
    </div>`;

    let tripWidgetHeader = userInfo.userType === 'traveler'
      ? filterButtons
      : tripSearchBar;

    let tripWidget = `<section class="trip-widget widget">
      ${tripWidgetHeader}
    </div>`;

    $('.margin-wrapper').append(tripWidget);
  },

  populateTripsList(userInfo, tripsToList) {
    console.log(tripsToList);
    let listOfTrips = '';

    let tripsToDisplay = userInfo === 'traveler'
      ? userInfo.myTrips
      : tripsToList;

    tripsToDisplay.forEach(trip => {
      let buttonList = userInfo.userType === 'agent'
        ? `<button id="${trip.id}">Approve Trip</button>`
        : '';

      listOfTrips += `<li class="trip">
        <div class="img-wrap" style="background-image:url('${trip.destinationInfo.image}');"></div>
        <div class="trip-content">
          <h3>${trip.destinationInfo.destination}</h3>
          <p>Number of travelers: ${trip.travelers}</p>
          <p>Trip dates: ${trip.date} - ${trip.date + trip.duration}</p>
          <p>Trip length: ${trip.duration}</p>
          <p>Trip status: ${trip.status}</p>
          <p>Suggested activities: ${trip.suggestedActivities}</p>
          ${buttonList}
          <!-- Add conditional logic for approve buttons to reuse function. -->
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
  }
}

export default domUpdates;
