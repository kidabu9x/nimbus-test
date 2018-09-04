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
  .connect(db, {useNewUrlParser : true})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Routes
const questions = require('./routes/api/questions')
app.use('/api/questions', questions)

const test = require('./routes/api/testApi/testApi')
app.use('/api/test', test)

const schedule = require('./routes/api/scheduleApi')
app.use('/api/schedule', schedule)

const testResult = require('./routes/api/testApi/testResultApi')
app.use('/api/test-result', testResult)

const member = require('./routes/api/memberApi')
app.use('/api/member', member)

const course = require('./routes/api/courseApi/courseApi')
app.use('/api/course', course)

const grade = require('./routes/api/courseApi/gradeApi')
app.use('/api/grade', grade)

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('dist'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

const port = process.env.PORT || 6969;

app.listen(port, () => console.log(`Server started on port ${port}`));