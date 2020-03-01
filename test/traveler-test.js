import chai from 'chai';
const expect = chai.expect;

import Traveler from '../src/traveler';
import Trip from '../src/trip';
import User from '../src/user';
import travelerData from '../sample-data/traveler-data';
import tripData from '../sample-data/trip-data';

describe('Traveler Tests', function() {
  let traveler;
  let myTrips;

  describe('Test Traveler properties', function() {

    beforeEach(function() {
      traveler = new Traveler('traveler', tripData.trips, travelerData.travelers[0]);
    });

    it('should be able to instantiate & inherit properties', function() {
      expect(traveler).to.be.instanceOf(Traveler);
      expect(traveler.name).to.equal('Ham Leadbeater');
      expect(traveler.id).to.equal(1);
    });

    it('should have a traveler type', function() {
      expect(traveler.travelerType).to.equal('relaxer');
    })
  });

  describe('Test Traveler methods', function() {
    let trip;

    beforeEach(function() {
      traveler = new Traveler('traveler', tripData.trips, travelerData.travelers[0]);
      trip = new Trip(tripData.trips[0]);
      myTrips = {
        "id": 1,
        "userID": 1,
        "destinationID": 49,
        "travelers": 1,
        "date": "2019/09/16",
        "duration": 8,
        "status": "approved",
        "suggestedActivities": []
      },{
        "id": 4,
        "userID": 1,
        "destinationID": 14,
        "travelers": 2,
        "date": "2020/02/25",
        "duration": 10,
        "status": "approved",
        "suggestedActivities": []
      }

    });

    it('should be able to make trip request', function() {
      let newTrip = traveler.makeTripRequest(trip);

      expect(newTrip.userID).to.deep.equal(1);
      expect(newTrip.destinationID).to.equal(49);
    });

    it('should be able to hold on to their trips', function() {
      traveler.myTrips = myTrips;
      expect(traveler.myTrips).to.deep.equal({
        "id": 1,
        "userID": 1,
        "destinationID": 49,
        "travelers": 1,
        "date": "2019/09/16",
        "duration": 8,
        "status": "approved",
        "suggestedActivities": []
      },{
        "id": 4,
        "userID": 1,
        "destinationID": 14,
        "travelers": 2,
        "date": "2020/02/25",
        "duration": 10,
        "status": "approved",
        "suggestedActivities": []
      });
    });
  });
});
