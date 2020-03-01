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

  // invokeAgentAccount() {
  //   console.log('agency');
  // },
  //
  // invokeTravelerAccount(username) {
  //   let numberPattern = /\d+/g;
  //   let newUserID = Number(username.match(numberPattern)[0]);
  //   instantiateTraveler(newUserID);
  // },

  // login() {
  //   const agencyUser = $('#userName').val() === 'agency';
  //   const travelerUser = $('#userName').val().match(/traveler/);
  //   const password = $('#password').val() === 'travel2020';
  //
  //   if (!password) {
  //     $('.js-error-message').text('Your password is incorrect, please try again.');
  //     $('#password').addClass('js-error');
  //     return;
  //   }
  //
  //   if (agencyUser && password) {
  //     domUpdates.invokeAgentAccount();
  //   } else if (travelerUser && password) {
  //     domUpdates.invokeTravelerAccount($('#userName').val());
  //   }
  //
  //   $('#loginView').remove();
  // },

  populateUserWidget(userInfo) {
    let userWidget = `<section class="user-profile-widget widget">
      <h2>User Info</h2>
      <h4 id="userTitle">${userInfo.name}</h4>
      <p id="totalSpent">Total spent this year: ${userInfo.totalSpent}</p>
      <p id="tripCounter">Trip Counter: ${userInfo.myTrips.length}</p>
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

    let tripWidget = `<section class="trip-widget widget">
      ${filterButtons}
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
        </div>
      </li>`;
    });

    $('.trip-widget').append(`<ul class="traveler-trip-list">${listOfTrips}</ul>`);
  }
}

export default domUpdates;
