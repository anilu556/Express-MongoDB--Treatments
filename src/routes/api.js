const { Router } = require('express');
const app = Router();

const Users = require('../controllers/users/user')
// const Appointments = require('../controllers/treatments/treatments')
// const Appointments = require('../controllers/treatments/appointments')

//Users routes

app.get('/users', Users.index);
app.get('/users/:userId', Users.findBy);
app.get('/users/:userId/treatments', Users.findTreatmentsBy)
app.post('/users', Users.create);
app.put('/users/:userId', Users.updateBy);
// app.delete('/users/:userId', Users.removeBy);

//Treatments routes

// app.get('/treatments', Treatments.index);
// app.get('/treatments/:treatmentId', Treatments.findBy);
// app.get('/treatments/:treatmentId/appointments', Users.findAppointmentsBy)
// app.post('/treatments', Treatments.create);
// app.put('/treatments/:id', Treatments.updateBy);
// app.delete('/treatments/:treatmentId', Treatments.removeBy);

// Appointments routes

// app.get('/appointments', Appointments.index);
// app.get('/appointments/:appointmenstId', Appointments.findBy);
// app.put('/appointments/:id', Appointments.updateBy);
// app.delete('/appointments/:appointmentsId', Appointments.removeBy);

module.exports = app;
