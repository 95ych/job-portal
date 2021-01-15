require('dotenv').config()
const Job = require('./models/Jobs')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const url = process.env.MONGODB_URI
const mongoose = require('mongoose');

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('post-data', (request) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))

let JobRouter = require("./routes/Jobs");
let ApplicantRouter = require("./routes/Applicants");
let RecruiterRouter = require("./routes/Recruiters");

app.use("/api/jobs",JobRouter);
app.use("/api/applicants",ApplicantRouter);
app.use("/api/recruiters",RecruiterRouter);

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})


console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


app.get('/info', (request, response) => {
  Job.estimatedDocumentCount( (error, count) => {
    if(!error)  response.send(`<div>Job portal has info for ${count} jobs<div><div>${new Date()}</div>`)
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.title === 'CastError')
    return response.status(400).send({ error: 'malformed id' })

  else if (error.title === 'ValidationError')
    return response.status(400).json({ error: error.message })

  next(error)
}


app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})