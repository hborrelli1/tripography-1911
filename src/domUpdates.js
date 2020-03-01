import $ from 'jquery';
import DataController from './data-controller';
import instantiateTraveler from './index.js';
let dataController = new DataController();

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
      : `<p id="numberOfTravelersToday">Number of Travelers today: ${userInfo.numOfTravelersToday}</p>`

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

  populateTripsList(userInfo) {
    let listOfTrips = '';
    userInfo.myTrips.forEach(trip => {
      listOfTrips += `<li class="trip">
        <div class="img-wrap" style="background-image:url('${trip.destinationInfo.image}');"></div>
        <div class="trip-content">
          <h3>${trip.destinationInfo.destination}</h3>
          <p>Number of travelers: ${trip.travelers}</p>
          <p>Trip dates: ${trip.date} - ${trip.date + trip.duration}</p>
          <p>Trip length: ${trip.duration}</p>
          <p>Trip status: ${trip.status}</p>
          <p>Suggested activities: ${trip.suggestedActivities}</p>

          <!-- Add conditional logic for approve buttons to reuse function. -->
        </div>
      </li>`;
    });

    $('.trip-widget').append(`<ul class="traveler-trip-list">${listOfTrips}</ul>`);
  },

  populatePendingTrips(pendingTrips) {
    let listOfPendingTrips = '';
    pendingTrips.forEach(trip => {
      listOfPendingTrips += `<li class="trip">
        <div class="img-wrap" style="background-image:url('${trip.destinationInfo.image}');"></div>
        <div class="trip-content">
          <h3>${trip.destinationInfo.destination}</h3>
          <p>Number of travelers: ${trip.travelers}</p>
          <p>Trip dates: ${trip.date} - ${trip.date + trip.duration}</p>
          <p>Trip length: ${trip.duration}</p>
          <p>Trip status: ${trip.status}</p>
          <p>Suggested activities: ${trip.suggestedActivities}</p>
          <button id="${trip.id}">Approve Trip</button>
        </div>
      </li>`;

      $('.trip-widget').append(`<ul class="traveler-trip-list">${listOfPendingTrips}</ul>`);
    });
  }
}

export default domUpdates;
