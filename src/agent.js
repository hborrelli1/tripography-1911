import User from './user';
var moment = require('moment');

class Agent extends User {
  constructor(agentType, allTrips) {
    super(agentType, allTrips);
    this.name = 'Agent Michael Scarn';
    this.totalRevenue = this.getTotalAmountSpentThisYear(allTrips);
    this.todaysTravelers = this.getTodaysTravelers(allTrips);
  }

  getTodaysTravelers(allTrips) {
    let now = moment();

    let currentTrips = allTrips.filter(trip => {
      let startDate = moment(trip.date, 'YYYY/MM/DD').format('YYYY/MM/DD');
      let endDate = moment(trip.date, 'YYYY/MM/DD').add(trip.duration, 'days').format('YYYY/MM/DD');

      return moment(now).isBetween(startDate, endDate);
    })
    return currentTrips.length;
  }
}

export default Agent;
