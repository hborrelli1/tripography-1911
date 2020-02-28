import $ from 'jquery';
import DataController from './data-controller';
import currentTraveler from './index.js';
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

  invokeAgentAccount() {
    console.log('agency');
  },

  invokeTravelerAccount(username) {
    // Grab last two digits of username
    let numberPattern = /\d+/g;
    let newUserID = Number(username.match(numberPattern)[0]);

    // Create new user with userID
    currentTraveler(newUserID);
  },

  login() {
    const agencyUser = $('#userName').val() === 'agency';
    const travelerUser = $('#userName').val().match(/traveler/);
    const password = $('#password').val() === 'travel2020';

    // validate if username has a number for the last digit
    if (!password) {
      $('.js-error-message').text('Your password is incorrect, please try again.');
      $('#password').addClass('js-error');
      return;
    }

    if (agencyUser && password) {
      domUpdates.invokeAgentAccount();
    } else if (travelerUser && password) {
      domUpdates.invokeTravelerAccount($('#userName').val());
    }

    domUpdates.removeLoginView();
  },

  // Clear loginView
  removeLoginView() {
    $('#loginView').remove();
  }
}

$('#loginButton').on('click', domUpdates.login);
$('#userName, #password').on('keyup', domUpdates.validateForm);

export default domUpdates;
