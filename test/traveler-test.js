import chai from 'chai';
const expect = chai.expect;

import Traveler from '../src/traveler';
import travelerData from '../sample-data/traveler-data';

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
      trip = {
        "id": 1,
        "userID": 44,
        "destinationID": 49,
        "travelers": 1,
        "date": "2019/09/16",
        "duration": 8,
        "status": "approved",
        "suggestedActivities": []
      }
    });

    it('should be able to make trip request', function() {
      expect(traveler.makeTripRequest(trip)).to.deep.equal(trip);
    });
  });
});
