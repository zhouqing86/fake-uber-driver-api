const Driver = require('../models/driver');

module.exports = {

  greeting(req, res) {
    res.send({hi: 'Here'});
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
