var express = require("express");
var router = express.Router();

// Load Applicant model
const Applicant = require("../models/Applicants");
const User = require("../models/Users");
// GET request 
// Getting all the users
router.get("/", function(req, res) {
    Applicant.find(function(err, applicants) {
		if (err) {
			console.log(err);
		} else {
			res.json(applicants);
		}
	})
});


router.post("/register", (req, res) => {
    
    const newUser = new User({
        name: req.body.user.name,
        email: req.body.user.email,
        password: req.body.user.password,
        role: "applicant"
    });

    newUser.save()
        .then(user => {
            const newApplicant = new Applicant({
              user: user,
              education: req.body.education,
          });

          newApplicant.save()
              .then(applicant => {
                  res.status(200).json(applicant);
              })
              .catch(err => {
                  console.log(err)
                  res.status(400).send(err);
              });
        
        })
        .catch(err => {
            console.log(err)
            res.status(400).send(err);
        });

    
});

// POST request 
// Login
router.post("/login", (req, res) => {
  const user = req.body.user;
  // Find user by email
  User.findOne({ "email":req.body.email }).then(user => {
      
      
    console.log(user)
    if (!user) {
      return res.status(404).json({
        error: "Email not found",
      });
        }
        else{
          Applicant.findOne({"user": user._id}).
          then(applicant => {
            console.log(applicant)
            res.send("Email Found");
            return applicant;
          })
            
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