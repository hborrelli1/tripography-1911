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
    // get todays date
    let now = moment();

    // Loop through all trips. capture start and end date.
    let currentTrips = allTrips.filter(trip => {
      let startDate = moment(trip.date, 'YYYY/MM/DD');
      // console.log('startDate: ', startDate);
      // console.log('duration: ', trip.duration);
      let endDate = moment(trip.date, 'YYYY/MM/DD').add(trip.duration, 'days').format('YYYY/MM/DD');
      // console.log('endDate: ', endDate);

      console.log('momentIsBetween: ', moment(now).isBetween(startDate, endDate));
      // If today is inbetween increment counter.
      return moment(now).isBetween(startDate, endDate);
    })
    return currentTrips.length;
  }
}

export default Agent;
