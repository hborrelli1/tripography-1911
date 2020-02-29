class DataController {
  constructor() {

  }

  async getUsersTrips(userID) {
    let response = await fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips');
    let allTrips = await response.json();
    let filteredUserTrips = await allTrips.trips.filter(trip => trip.userID === userID);
    return filteredUserTrips;
  }

  async getSingleUser(userID) {
    let response = await fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers')
    let allUsers = await response.json();
    let foundUser = await allUsers.travelers.find(user => user.id === userID);
    return foundUser;
  }

  // async getAllDestinations() {
  //   let response = await fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/destinations/destinations')
  //   let allDestinations = await response.json();
  //   return allDestinations;
  // }

}

export default DataController;
