/*
Model Name:  Login
Usage: This model is used to store the login details of the user includes the ktuId and password fields.
Author: Rishin R
*/
const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = new mongoose.model('Login', LoginSchema);
