var express = require("express");
var router = express.Router();

// Load Applicant model
const Applicant = require("../models/Applicants");

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    Applicant.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register", (req, res) => {
    const newApplicant = new Applicant({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        education: req.body.education,
        date: req.body.date
    });

    newApplicant.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// POST request 
// Login
router.post("/login", (req, res) => {
	const email = req.body.email;
	// Find user by email
	Applicant.findOne({ email }).then(user => {
		// Check if user email exists
		if (!user) {
			return res.status(404).json({
				error: "Email not found",
			});
        }
        else{
            res.send("Email Found");
            return user;
        }
	});
});

router.get('/:id', (request, response) => {
  Applicant.findById(request.params.id)
    .then(job => {
      if(job) response.json(job)
      else response.status(404).end
    })
    .catch(error => {
      console.log(error)
      response.status(400).send( { error : 'malformatted id' } )
    })
})

router.put('/:id', (request, response, next) => {
  const body = request.body

  const job = {
    title: body.title,
    salary: body.salary,
    dateOfPosting: body.dateOfPosting
  }
  console.log(job)
  Applicant.findByIdAndUpdate(request.params.id, job, { new: true, runValidators: true, context: 'query' })
    .then(updatedApplicant => {
      console.log(updatedApplicant)
      response.json(updatedApplicant)
    })
    .catch(error => {
      console.log('failed')
      next(error)
    })


})


router.delete('/:id', (request, response, next) => {
  Applicant.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => {
      console.log(error)
      next(error)
    })
})

module.exports = router;