import chai from 'chai';
const expect = chai.expect;

import DataController from '../src/data-controller';

const spies = require('chai-spies');
chai.use(spies);

describe('DataController Tests', function() {
  let dataController;

  beforeEach(function() {
    dataController = new DataController();
  });

  it('should be able to instantiate & inherit properties', function() {
    // chai.spy.on(
    //   fetch,
    //   [method(s) to listen for],
    //   [replacement behavior]
    // )
    expect(dataController.getUsersTrips(40).length).to.equal(6);
  });


});
