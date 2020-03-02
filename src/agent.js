import User from './user';
var moment = require('moment');

class Agent extends User {
  constructor(agentType, allTrips) {
    super(agentType, allTrips);
    this.name = 'Agent Michael Scarn';
    // spy on user.getTotalAmountSpentThisYear
    // Test it gets called
    // Test that it is providing expected output 
    this.totalRevenue = this.getTotalAmountSpentThisYear(allTrips);
    this.todaysTravelers = this.getTodaysTravelers(allTrips);
  }

  getTodaysTravelers(allTrips) {
    // get todays date
    let now = moment();

    // Loop through all trips. capture start and end date.
    let currentTrips = allTrips.filter(trip => {
      let startDate = moment(trip.date, 'YYYY/MM/DD');
      let endDate = moment(trip.date, 'YYYY/MM/DD').add(trip.duration, 'days').format('YYYY/MM/DD');

      // If today is inbetween increment counter.
      return moment(now).isBetween(startDate, endDate);
    })
    return currentTrips.length;
  }
}

export default Agent;
