import $ from 'jquery';
import DataController from './data-controller';
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
    console.log('traveler dashboard being created..');
    // Grab last two digits of username
    let numberPattern = /\d+/g;
    let newUserID = username.match(numberPattern)[0]

    // Create new user with userID

    // Returns Promise()
    dataController.getTravelers().then(data => createNewTraveler(newUserID, data));
    // dataController.getTravelers();

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
      // If user is agent, invoke buildAgentDashboard
      domUpdates.invokeAgentAccount();
    } else if (travelerUser && password) {
      // If user is traveler, invoke buildTravelerDashboard
      console.log('successful traveler login');
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

export default  domUpdates;
