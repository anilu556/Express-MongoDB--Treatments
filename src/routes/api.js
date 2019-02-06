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
app.delete('/users/:userId', isAuthenticated,  Users.deleteBy);

// auth routes
app.post('/auth/signup', Users.signup)
app.post('/auth/login', Users.login)

//Treatments routes

app.get('/treatments', isAuthenticated, Treatments.index);
app.get('/treatments/:treatmentId', isAuthenticated, Treatments.findBy);
app.post('/treatments', isAuthenticated, Treatments.create);
// app.get('/treatments/:treatmentId/appointments', Users.findAppointmentsBy)
// app.put('/treatments/:id', isAuthenticated, Treatments.updateBy);
app.delete('/treatments/:treatmentId', isAuthenticated, Treatments.deleteTreatmentBy);

// Appointments routes

app.get('/appointments', Appointments.index);
// app.get('/appointments/:appointmenstId', Appointments.findBy);
// app.put('/appointments/:id', Appointments.updateBy);
// app.delete('/appointments/:appointmentsId', Appointments.removeBy);

module.exports = app;
