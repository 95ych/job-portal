var express = require("express");
var router = express.Router();

// Load Job model
const Job = require("../models/Jobs");

// GET request 
// Getting all the jobs


router.get('/', (request, response) => {
  Job.find({}).then(jobs => {
    response.json(jobs.map(job => job.toJSON()))
  })
})

router.get('/:id', (request, response) => {
  Job.findById(request.params.id)
    .then(job => {
      if(job) response.json(job)
      else response.status(404).end
    })
    .catch(error => {
      console.log(error)
      response.status(400).send( { error : 'malformatted id' } )
    })
})

router.post('/', (request, response, next) => {
  const body = request.body

  if(!body) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  else if(!body.title) {
    return response.status(400).json({
      error: 'Name is missing'
    })
  }

  else if(!body.salary) {
    return response.status(400).json({
      error: 'Number is missing'
    })
  }

  //console.log(jobs.find((title) => title == body.title))
  const job = new Job({
    title: body.title,
    salary: body.salary,
    dateOfPosting: new Date()
  })

  job.save()
    .then(savedJob => {
      response.json(savedJob.toJSON())
    })
    .catch(error => next(error))
})

router.put('/:id', (request, response, next) => {
  const body = request.body

  const job = {
    title: body.title,
    salary: body.salary,
    dateOfPosting: body.dateOfPosting
  }
  console.log(job)
  Job.findByIdAndUpdate(request.params.id, job, { new: true, runValidators: true, context: 'query' })
    .then(updatedJob => {
      console.log(updatedJob)
      response.json(updatedJob)
    })
    .catch(error => {
      console.log('failed')
      next(error)
    })


})


router.delete('/:id', (request, response, next) => {
  Job.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => {
      console.log(error)
      next(error)
    })
})

module.exports = router;