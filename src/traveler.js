import Trip from './trip';

class Traveler {
  constructor(travelerInfo, myTrips) {
    this.id = travelerInfo.id;
    this.name = travelerInfo.name;
    this.travelerType = travelerInfo.travelerType;
    this.myTrips = myTrips;
  }

  makeTripRequest(tripInfo) {
    return new Trip(tripInfo);
  }
}

export default Traveler;
