const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/questions', (req, res) => {
  res.send(
    [
      {
        title: "Hello World!",
        description: "Hi there! How are you?"
      }
    ]
  )
})

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