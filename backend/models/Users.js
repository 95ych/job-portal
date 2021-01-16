const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// ● Profile sec on details with editing option [5 marks] -
// ○ Name, Email ID, Contact Number, Bio (max 250 words)

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    dropDups: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role:{
    type: String,
    enum: ["applicant","recruiter"],
    required: true
  }

});

userSchema.plugin(uniqueValidator, { message: `Error: That {PATH} already exists.` });

module.exports = User = mongoose.model('Users', userSchema);