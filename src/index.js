const express = require('express');
const morgan = require('morgan');
const{admin, db} = require('./config/firebase');
const{createPattSubGameByCron,updatecurrentRoomId}= require('../src/controllers/pattController')
const pattRouters = require("./routes/patt.routes");

const port = 3000;

const cron = require("node-cron");

// call the env file
require('dotenv').config();

const app = express();

app.use(express.json());

// Log HTTP requests and responses to the terminal
app.use(morgan('dev'));

app.use('/patt', pattRouters); // Router for patt sub-game's APIs

cron.schedule('* * * * *', async() => {
  console.log(`running in 1min a task every month ${new Date()}`);
  // create patt sub game
  let addSubGame= await createPattSubGameByCron();
  console.log("addSubGame",addSubGame);
  // update patt current game id
  let updateCurrRoomId= await updatecurrentRoomId(addSubGame);
  console.log("updateCurrRoomId",updateCurrRoomId.Id);

});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT || port}`);
});