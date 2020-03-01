import chai from 'chai';
const expect = chai.expect;

import Trip from '../src/trip';
import tripData from '../sample-data/trip-data';

describe('Trip Tests', function() {
  let trip1;
  let trip2;

  describe('Test Trip properties', function() {

    beforeEach(function() {
      trip1 = new Trip(tripData.trips[0], tripData.trips[0].destinationInfo);
      trip2 = new Trip(tripData.trips[1], tripData.trips[1].destinationInfo);
    });

    it('should be able to instantiate a Trip class', function() {
      expect(trip1).to.be.an.instanceOf(Trip);
    });

    it('should be able to have an id', function() {
      expect(trip1.id).to.equal(1);
      expect(trip2.id).to.equal(2);
    });

    it('should be able to have a userID', function() {
      expect(trip1.userID).to.equal(1);
      expect(trip2.userID).to.equal(35);
    });

    it('should be able to have a destinationID', function() {
      expect(trip1.destinationID).to.equal(49);
      expect(trip2.destinationID).to.equal(25);
    });

    it('should be able to have a travelers count', function() {
      expect(trip1.travelers).to.equal(1);
      expect(trip2.travelers).to.equal(5);
    });

    it('should be able to have a date', function() {
      expect(trip1.date).to.equal('2019/09/16');
      expect(trip2.date).to.equal('2020/10/04');
    });

    it('should be able to have a duration', function() {
      expect(trip1.duration).to.equal(8);
      expect(trip2.duration).to.equal(18);
    });

    it('should be able to have a status', function() {
      expect(trip1.status).to.equal('approved');
      expect(trip2.status).to.equal('pending');
    });

    it('should be able to have a suggestedActivities', function() {
      expect(trip1.suggestedActivities).to.deep.equal([]);
      expect(trip2.suggestedActivities).to.deep.equal([]);
    });

    it('should be able to hold its destination information', function() {
      expect(trip1.destinationID).to.equal(trip1.destinationInfo.id);
      expect(trip2.destinationID).to.equal(trip2.destinationInfo.id);
    });
  });
});
