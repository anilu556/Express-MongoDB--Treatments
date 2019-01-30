const mongoose = require('mongoose');
const Appointment = require('../../models/Appointment');

const index = (req, res) => {
  Appointment
    .find()
    .exec()
    .then(data => {
      res
        .json({
          type: 'Getting appointments',
          data: data
        })
        .status(200)
    })
    .catch(err => {
      console.log(`caugth err: ${err}`);
      return res.status(500).json(err)
    })
}

module.exports = {
  index
}
