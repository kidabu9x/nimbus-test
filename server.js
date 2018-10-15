const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const mongoose = require('mongoose');
const db = require('./config.json').database;

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

// Connect to Mongo
mongoose
  .connect(db, {useNewUrlParser : true, useCreateIndex: true})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Routes
const Api = require('./routes/api');
app.use('/api', Api);

// Uncomment when deploy to server
app.use(express.static('client/dist'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/dist', 'index.html'));
});

// Serve static assets if in production
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('dist'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
//   });
// }

const port = process.env.PORT || 8080;
// const port = process.env.PORT || 6969;

app.listen(port, () => console.log(`Server started on port ${port}`));