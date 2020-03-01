import User from './user';

class Agent extends User {
  constructor(agentType, allTrips) {
    super(agentType, allTrips);
    this.name = 'Agent Michael Scarn';
    this.totalRevenue = this.getTotalAmountSpentThisYear(allTrips);
  }

  getTodaysTravelers() {
    
  }
}

export default Agent;
