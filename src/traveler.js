class Traveler {
  constructor(travelerInfo) {
    this.id = travelerInfo.id;
    this.name = travelerInfo.name;
    this.travelerType = travelerInfo.travelerType;
  }

  makeTripRequest(tripInfo) {
    return {
      id: tripInfo.id,
      userID: tripInfo.userID,
      destinationID: tripInfo.destinationID,
      travelers: tripInfo.travelers,
      date: tripInfo.date,
      duration: tripInfo.duration,
      status: tripInfo.status,
      suggestedActivities: tripInfo.suggestedActivities
    }
  }
}

export default Traveler;
