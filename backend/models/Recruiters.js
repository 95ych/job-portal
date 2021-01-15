const mongoose = require('mongoose')

// ● Profile sec on details with editing option [5 marks] -
// ○ Name, Email ID, Contact Number, Bio (max 250 words)

const recruiterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  contactNumber:{
    type: Number,
    required: true
  },
  Bio :{
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
  
});


module.exports = Recruiter = mongoose.model('Recruiters', recruiterSchema)