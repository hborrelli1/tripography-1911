import User from './user';
import Trip from './trip';

class Traveler extends User {
  constructor(userType, myTrips, travelerInfo) {
    super(userType, myTrips);
    this.id = travelerInfo.id;
    this.name = travelerInfo.name;
    this.travelerType = travelerInfo.travelerType;
    this.myTrips = myTrips;
    this.totalSpent = this.getTotalAmountSpentThisYear(myTrips, userType);
  }

  makeTripRequest(tripInfo) {
    return new Trip(tripInfo);
  }
}

export default Traveler;
