import chai from 'chai';
const expect = chai.expect;

import DataController from '../src/data-controller';

describe('DataController Tests', function() {
  let dataController;

  beforeEach(function() {
    dataController = new DataController();
  });

  it('should be able to instantiate & inherit properties', function() {
    expect(dataController.getTravelers().length).to.equal(50);
  });

});
