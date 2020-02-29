import chai from 'chai';
const expect = chai.expect;

import Trip from '../src/trip';
import tripData from '../sample-data/trip-data';

describe('Trip Tests', function() {
  let trip;

  describe('Test Trip properties', function() {

    beforeEach(function() {
      trip = new Trip(tripData.trips[0]);
    });

    it('should be able to instantiate a Trip class', function() {
      expect(trip).to.be.an.instanceOf(Trip);
    });

    it('should be able to have an id', function() {
      expect(trip.id).to.equal(1);
    });

    it('should be able to have a userID', function() {
      expect(trip.userID).to.equal(1);
    });

    it('should be able to have a destinationID', function() {
      expect(trip.destinationID).to.equal(49);
    });

    it('should be able to have a travelers count', function() {
      expect(trip.travelers).to.equal(1);
    });

    it('should be able to have a date', function() {
      expect(trip.date).to.equal('2019/09/16');
    });

    it('should be able to have a duration', function() {
      expect(trip.duration).to.equal(8);
    });

    it('should be able to have a status', function() {
      expect(trip.status).to.equal('approved');
    });

    it('should be able to have a suggestedActivities', function() {
      expect(trip.suggestedActivities).to.deep.equal([]);
    });
  });
});
