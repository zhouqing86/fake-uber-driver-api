const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const Driver = mongoose.model('driver'); // don't require dirver file becuase when use mocha it will have some compatible problem

describe('Drivers Controller', () => {

  it('Post to /api/drivers to create a new Driver', (done) => {
    Driver.count().then(count => {
      request(app)
        .post('/api/drivers')
        .send( { email: 'test@test.com'} )
        .end((err, response) => {
          Driver.count().then(newCount => {
            assert(count + 1 == newCount);
            done();
          });
        });
    });
  });



});
