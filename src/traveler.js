import Trip from './trip';

class Traveler {
  constructor(travelerInfo) {
    this.id = travelerInfo.id;
    this.name = travelerInfo.name;
    this.travelerType = travelerInfo.travelerType;
  }

  makeTripRequest(tripInfo) {
    return new Trip(tripInfo);
  }
}

export default Traveler;
