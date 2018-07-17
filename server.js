const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')

const mongoose = require('mongoose')
const db = require('./config.json').database

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// Connect to Mongo
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Routes
const questions = require('./routes/api/questions')
app.use('/api/questions', questions)

// User
const testUser = require('./routes/api/user/testClass')
app.use('/api/test-class', testUser)

// Admin
const testAdmin = require('./routes/api/admin/testClass')
app.use('/api/admin/test-class', testAdmin)

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('dist'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

const port = process.env.PORT || 8081;

app.listen(port, () => console.log(`Server started on port ${port}`));