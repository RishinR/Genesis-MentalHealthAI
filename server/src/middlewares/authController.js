const jwt = require('jsonwebtoken');
require('dotenv').config();

const maxAge = 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id },process.env.ACCESS_TOKEN_SECRET, { expiresIn: maxAge });
};


const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log("Token:", token);
  console.log("Secret Key:", process.env.ACCESS_TOKEN_SECRET);
  // Check if JSON Web Token exists and is verified
  if (token) {
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        return res.status(401).json({ status: 'error' }); // Return 401 Unauthorized
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    return res.status(401).json({ status: 'error' }); // Return 401 Unauthorized
  }
};

module.exports = { maxAge, createToken, requireAuth };

// const requireAuth = (req, res, next) => {
//   const token = req.cookies.jwt;

//   // Check if JSON Web Token exists and is verified
//   if (token) {
//     jwt.verify(token, 'Hello world', (err, decodedToken) => {
//       if (err) {
//         console.log(err.message);
//         return res.status(401).json({ status: 'error' }); // Return 401 Unauthorized
//       } else {
//         console.log(decodedToken);
//         next();
//       }
//     });
//   } else {
//     return res.status(401).json({ status: 'error' }); // Return 401 Unauthorized
//   }
// };