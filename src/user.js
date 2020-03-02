class User {
  constructor(agentType, listOfTrips) {
    this.userType = agentType;
  }

  getTotalAmountSpentThisYear(listOfTrips, agentType) {
    let currentYear = new Date().getFullYear();

    let thisYearsTrips = listOfTrips.filter(trip => {
      let tripYear = Number(trip.date.substring(0, 4));
      return tripYear === currentYear;
    });

    let yearlyCost = thisYearsTrips.reduce((totalSpent, trip) => {
      let flightCost = trip.destinationInfo.estimatedFlightCostPerPerson * trip.travelers;
      let lodgingCost = (trip.destinationInfo.estimatedLodgingCostPerDay * trip.travelers) * (trip.duration);
      let tripTotal = flightCost + lodgingCost;

      return totalSpent += tripTotal;
    }, 0);

    if (agentType === 'traveler') {
      let yearlyTotal = yearlyCost + (yearlyCost * .10);
      return yearlyTotal.toLocaleString("en-US", { style: "currency", currency: "USD" });
    } else {
      let agentRevenue = (yearlyCost * .10);
      return agentRevenue.toLocaleString("en-US", { style: "currency", currency: "USD" });
    }

  }
}

export default User;
