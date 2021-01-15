const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
  title: String,
  date: Date,
  recruiter:{
    name:String,
    email:String
  },
  maxNoOf:{
    applications:Number,
    positions:Number
  },
  dateOfPosting: Date,
  deadline: Date,//dd/mm/yyyy hr min
  requiredSkillSets:String, //languages
  typeOfJob:String, //Full time, part time,WFH
  duration:String, //in months
  salary:String, //per month
  rating:Number //0-5
})



module.exports = Job = mongoose.model('Jobs', jobSchema)