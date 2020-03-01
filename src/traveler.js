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

  // Filter trips by this year.
  // FOr each trip:
  // Calculate flight cost * travelers
  // Calculate Cost per day * duration
  // Add prev two together, and get 10% charge
  // getTotalAmountSpentThisYear() {
  //   let currentYear = new Date().getFullYear();
  //
  //   let thisYearsTrips = this.myTrips.filter(trip => {
  //     let tripYear = Number(trip.date.substring(0, 4));
  //     return tripYear === currentYear;
  //   });
  //
  //   let yearlyCost = thisYearsTrips.reduce((totalSpent, trip) => {
  //     let flightCost = trip.destinationInfo.estimatedFlightCostPerPerson * trip.travelers;
  //     let lodgingCost = trip.destinationInfo.estimatedLodgingCostPerDay * trip.duration;
  //     let tripTotal = flightCost + lodgingCost;
  //
  //     return totalSpent += tripTotal;
  //   }, 0)
  //
  //   let yearlyTotal = yearlyCost + (yearlyCost * .10);
  //
  //   return yearlyTotal.toLocaleString("en-US", { style: "currency", currency: "USD" });
  // }
}

export default Traveler;
