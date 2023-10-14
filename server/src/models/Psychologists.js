/*
Model Name:  Login
Usage: This model is used to store the login details of the user includes the ktuId and password fields.
Author: Rishin R
*/
const mongoose = require('mongoose');

const PsychologistSchema = new mongoose.Schema({
  name:{
    type:String, 
    required: true,
  },
  phno:{
    type:String, 
    required:true, 
  },
  email:{
    type:String, 
    required: true, 
  },
  experience:{
    type:String, 
    required: true,
  },
  address:{
    type:String, 
    required: true,
  }

});

module.exports = new mongoose.model('Psychologists', PsychologistSchema);
