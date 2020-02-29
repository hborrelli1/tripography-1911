import Trip from './trip';

class Traveler {
  constructor(travelerInfo, myTrips) {
    this.id = travelerInfo.id;
    this.name = travelerInfo.name;
    this.travelerType = travelerInfo.travelerType;
    this.myTrips = myTrips;
    // this.totalSpent = this.getTotalAmountSpentThisYear();
  }

  makeTripRequest(tripInfo) {
    return new Trip(tripInfo);
  }

  // getTotalAmountSpentThisYear() {
  //   return myTrips
  // }
}

export default Traveler;
