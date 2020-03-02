class DataController {
  constructor() {

  }

  async getUsersTrips(userID) {
    let response = await window.fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips');
    let allTrips = await response.json();
    let filteredUserTrips;
    if (userID === undefined) {
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

  async getPendingTrips() {
    let response = await window.fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips');
    let allTrips = await response.json();
    let pendingTrips = await allTrips.trips.filter(trip => trip.status === 'pending');
    return pendingTrips;
  }

  async bookTrip(tripPost) {
    let response = await window.fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tripPost)
    });
    // Format rsponse mesage here and error handling.
    console.log(response.status);
    let tripRequestResponse = await response.json();
    return tripRequestResponse;
  }

}

export default DataController;
