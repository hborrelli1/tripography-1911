import chai from 'chai';
const expect = chai.expect;

import User from '../src/user';
import tripData from '../sample-data/trip-data';

describe('User Tests', function() {
  let user1;
  let user2;

  beforeEach(function() {
    user1 = new User('agent', tripData.trips);
    user2 = new User('traveler', tripData);
  });

  describe('Test Users Properties', function() {
    it('should be able to take in a userType', function() {
      expect(user1.userType).to.equal('agent');
      expect(user2.userType).to.equal('traveler');
    });
  });

  describe('Test Users methods', function() {

    it('should be able to calculate total revenue for agent', function() {
      expect(user1.getTotalAmountSpentThisYear(tripData.trips, user1.userType)).to.equal('$2,853.00');
    });

    it('should be able to calculate total spent for traveler', function() {
      expect(user2.getTotalAmountSpentThisYear(tripData.trips, user2.userType)).to.equal('$31,383.00');
    });
  });

});
