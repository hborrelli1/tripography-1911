class DataController {
  constructor() {

  }

  async getUsersTrips(userID) {
    let response = await fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips');
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
    let response = await fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers')
    let allUsers = await response.json();
    let foundUser = await allUsers.travelers.find(user => user.id === userID);
    return foundUser;
  }

  async getPendingTrips() {
    let response = await fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips');
    let allTrips = await response.json();
    let pendingTrips = await allTrips.trips.filter(trip => trip.status === 'pending');
    return pendingTrips;
  }

  // calculateTotalRevenue() {
  //   let response = await fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips');
  //   let allTrips = await response.json();
  //   let pendingTrips = await allTrips.trips.filter(trip => trip.status === 'pending');
  //   return pendingTrips;
  // }

}

export default DataController;
