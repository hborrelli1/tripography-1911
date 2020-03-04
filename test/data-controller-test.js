import chai from 'chai';
const expect = chai.expect;

import DataController from '../src/data-controller';
import travelerData from '../sample-data/traveler-data';

const spies = require('chai-spies');
chai.use(spies);

describe('DataController Tests', function() {
  let dataController;
  let user;
  let traveler;
  let tripPost;

  beforeEach(function() {
    dataController = new DataController();
    global.window = {};
    chai.spy.on(window, 'fetch', () => new Promise((resolve, reject) => {}));

    user = travelerData.travelers[0];
    traveler = {
      "id": 1,
      "name": "Ham Leadbeater",
      "travelerType": "relaxer"
    };

    tripPost = {
      "id": 112234,
      "userID": 1,
      "destinationID": 22,
      "travelers": 2,
      "date": '2020/11/22',
      "duration": 2,
      "status": "pending",
      "suggestedActivities": []
    }
  });

  it('should be able to instantiate a DataController class', function() {
    expect(dataController).to.be.an.instanceOf(DataController);
  });

  it('shoudld be able to requests a specific users trips to the server', function() {
    dataController.getUsersTrips(user.id);

    expect(window.fetch).to.be.called(1);
    expect(window.fetch).to.be.called.with('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips');
  });

  it('should be able to get single users from server', function() {
    dataController.getSingleUser(user.id);

    expect(window.fetch).to.be.called(1);
    expect(window.fetch).to.be.called.with(`https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers/${user.id}`);
  });

  it('should be able to retreive all pending trips from server', function() {
    dataController.filterTripsByStatus('pending');

    expect(window.fetch).to.be.called(1);
    expect(window.fetch).to.be.called.with('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips');
  });

  it('should be able to book a trip to the server', function() {
    dataController.bookTrip(tripPost);

    expect(window.fetch).to.be.called(1);
    expect(window.fetch).to.be.called.with('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tripPost)
    });
  });

  it('should be able to approve a trip', function() {
    dataController.approveTrip(tripPost);

    expect(window.fetch).to.be.called(1);
    expect(window.fetch).to.be.called.with('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/updateTrip', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tripPost)
    });
  });

  it('should be able to deny or delete a trip', function() {
    dataController.denyTrip(tripPost);

    expect(window.fetch).to.be.called(1);
    expect(window.fetch).to.be.called.with('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips', {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tripPost)
    });
  });

  it('should be able to get all users', function() {
    dataController.getAllUsers();

    expect(window.fetch).to.be.called(1);
    expect(window.fetch).to.be.called.with('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers');
  });

});
