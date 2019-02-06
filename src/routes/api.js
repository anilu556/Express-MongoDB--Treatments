const { Router } = require('express');
const app = Router();

//requerir Auth
const isAuthenticated = require('../../services/Auth');

const Users = require('../controllers/users/user')
const Treatments = require('../controllers/treatments/treatment')
const Appointments = require('../controllers/appointments/appointment')

//Users routes

app.get('/users', isAuthenticated, Users.index);
app.get('/users/:userId', isAuthenticated, Users.findBy);
app.get('/users/:userId/treatments', Users.findTreatmentsBy)
//app.post('/users', Users.create);
app.put('/users/:userId', isAuthenticated, Users.updateBy);
// app.delete('/users/:userId', Users.removeBy);

// auth routes
app.post('/auth/signup', Users.signup)
app.post('/auth/login', Users.login)

//Treatments routes

app.get('/treatments', Treatments.index);
app.get('/treatments/:treatmentId', Treatments.findBy);
app.post('/treatments', Treatments.create);
// app.get('/treatments/:treatmentId/appointments', Users.findAppointmentsBy)
// app.put('/treatments/:id', Treatments.updateBy);
// app.delete('/treatments/:treatmentId', Treatments.removeBy);

// Appointments routes

app.get('/appointments', Appointments.index);
// app.get('/appointments/:appointmenstId', Appointments.findBy);
// app.put('/appointments/:id', Appointments.updateBy);
// app.delete('/appointments/:appointmentsId', Appointments.removeBy);

module.exports = app;
