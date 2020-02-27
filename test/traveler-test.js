import chai from 'chai';
const expect = chai.expect;

import Traveler from '../src/traveler';
import Trip from '../src/trip';
import travelerData from '../sample-data/traveler-data';
import tripData from '../sample-data/trip-data';

describe('Traveler Tests', function() {
  let traveler;

  describe('Test Traveler properties', function() {

    beforeEach(function() {
      traveler = new Traveler(travelerData.travelers[0]);
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
      traveler = new Traveler(travelerData.travelers[0]);
      trip = new Trip(tripData.trips[0]);
    });

    it('should be able to make trip request', function() {
      let newTrip = traveler.makeTripRequest(trip);

      expect(newTrip.userID).to.deep.equal(44);
      expect(newTrip.destinationID).to.equal(49);
    });
  });
});
