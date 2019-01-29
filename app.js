require ('dotenv').config();
const express = require ('express');
const app = express();
const chalk = require('chalk');
const morgan = require ('morgan');
const PORT = process.env.PORT || 3001;
const mongoose = require ('mongoose');

//import api routes
const api = require('./src/routes/api');

//setup mongoose and mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/treatment-api',{
  useNewUrlParser: true
});

mongoose.connection.on('connected', () => {
  console.log("Successful")
})

//Middleware
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//json format
app.set('json spaces', 2)

//Test
app.get('/', (req, res) => {
  res.send('Hello team!!');
})

//CORS
app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, Authorization");

  next();
});

app.options("*", (request, response, next) => {
  response.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE"
  );
  response.send(200);

  next();
})

//API route
app.use('/api/v1', api);

//error 404
app.use((request, response) => {
  const ERROR = {
    message: '404. Not Found'
  }
  response
    .status(404)
    .json(ERROR);
});

//error 500
app.use((err, request, response, next) => {
  const ERROR = {
    message: '500. Server Error'
  }
  response
    .status(500)
    .json(ERROR);
});

//Server Listening
app.listen(PORT, () => {
  const msg = chalk.green(`Server is listening on PORT: ${PORT}`);

  console.log(msg);
});
