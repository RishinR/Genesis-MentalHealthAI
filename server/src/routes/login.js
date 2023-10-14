var express = require('express');
require('dotenv').config();
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require(__dirname + '/../models/User');
const {maxAge,createToken} = require('../middlewares/authController');

router.post('/loginUser', async (req, res) => {
  console.log(req.body);
  try {
    // const username = 'raghav'
    // const password = '1234'
    const {email, password} = req.body;
    //find user by username and get password
    const pass = await User.findOne({ email: email }, { password: 1 });
    if (pass) {
      const passwordMatches = bcrypt.compareSync(password, pass.password);
      //console.log(pass.password)
      //const passwordMatches = password === pass.password;
      if (passwordMatches) {
        const userDetails = await User.findOne({email: email},{email:1,city:1});
        const token = createToken(userDetails._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge * 1000,secure: true,SameSite:'none'});
        res.json({ status: 'ok',token, user: 'user',userDetails: userDetails});
      }
      else {
        console.log('invalid password');
        return res.json({ status: 'error', user: 'invalid password' });
      }
    }
    else {
      console.log('invalid username');
      return res.json({ status: 'error', user: 'invalid username' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
