class DataController {
  constructor() {

  }

  async getUsersTrips(userID) {
    let response = await window.fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips');
    let allTrips = await response.json();
    let filteredUserTrips;
    if (userID === undefined) {
      allTrips.trips.forEach(trip => {
        trip.destinationID = Number(trip.destinationID);
        trip.travelers = Number(trip.travelers);
        trip.duration = Number(trip.duration);
      });
      return allTrips;
    } else {
      filteredUserTrips = await allTrips.trips.filter(trip => trip.userID === userID);
      return filteredUserTrips;
    }
  }

  async getSingleUser(userID) {
    let response = await window.fetch(`https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers/${userID}`)
    let foundUser = await response.json();
    return foundUser;
  }

  async filterTripsByStatus(status) {
    let response = await window.fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips');
    let allTrips = await response.json();
    let filteredTrips = await allTrips.trips.filter(trip => trip.status === status);
    return filteredTrips;
  }

  async bookTrip(tripPost) {
    let response = await window.fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tripPost)
    });

    // let tripRequestResponse = await response;
    let message;
    if (response.ok) {
      message = '<div class="confirm-booking">Your trip has been booked!</div>';
    } else {
      message = '<div class="error-booking">Something went wrong. Please try again later.</div>';
    }

    return message;
  }

  async approveTrip(approvePost) {
    let response = await window.fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/updateTrip', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(approvePost)
    });
    let tripApprovalResponse = await response.json();
    return tripApprovalResponse;
  }

  async denyTrip(deletePost) {
    let response = await window.fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips', {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(deletePost)
    });
    let tripDeleteResponse = await response.json();
    return tripDeleteResponse;
  }

  async getAllUsers() {
    let response = await window.fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers')
    let allUsers = await response.json();
    return allUsers;
  }

  // async filterTripsByDate(date) {
  //   let response = await window.fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips');
  //   let allTrips = await response.json();
  //   let filteredTrips = await allTrips.trips.filter(trip => trip.status === status);
  //   return filteredTrips;
  // }

}

export default DataController;
