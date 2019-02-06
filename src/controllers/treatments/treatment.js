const mongoose = require('mongoose');
const Treatment = require('../../models/Treatment')
const Appointment = require('../../models/Appointment')

const index = (req, res) => {
  Treatment
    .find()
    .exec()
    .then(users => {
      res.json({
        type: 'Getting Treatments',
        users
      })
      .status(200)
    })
    .catch(err => {
      console.log(`Caught error: ${err}`);
      return res.status(500).json(err);
    })
}

const findBy = (req, res) => {
  Treatment
    .findById( req.params.treatmentId)
    .then( users => {
      res.json({
        type: 'Found treatment by id',
        users
      })
      .status(200)
    })
    .catch(err => {
      console.log(`Caught error: ${err}`);
      return res.status(500).json(err);
    })
}

  const createAppointment = (body, day) => {
    const newAppointment = new Appointment({
      _id: mongoose.Types.ObjectId(),
      treatmentId: body._id,
      day,
      phoneNumber: 136363533,
      name: "Ana",
      user: body.user
    })

    newAppointment.save()
    return newAppointment._id
  }
  const create = (req, res) => {
    const newIds = req.body.listOfTreatments.split(' ')
    const newTreatment = new Treatment({
      _id: mongoose.Types.ObjectId(),
      description: req.body.description,
      listOfTreatments: req.body.listOfTreatments,
      user: req.body.user,
      listOfAppointments: newIds.map( (day) => createAppointment(req.body, day) )
// si tenemos 5 tratamientos, se crean 5 citas
// si tenemos 5 citas, tendremos 5 ids que estarán en lista de citas

    })
    newTreatment
      .save()
      .then(users =>{
        res.json({
          type: 'New Treatment',
          users
        })
        .status(200)
      })
      .catch(err =>{
        console.log(`Caught error: ${err}`);
        return res.status(500).json({message: 'Post Failed'})
      })
  }

  const deleteTreatmentBy = (req, res) => {
    Treatment
      .findById(req.params.treatmentId, function(err, treatment){
        // console.log(req.params)
        if(!err){
          Appointment.deleteMany({user: {$in:[treatment._id]}}, function(err){})
          treatment
            .remove()
            .then(() => {
              res
              .status(200)
              .json({
                message:'Treatment was deleted'
              });
            });
        }
      })
      .catch(err => {
        console.log(`caught error: ${err}`);
        return res.status(401).json({message: 'You dont have permission'})
      })
  }

module.exports = {
  index, findBy, create, deleteTreatmentBy
}
