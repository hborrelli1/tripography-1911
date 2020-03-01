// import DataController from './data-controller';

class Trip {
  constructor(trip, tripDestination) {
    // super(trip)
    this.id = trip.id;
    this.userID = trip.userID;
    this.destinationID = trip.destinationID;
    this.travelers = trip.travelers;
    this.date = trip.date;
    this.duration = trip.duration;
    this.status = trip.status;
    this.suggestedActivities = trip.suggestedActivities;
    // this.destinationInfo = this.getAllDestinations();
    this.destinationInfo = tripDestination;
  }

  // getDestinationInfo() {
  //   this.destinationInfo = allDestinations.find(destination => destination.id === this.destinationID);
  // }
}

export default Trip;
