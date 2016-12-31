const Driver = require('../models/driver');

module.exports = {

  greeting(req, res) {
    res.send({hi: 'Here'});
  },

  index(req, res, next) {
    const lng = req.query.lng;
    const lat = req.query.lat;

    Driver.geoNear(
      { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
      { spherical: true, maxDistance: 200000 }
    )
      .then(drivers => res.send(drivers))
      .catch(next);
  },

  create(req, res, next) {
    Driver.create(req.body)
      .then(driver => {
        res.send(driver);
      })
      .catch(next);
  },

  edit(req, res, next) {
    const driverId = req.params.id;
    const driveProps = req.body;

    Driver.findByIdAndUpdate({_id : driverId}, driveProps)
      .then(() => Driver.findById({ _id : driverId}))
      .then(driver => res.send(driver))
      .catch(next);
  },

  delete(req, res, next) {
    const driverId = req.params.id;

    Driver.findByIdAndRemove({_id : driverId})
      .then(driver => {
        res.status(204).send(driver);
      })
      .catch(next);
  }
};
