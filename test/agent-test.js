import chai from 'chai';
const expect = chai.expect;

import Agent from '../src/agent';
import tripData from '../sample-data/trip-data';

describe('Agent Tests', function() {
  let user;

  beforeEach(function() {
    user = new Agent('agent', tripData.trips);
  });

  describe('Test Agent Properties', function() {
    it('should be able to take in a userType', function() {
      expect(user.userType).to.equal('agent');
    });

    it('should be able to take in a name property', function() {
      expect(user.name).to.equal('Agent Michael Scarn');
    });

    it('should be able to calculate total revenue generated', function() {
      expect(user.totalRevenue).to.equal('$2,853.00');
    });
  });

  describe('Test Users methods', function() {

    it('should be able to calculate todays travlers', function() {
      // This will change as today is a dynamic value.
      expect(user.todaysTravelers).to.equal(1);
    })
  });

});
