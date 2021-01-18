var express = require("express");
var router = express.Router();
const joi = require("joi")
// Load Applicant model
const Applicant = require("../models/Applicants");
const Recruiter = require("../models/Recruiters");
const User = require("../models/Users");
// GET request 
// Getting all the users
router.get("/", function(req, res) {
    console.log(req.session)
    User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

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
  User.findById(request.params.id)
    .then(user => {
      if(user) response.json(job)
      else response.status(404).end
    })
    .catch(error => {
      console.log(error)
      response.status(400).send( { error : 'malformatted id' } )
    })
})

module.exports = router;