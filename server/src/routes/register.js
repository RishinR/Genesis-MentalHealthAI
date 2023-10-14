var express = require('express');
require('dotenv').config();
var router = express.Router();
const User = require(__dirname + '/../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const handleErrors = (err) =>{
  console.log(err.message,err.code);
  let errors = {username:'',email:'',password:''};

  if(err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

router.post('/registerUser', async (req, res) => {
  try {
    const {username, email, password, city} = req.body;
    console.log(req.body);
    // check if the user is already present
    const isPresent = await User.findOne({ username: username,email:email});
    if (isPresent) {
      console.log('User already present');
    }
    else {
      //const passwordCrypted = bcrypt.hashSync(password, saltRounds);
      const newUser = await User.create({ username: username, email: email, password: password, city:city});
      if (newUser) {
        console.log('User created successfully');
        return res.json({status:'ok'});
      }
    }
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
});

module.exports = router;
