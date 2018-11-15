require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const mongoose = require('mongoose');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

// Connect to Mongo
mongoose
  .connect(process.env.DATABASE, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Routes
const Api = require('./routes/api');
app.use('/api', Api);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/dist', 'index.html'));
  });
}

const port = process.env.PORT;

app.listen(port, () => console.log(`Server started on port ${port}`));